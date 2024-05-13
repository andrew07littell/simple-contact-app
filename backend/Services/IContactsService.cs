using System.Collections.Generic;
using System.Threading.Tasks;
using ContactApi.Models;

namespace ContactApi.Services
{
    public interface IContactsService
    {
        Task<List<Contact>> GetAllAsync();
        Task<Contact> GetAsync(string id);
        Task<List<Contact>> SearchByNameAsync(string name);
        Task<List<Contact>> SearchByPhoneNumberAsync(string phoneNumber);
        Task UpdateAsync(string id, Contact contact);
        Task CreateAsync(Contact contact);
        Task DeleteAsync(string id);
    }
}