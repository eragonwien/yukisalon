using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace yukisalon.Models
{
    public partial class YUKISALONDEVContext : DbContext
    {
        public YUKISALONDEVContext()
        {
        }

        public YUKISALONDEVContext(DbContextOptions<YUKISALONDEVContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Address { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Contact> Contact { get; set; }
        public virtual DbSet<OpenHour> OpenHour { get; set; }
        public virtual DbSet<Owner> Owner { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Salon> Salon { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Address>(entity =>
            {
                entity.Property(e => e.Plz)
                    .HasColumnName("PLZ")
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasOne(d => d.Salon)
                    .WithMany(p => p.Category)
                    .HasForeignKey(d => d.SalonId);

                entity.HasOne(d => d.Subcategory)
                    .WithMany(p => p.InverseSubcategory)
                    .HasForeignKey(d => d.SubcategoryId)
                    .HasConstraintName("FK_Category_SubCategory_SubcategoryId");
            });

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.HasIndex(e => e.Name)
                    .HasName("UQ__Contact__737584F6DFC8BF44")
                    .IsUnique();

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.Facebook).HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Phone).HasMaxLength(50);

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Contact)
                    .HasForeignKey(d => d.AddressId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<OpenHour>(entity =>
            {
                entity.Property(e => e.Close).HasMaxLength(10);

                entity.Property(e => e.Day).HasMaxLength(30);

                entity.Property(e => e.Open).HasMaxLength(10);

                entity.HasOne(d => d.Contact)
                    .WithMany(p => p.OpenHour)
                    .HasForeignKey(d => d.ContactId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Currency)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Price).HasColumnType("money");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Product)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Salon>(entity =>
            {
                entity.HasOne(d => d.Contact);
                entity.HasOne(d => d.Owner);
            });
        }
    }
}
