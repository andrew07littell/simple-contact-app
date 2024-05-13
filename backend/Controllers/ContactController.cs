using ContactApi.Models;
using ContactApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace ContactApiServer.Controllers;

[ApiController]
[Route("contacts")]
public class ContactController : ControllerBase
{
    private readonly IContactsService _contactsService;

    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<ContactController> _logger;

    public ContactController(ILogger<ContactController> logger, IContactsService contactsService)
    {
        _logger = logger;
        _contactsService = contactsService;
    }

    // POST /contacts
    [HttpPost]
    public async Task<ActionResult<Contact>> Post(Contact contact)
    {
        await _contactsService.CreateAsync(contact);
        return Ok(contact);
    }

    // GET /contacts
    [HttpGet]
    public async Task<ActionResult<List<Contact>>> Get()
    {
        var contacts = await _contactsService.GetAllAsync();    
        return Ok(contacts);
    }

    // GET /contacts/{contactId}
    [HttpGet("{id}")]
    public async Task<ActionResult<Contact>> Get(string id)
    {
        var contact = await _contactsService.GetAsync(id);
        if (contact == null)
        {
            return NotFound();
        }
        return Ok(contact);
    }


    // GET /contacts/search/name
    [HttpGet("search/name/{name}")]
    public async Task<ActionResult<List<Contact>>> SearchByName(string name)
    {
        var contacts = await _contactsService.SearchByNameAsync(name);
        return contacts;
    }

    // GET /contacts/search/phonenumber
    [HttpGet("search/phonenumber/{phoneNumber}")]
    public async Task<ActionResult<List<Contact>>> SearchByPhoneNumber(string phoneNumber)
    {
        var contacts = await _contactsService.SearchByPhoneNumberAsync(phoneNumber);
        return contacts;
    }

    // PUT /contacts/{contactId}
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(string id, Contact contact)
    {
        await _contactsService.UpdateAsync(id, contact);
        return NoContent();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        await _contactsService.DeleteAsync(id);
        return NoContent();
    }
}
