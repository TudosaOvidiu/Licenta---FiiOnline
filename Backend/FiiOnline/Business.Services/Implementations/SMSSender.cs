using System;
using System.Threading.Tasks;
using Business.Services.Interfaces;
using Microsoft.Extensions.Options;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace Business.Services.Implementations
{
    public class SMSSender: ISMSSender
    {
        public async Task SendSmsAsync(string number, string message)
        {
            // Plug in your SMS service here to send a text message.
            // Your Account SID from twilio.com/console
            var accountSid = "AC4f33eb872121a0d46241aac2995d6dd2";
            // Your Auth Token from twilio.com/console
            var authToken = "843c6f1619ce82bdd0c760ba3b360b58";

            TwilioClient.Init(accountSid, authToken);

            try
            {
                MessageResource.Create(
                    to: new PhoneNumber(number),
                    from: new PhoneNumber("+15005550006"),
                    body: message);
            }
            catch (Exception e)
            {
             
            }
        }
    }
}