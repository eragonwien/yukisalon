﻿using System;
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
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<Salon> Salon { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<Welcome> Welcome { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.SubCategory)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("FK_Category_Parent_ParentId");

                entity.HasOne(d => d.Salon)
                    .WithMany(p => p.Category)
                    .HasForeignKey(d => d.SalonId);
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

                entity.HasOne(d => d.Salon)
                    .WithMany(p => p.Contact)
                    .HasForeignKey(d => d.SalonId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<OpenHour>(entity =>
            {
                entity.Property(e => e.Close).HasMaxLength(5);

                entity.Property(e => e.Day).HasMaxLength(10);

                entity.Property(e => e.Open).HasMaxLength(5);

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
                entity.HasIndex(e => e.Name)
                    .HasName("UQ__Salon__737584F68FE9FBD9")
                    .IsUnique();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .HasName("UQ__User__A9D105347E66B573")
                    .IsUnique();

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.Salon)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.SalonId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Welcome>(entity =>
            {
                entity.HasOne(d => d.Salon)
                    .WithOne(p => p.Welcome)
                    .HasForeignKey<Welcome>(d => d.SalonId);
            });
        }
    }
}
