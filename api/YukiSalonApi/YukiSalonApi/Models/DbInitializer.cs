using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Services;
using YukiSalonApi.Models;

namespace YukiSalonApi.Models
{
    public class DbInitializer
    {

        public static void Initalize(YUKISALONDEVContext context)
        {
            if (context.Salon.Any())
            {
                return;
            }

            CreateSalon(context);

            CreateRoles(context);
            CreateUser(context);

            CreateContact(context);
            CreateOpenHours(context);

            CreateCategories(context);
            CreateSubCategories(context);
            CreateProducts(context);

            CreateWelcome(context);
        }

        private static void CreateSalon(YUKISALONDEVContext context)
        {
            Salon salon = new Salon()
            {
                Name = "Yuki Tuyet's Spa",
                Description = "Yuki Tuyet Spa's Description",
                IsActive = true,
                ExtraInfo = ""
            };
            context.Salon.Add(salon);
            context.SaveChanges();
        }

        private static void CreateRoles(YUKISALONDEVContext context)
        {
            var roles = new List<Role>()
            {
                new Role { Title = "Client", Description = "Client who can only view", IsActive = true },
                new Role { Title = "Admin", Description = "Admin who can modify salon settings", IsActive = true },
            };
            roles.ForEach(role =>
            {
                context.Role.Add(role);
            });
            context.SaveChanges();
        }

        private static void CreateUser(YUKISALONDEVContext context)
        {
            if (!context.Salon.Any())
            {
                return;
            }

            // Salon service
            SalonService salonService = new SalonService();

            Salon salon = context.Salon.First();
            Role adminRole = context.Role.Where(r => r.Title.Equals("Admin")).Single();
            User owner = new User()
            {
                Name = "Yuki Tuyet",
                SalonId = salon.Id,
                RoleId = adminRole.Id,
                Email = "tuyetvienna@gmail.com",
                Password = salonService.GetEncodedPassword("1212"),
                ExtraInfo = "",
                IsActive = true,
                IsDisplayed = true,
                Description = "Yuki Tuyet personal info"
            };
            context.User.Add(owner);
            context.SaveChanges();
        }

        private static void CreateContact(YUKISALONDEVContext context)
        {
            if (!context.Salon.Any())
            {
                return;
            }

            Salon salon = context.Salon.First();
            Contact contact = new Contact()
            {
                SalonId = salon.Id,
                Address1 = "Neubaugasse 73",
                Address2 = "",
                Plz = "1070",
                City = "Wien",
                Email = "tuyetvienna@gmail.com",
                Phone = "0699 10019541",
                Facebook = "",
                IsActive = true
            };
            context.Contact.Add(contact);
            context.SaveChanges();
        }

        private static void CreateOpenHours(YUKISALONDEVContext context)
        {
            if (!context.Contact.Any())
            {
                return;
            }

            Contact contact = context.Contact.First();
            var openHours = new OpenHour[]
            {
                new OpenHour() { Day = "Mo.", IsOpen = true, Open = "12:00", Close = "19:00", ContactId = contact.Id },
                new OpenHour() { Day = "Di. - Fr.", IsOpen = true, Open = "09:00", Close = "19:00", ContactId = contact.Id },
                new OpenHour() { Day = "Sa.", IsOpen = true, Open = "09:00", Close = "16:00", ContactId = contact.Id },
                new OpenHour() { Day = "So.", IsOpen = false, ContactId = contact.Id },
                new OpenHour() { Day = "Feiertag", IsOpen = false, ContactId = contact.Id }
            };
            foreach (var openHour in openHours)
            {
                context.OpenHour.Add(openHour);
            }
            context.SaveChanges();
        }

        private static void CreateCategories(YUKISALONDEVContext context)
        {
            if (!context.Salon.Any())
            {
                return;
            }

            Salon salon = context.Salon.First();
            Category friseur = new Category()
            {
                Name = "Friseur",
                SalonId = salon.Id,
                IsActive = true
            };
            context.Category.Add(friseur);
            context.SaveChanges();
        }

        private static void CreateSubCategories(YUKISALONDEVContext context)
        {
            if (!context.Category.Any())
            {
                return;
            }

            Category parentCategory = context.Category.First();

            Category friseurHerren = new Category()
            {
                Name = "Herren",
                ParentId = parentCategory.Id,
                SalonId = parentCategory.SalonId,
                IsActive = true,
                IsSubcategory = true
            };

            context.Category.Add(friseurHerren);
            context.SaveChanges();
        }

        private static void CreateProducts(YUKISALONDEVContext context)
        {
            if (!context.Category.Any())
            {
                return;
            }

            Category category = context.Category.Where(c => c.ParentId != null).First();

            Product haareSchneiden = new Product()
            {
                Name = "Trockenschnitt",
                Price = 10.99m,
                IsFixPrice = false,
                Currency = "€",
                IsFeatured = true,
                IsActive = true,
                CategoryId = category.Id
            };

            context.Product.Add(haareSchneiden);
            context.SaveChanges();
        }

        private static void CreateWelcome(YUKISALONDEVContext context)
        {
            if (!context.Salon.Any())
            {
                return;
            }
            Salon salon = context.Salon.First();
            Welcome welcome = new Welcome
            {
                SalonId = salon.Id,
                Title = "Welcome",
                Text1 = "TEXT1",
                Text2 = "TEXT2",
                IsActive = true
            };
            context.Welcome.Add(welcome);
            context.SaveChanges();
        }
    }
}
