
using ContactApi.Models;

using MongoDB.Driver;
using Microsoft.EntityFrameworkCore;
using MongoDB.EntityFrameworkCore.Extensions;


namespace ContactApi.Contexts {
    public class ContactDbContext : DbContext
    {
      public DbSet<Contact> Contacts { get; init; }

      private string CollectionName;

      public ContactDbContext Create(IMongoDatabase database, string _CollectionName)
      {
        var context = new ContactDbContext(new DbContextOptionsBuilder<ContactDbContext>()
              .UseMongoDB(database.Client, database.DatabaseNamespace.DatabaseName)
              .Options);
        context.CollectionName = _CollectionName;
        return context;
      }

      public ContactDbContext(DbContextOptions options)
          : base(options)
      {
      }

      protected override void OnModelCreating(ModelBuilder modelBuilder)
      {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Contact>().ToCollection(this.CollectionName);
      }
    }
}