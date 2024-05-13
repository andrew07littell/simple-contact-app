using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace ContactApi.Models;

public class Contact
{
    [BsonId]
    public ObjectId _id { get; set; }

    public string Id { 
        get => _id.ToString();
     }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string? Email { get; set; }

    public List<string>? PhoneNumbers { get; set; }
}