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
            var userNameNumber = _usersService.GetNumberOfSimilarNames(userModel.FirstName);
            userModel.Username = String.Format("{0}{1}", userModel.FirstName, (userNameNumber+1).ToString());
            try
            {
                var result = await _usersService.CreateAsync(userModel, _userManager);
                if (result.Succeeded)
                {
                    var user = _usersService.GetByUserName(userModel.Username);
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    //                    var callbackUrl = new Uri(Url.Link("ConfirmEmailRoute", new {userId = user.Id, code = code}));
                    var callbackUrl = String.Format("http://localhost:4200/#/account-confirmation?userId={0}&code={1}", user.Id,
                        code);
                    await _emailSender.SendEmailAsync(userModel.Email, "Confirm your account",
                        $"Please confirm your account by clicking here: <a href='{callbackUrl}'>link</a>");
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
        [Route("ConfirmAccount", Name = "ConfirmAccountRoute")]
        public async Task<IActionResult> ConfirmEmail(string userId = "", string code = "")
        {
            try
            {
                var user = _userManager.FindByIdAsync(userId).Result;
                var result = await _userManager.ConfirmEmailAsync(user, code);
                return Ok(result);
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
                return Json(new {token = _generator.GenerateJwtToken(model.Email, appUser), appUser});
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

            var callbackUrl = String.Format("http://localhost:4200/#/reset-password?userId={0}&code={1}", user.Id,
                code);
//            var callbackUrl = new Uri(Url.Link("ResetPasswordRoute", new {userId = user.Id, code = code}));
            await _emailSender.SendEmailAsync(model.Email, "Reset Password",
                $"Please reset your password by clicking here: <a href='{callbackUrl}'>link</a>");

            return StatusCode((int) HttpStatusCode.OK);
        }

        [HttpPost]
        [Route("ResetPassword", Name = "ResetPasswordRoute")]
        public async Task<IActionResult> ResetPassword([FromBody] LoginCreatingModel model, string userId = "", string code = "")
        {
            try
            {
                var user = _userManager.FindByIdAsync(userId);
                await _userManager.ResetPasswordAsync(user.Result, code, model.Password);

                return StatusCode((int) HttpStatusCode.OK);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}