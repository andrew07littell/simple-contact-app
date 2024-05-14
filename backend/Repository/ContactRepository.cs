using ContactApi.Models;
using ContactApi.Contexts;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace ContactApi.Repository
{
    public class ContactRepository : IContactRepository
    {
        private readonly ContactDbContext _dbContext;

        public ContactRepository(ContactDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Contact>> GetAllAsync() =>
            await _dbContext.Contacts.ToListAsync();

        public async Task<Contact> GetByIdAsync(string id) =>
            await _dbContext.Contacts.SingleOrDefaultAsync(contact => contact._id.ToString() == id);

        public async Task<List<Contact>> SearchByNameAsync(string name) =>
            await _dbContext.Contacts.Where(contact => contact.FirstName.Contains(name) || contact.LastName.Contains(name)).ToListAsync();

        public async Task<List<Contact>> SearchByPhoneNumberAsync(string phoneNumber) =>
            await _dbContext.Contacts
                .Where(contact => contact.PhoneNumbers.Count != 0 && contact.PhoneNumbers.Any(pn => pn.Number.Contains(phoneNumber)))
                .ToListAsync();


        public async Task<List<Contact>> SearchByTagAsync(string tag) =>
            await _dbContext.Contacts
                .Where(contact => contact.Tag.Contains(tag))
                .ToListAsync();

        public async Task UpdateAsync(string id, Contact contact)
        {
            var existingContact = _dbContext.Contacts.FirstOrDefault(contact => contact._id.ToString() == id);
            if (contact.FirstName != null)
            {
                existingContact.FirstName = contact.FirstName;
            }
            if (contact.LastName != null)
            {
                existingContact.LastName = contact.LastName;
            }
            if (contact.Email != null)
            {
                existingContact.Email = contact.Email;
            }
            if (contact.PhoneNumbers != null)
            {
                existingContact.PhoneNumbers = contact.PhoneNumbers;
            }
            _dbContext.SaveChanges();
        }

        public async Task CreateAsync(Contact contact)
        {
            await _dbContext.Contacts.AddAsync(contact);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(string id)
        {
            var contact = _dbContext.Contacts.FirstOrDefault(contact => contact._id.ToString() == id);
            if (contact != null)
            {
                _dbContext.Contacts.Remove(contact);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
