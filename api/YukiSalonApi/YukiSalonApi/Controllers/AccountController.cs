using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YukiSalonApi.Models;
using YukiSalonApi.Services;

namespace YukiSalonApi.Controllers
{
    public class AccountController : ControllerBase
    {
        private readonly YUKISALONDEVContext context;

        public AccountController(YUKISALONDEVContext context)
        {
            this.context = context;
        }

        // POST: account/login
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(string email, string password, string language = "de")
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var user = context.User.Where(u => u.Email.Equals(email) && u.Password.Equals(password)).Single();
                    var userRole = context.Role.Where(r => r.Id.Equals(user.RoleId)).Single().Title;

                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(ClaimTypes.Name, user.Email),
                        new Claim(ClaimTypes.Role, userRole)
                    };

                    var userIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    var principal = new ClaimsPrincipal(userIdentity);
                    var authProperties = new AuthenticationProperties
                    {
                        IsPersistent = false,
                        ExpiresUtc = DateTime.Now.AddMonths(Constant.COOKIE_MAX_AGE_MONTH)
                    };
                    SetLanguage(language);

                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, authProperties);

                    return Ok();
                }
            }
            catch (Exception)
            {
                return Unauthorized();
            }

            return Unauthorized();
        }

        private void SetLanguage(string language)
        {
            Response.Cookies.Append(
                CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(language)),
                new CookieOptions { Expires = DateTimeOffset.Now.AddMonths(Constant.COOKIE_MAX_AGE_MONTH) });
        }

        // POST: account/logout
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }
    }
}