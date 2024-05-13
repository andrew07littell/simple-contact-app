using ContactApi.Models;
using ContactApi.Contexts;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Microsoft.EntityFrameworkCore;

namespace ContactApi.Services;

public class ContactsService
{

    private readonly ContactDbContext db;

    public ContactsService(
        IOptions<ContactDatabaseSettings> contactDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            contactDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            contactDatabaseSettings.Value.DatabaseName);

        db = ContactDbContext.Create(mongoDatabase, contactDatabaseSettings.Value.ContactsCollectionName);
    }

    public async Task<List<Contact>> GetAllAsync() =>
        await db.Contacts.ToListAsync();

    public async Task<Contact> GetAsync(string id) =>
        await db.Contacts.SingleOrDefaultAsync(contact => contact._id.ToString() == id);


    public async Task<List<Contact>> SearchByNameAsync(string name) =>
         db.Contacts.Where(contact => contact.FirstName.Contains(name) || contact.LastName.Contains(name)).ToList();

    public async Task<List<Contact>> SearchByPhoneNumberAsync(string phoneNumber) =>
        db.Contacts.Where(contact => contact.PhoneNumbers.Contains(phoneNumber)).ToList();
        
    public async Task UpdateAsync(string id, Contact contact)
    {
        var existingContact = db.Contacts.FirstOrDefault(contact => contact._id.ToString() == id);
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
        db.SaveChanges();
    }

    public async Task CreateAsync(Contact contact)
    {
        db.Contacts.Add(contact);
        db.SaveChanges();
    }

    public async Task DeleteAsync(string id)
    {
        var contact = db.Contacts.Single(contact => contact._id.ToString() == id);
        if(contact != null) {
            db.Contacts.Remove(contact);
            db.SaveChanges();
        }
    }
}