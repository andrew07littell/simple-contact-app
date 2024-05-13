namespace ContactApi.Models;

public class ContactDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string ContactsCollectionName { get; set; } = null!;
}