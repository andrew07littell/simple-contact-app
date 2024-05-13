using System.Collections.Generic;
using System.Threading.Tasks;
using ContactApi.Models;

namespace ContactApi.Repository
{
    public interface IContactRepository
    {
        Task<List<Contact>> GetAllAsync();
        Task<Contact> GetByIdAsync(string id);
        Task<List<Contact>> SearchByNameAsync(string name);
        Task<List<Contact>> SearchByPhoneNumberAsync(string phoneNumber);
        Task<List<Contact>> SearchByTagAsync(string tag);
        Task UpdateAsync(string id, Contact contact);
        Task CreateAsync(Contact contact);
        Task DeleteAsync(string id);
    }
}