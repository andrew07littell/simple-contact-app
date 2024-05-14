using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ContactApi.Models {
    public class PhoneNumber
    {
        public string Number { get; set; }
        public string Label { get; set; }
    }
    
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

        public string? Tag { get; set; }

        public List<PhoneNumber> PhoneNumbers { get; set; }
    }
}
