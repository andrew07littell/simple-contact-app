
using ContactApi.Models;
namespace ContactApi.Contexts;

using MongoDB.Driver;
using Microsoft.EntityFrameworkCore;
using MongoDB.EntityFrameworkCore.Extensions;

internal class ContactDbContext : DbContext
{
  public DbSet<Contact> Contacts { get; init; }

  private string CollectionName;

  public static ContactDbContext Create(IMongoDatabase database, string _CollectionName)
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