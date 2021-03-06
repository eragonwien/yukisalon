﻿using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Models;
using YukiSalonApi.Services;

namespace YukiSalonApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // AppSettings
            services.Configure<CorsSettings>(Configuration.GetSection(nameof(CorsSettings)));

            // Services
            services.AddDbContext<YUKISALONDEVContext>(options => options.UseSqlServer(Configuration.GetConnectionString("YUKISALON")));
            services.AddScoped<ISalonRepository, SalonRepository>();

            // Authentication
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(option =>
            {
                option.SlidingExpiration = true;
                option.Cookie.HttpOnly = false;
                option.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
            });

            var allowedOrigins = GetAllowedOrigins();
            // CORS Policy
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin", b => b.WithOrigins(allowedOrigins).AllowCredentials());
            });

            // Health check
            services.AddHealthChecks();

            // MVC
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
                .AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
        }

        private string[] GetAllowedOrigins()
        {
            CorsSettings corsSettings = Configuration.GetSection(nameof(CorsSettings)).Get<CorsSettings>();
            return corsSettings.AllowedOrigins?.Split(";").ToArray();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseCors();
            }
            else
            {
                app.UseHsts();
                app.UseCors("AllowSpecificOrigin");
            }

            // Localzitation
            var supportedCultures = new CultureInfo[]
            {
                new CultureInfo("en"),
                new CultureInfo("de")
            };

            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture("en"),
                SupportedCultures = supportedCultures,
                SupportedUICultures = supportedCultures
            });

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseMvc();
            app.UseHealthChecks("/hc");
        }
    }
}
