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
using Microsoft.Extensions.Logging;
using YukiSalonApi.Models;
using YukiSalonApi.Services;

namespace YukiSalonApi.Controllers
{
    public class AccountController : ControllerBase
    {
        private readonly IUserRepository repository;
        private readonly ILogger<AccountController> log;

        public AccountController(IUserRepository repository, ILogger<AccountController> log)
        {
            this.repository = repository;
            this.log = log;
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
                    User user = await repository.Authenticate(email, password);

                    Role role = await repository.GetRole(user);

                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Email, user.Email),
                        new Claim(ClaimTypes.Name, user.Email),
                        new Claim(ClaimTypes.Role, role.Title)
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
            catch (Exception ex)
            {
                log.LogError("[Login] Login failed. Email: {0}, Password: {1}, Message: {2}", email, password, ex.Message);
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