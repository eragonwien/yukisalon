using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YukiSalonApi.Models;

namespace YukiSalonApi.Services
{
    public class ContactRepository : IContactRepository
    {
        private readonly YUKISALONDEVContext context;

        public ContactRepository(YUKISALONDEVContext context)
        {
            this.context = context;
        }

        public void Add(Contact contact)
        {
            context.Contact.Add(contact);
        }

        public bool Exist(int id)
        {
            return context.Contact.Any(c => c.Id == id && c.IsActive);
        }

        public bool Exist(Contact contact)
        {
            return context.Contact.Any(c => c.Address1 == contact.Address1 && c.Address2 == contact.Address2 && c.Plz == contact.Plz && c.City == contact.City && c.IsActive);
        }

        public Task<List<Contact>> GetAll()
        {
            return context.Contact.Where(c => c.IsActive).ToListAsync();
        }

        public Task<Contact> GetOne(int id)
        {
            return context.Contact.Where(c => c.Id == id && c.IsActive).SingleAsync();
        }

        public string Remove(int id)
        {
            Contact removeContact = context.Contact.Where(c => c.Id == id).SingleOrDefault();
            int salonContactCount = context.Contact.Where(c => c.SalonId == removeContact.SalonId).Count();

            if (salonContactCount == 1)
            {
                return "Removing Salon not allowed";
            }

            if (removeContact != null)
            {
                removeContact.IsActive = false;
                context.Contact.Update(removeContact);
            }
            return string.Empty;
        }

        public Task SaveChanges()
        {
            return context.SaveChangesAsync();
        }

        public void Update(Contact contact)
        {
            context.Update(contact);

            // Creates new open hour
            if (contact.OpenHour.Any(h => h.Id <= 0))
            {
                AddNewOpenHour(contact);
            }

            // Removes open hour
            RemoveOpenHour(contact);

            context.UpdateRange(contact.OpenHour);
        }

        private void AddNewOpenHour(Contact contact)
        {
            // Create new openhour
            contact.OpenHour.Where(h => h.Id <= 0).ToList().ForEach(hour =>
            {
                context.Add(hour);
            });
            context.SaveChanges();
        }

        private void RemoveOpenHour(Contact contact)
        {
            var submittedOpenHours = contact.OpenHour.ToList();
            var currentOpenHours = context.OpenHour.Where(h => h.ContactId == contact.Id).ToList();
            if (currentOpenHours.Count > submittedOpenHours.Count)
            {
                var removedHours = currentOpenHours.Except(submittedOpenHours).ToList();
                context.OpenHour.RemoveRange(removedHours);
                context.SaveChanges();
            }
        }
    }
}
