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

        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Contact> Contact { get; set; }
        public virtual DbSet<OpenHour> OpenHour { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Salon> Salon { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
            });

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.Property(e => e.Address1).HasMaxLength(50);

                entity.Property(e => e.Address2).HasMaxLength(50);

                entity.Property(e => e.City).HasMaxLength(30);

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.Facebook).HasMaxLength(50);

                entity.Property(e => e.Phone).HasMaxLength(20);

                entity.Property(e => e.Plz)
                    .HasColumnName("PLZ")
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<OpenHour>(entity =>
            {
                entity.Property(e => e.Close).HasMaxLength(5);

                entity.Property(e => e.Day).HasMaxLength(10);

                entity.Property(e => e.Open).HasMaxLength(5);

            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.Currency)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(e => e.Price).HasColumnType("money");

            });

            modelBuilder.Entity<Salon>(entity =>
            {
                entity.HasIndex(e => e.Name)
                    .HasName("UQ__Salon__737584F6840A7544")
                    .IsUnique();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(30);

            });
        }
    }
}
