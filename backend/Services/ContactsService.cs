using ContactApi.Models;
using ContactApi.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactApi.Services
{
    public class ContactsService : IContactsService
    {
        private readonly IContactRepository _contactRepository;

        public ContactsService(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        public Task<List<Contact>> GetAllAsync() =>
            _contactRepository.GetAllAsync();

        public Task<Contact> GetAsync(string id) =>
            _contactRepository.GetByIdAsync(id);

        public Task<List<Contact>> SearchByNameAsync(string name) =>
            _contactRepository.SearchByNameAsync(name);

        public Task<List<Contact>> SearchByPhoneNumberAsync(string phoneNumber) =>
            _contactRepository.SearchByPhoneNumberAsync(phoneNumber);

        public Task UpdateAsync(string id, Contact contact) =>
            _contactRepository.UpdateAsync(id, contact);

        public Task CreateAsync(Contact contact) =>
            _contactRepository.CreateAsync(contact);

        public Task DeleteAsync(string id) =>
            _contactRepository.DeleteAsync(id);
    }

}
