using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using yukisalon.Models;

namespace yukisalon.Controllers
{
    public class AccountController : Controller
    {
        private readonly YUKISALONDEVContext context;

        public AccountController(YUKISALONDEVContext context)
        {
            this.context = context;
        }

        public async Task<IActionResult> Login(LoginViewModel loginModel)
        {
            if (ModelState.IsValid && IsUserValid(loginModel.Email, loginModel.Password))
            {
                var user = context.User.Where(u => u.Email.Equals(loginModel.Email)).Single();
                var userRole = context.Role.Where(r => r.Id.Equals(user.RoleId)).Single().Title;

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Role, userRole)
                };

                var userIdentity = new ClaimsIdentity(claims, Properties.Resources.LoginClaimIdentity);
                var principal = new ClaimsPrincipal(userIdentity);
                var authProperties = new AuthenticationProperties { IsPersistent = true };
                await HttpContext.SignInAsync(principal, authProperties);

                return Ok();
            }

            return Unauthorized();
        }

        private bool IsUserValid(string email, string password)
        {
            return true;
        }
    }
}