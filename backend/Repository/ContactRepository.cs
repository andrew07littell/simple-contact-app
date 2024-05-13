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
            await _dbContext.Contacts.FindAsync(id);

        public async Task<List<Contact>> SearchByNameAsync(string name) =>
            await _dbContext.Contacts.Where(contact => contact.FirstName.Contains(name) || contact.LastName.Contains(name)).ToListAsync();

        public async Task<List<Contact>> SearchByPhoneNumberAsync(string phoneNumber) =>
            await _dbContext.Contacts.Where(contact => contact.PhoneNumbers != null && contact.PhoneNumbers.Any(p => p.Number.Contains(phoneNumber))).ToListAsync();

        public async Task UpdateAsync(string id, Contact contact)
        {
            var existingContact = await _dbContext.Contacts.FindAsync(id);
            if (existingContact != null)
            {
                existingContact.FirstName = contact.FirstName;
                existingContact.LastName = contact.LastName;
                existingContact.Email = contact.Email;
                existingContact.PhoneNumbers = contact.PhoneNumbers;

                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task CreateAsync(Contact contact)
        {
            await _dbContext.Contacts.AddAsync(contact);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(string id)
        {
            var contact = await _dbContext.Contacts.FindAsync(id);
            if (contact != null)
            {
                _dbContext.Contacts.Remove(contact);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
