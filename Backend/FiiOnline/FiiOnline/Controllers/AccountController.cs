using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Business.Services.Interfaces;
using CreatingModels;
using Data.Domain.Entities;
using Data.Persistence;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Services;

namespace FiiOnline.Controllers
{
    [Produces("application/json")]
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    public class AccountController : Controller
    {
        private readonly IUsersService _usersService;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IEmailSender _emailSender;
        private readonly IGenerator _generator;


        public AccountController(IUsersService usersService, UserManager<User> userManager,
            SignInManager<User> signInManager, IEmailSender emailSender, IGenerator generator)
        {
            _usersService = usersService;
            _userManager = userManager;
            _signInManager = signInManager;
            _emailSender = emailSender;
            _generator = generator;
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserCreatingModel userModel)
        {
            try
            {
                var result = await _usersService.CreateAsync(userModel, _userManager);
                if (result.Succeeded)
                {
                    var user = _usersService.GetByName(userModel.Name);
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var callbackUrl = new Uri(Url.Link("ConfirmEmailRoute", new {userId = user.Id, code = code}));
                    await _emailSender.SendEmailAsync(userModel.Email, "Confirm your account",
                        $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");
                    return StatusCode((int) (HttpStatusCode.Created));
                }

                return BadRequest("Could not create user");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("ConfirmEmail", Name = "ConfirmEmailRoute")]
        public async Task<IActionResult> ConfirmEmail(string userId = "", string code = "")
        {
            try
            {
                var user = _userManager.FindByIdAsync(userId).Result;
                await _userManager.ConfirmEmailAsync(user, code);
                return StatusCode((int) HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("auth")]
        public async Task<object> Login([FromBody] LoginCreatingModel model)
        {
            var appUser = _userManager.Users.SingleOrDefault(r => r.Email == model.Email);

            var result = await _signInManager.PasswordSignInAsync(appUser.UserName, model.Password, false, false);


            if (result.Succeeded)
            {
                return Json(new {token = _generator.GenerateJwtToken(model.Email, appUser)});
            }

            throw new ApplicationException("INVALID_LOGIN_ATTEMPT");
        }

        [HttpPost("forgotpassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] LoginCreatingModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || !(await _userManager.IsEmailConfirmedAsync(user)))
            {
                // Don't reveal that the user does not exist or is not confirmed
                return BadRequest((int) HttpStatusCode.Forbidden);
            }

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            var callbackUrl = Url.Action("ResetPassword", "Account", new {userId = user.Id, code = code},
                protocol: HttpContext.Request.Scheme);
            await _emailSender.SendEmailAsync(model.Email, "Reset Password",
                $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");
            return StatusCode((int) HttpStatusCode.OK);
        }

        [HttpGet]
        [Route("ResetPassword", Name = "ResetPasswordRoute")]
        public async Task<IActionResult> ResetPassword(string userId = "", string code = "")
        {
            try
            {
//                _databaContext.
//                var user = _usersService.GetById(userId);
                var user = _userManager.FindByIdAsync(userId);
                await _userManager.ResetPasswordAsync(user.Result, code, "Newpass1@");
                return StatusCode((int)HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }
        
    }
}