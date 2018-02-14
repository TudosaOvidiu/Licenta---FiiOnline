using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Business.Services.Implementations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Services
{
    public class EmailSender : IEmailSender

    {
        private readonly IConfiguration _configuration;

        public EmailSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string email, string subject, string body)
        {

            string username = _configuration.GetValue<string>("Email:Username");
            string password = _configuration.GetValue<string>("Email:Password");

            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                
                Credentials = new NetworkCredential(username, password),
                EnableSsl = true
            };
            MailMessage message = new MailMessage(username, email, subject, body);
            message.IsBodyHtml = true;
            client.Send(message);


            

        }

    }
}