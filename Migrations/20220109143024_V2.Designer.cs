﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models;

namespace WebAPI.Migrations
{
    [DbContext(typeof(NGOContext))]
    [Migration("20220109143024_V2")]
    partial class V2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.11")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Models.Clanstvo", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("OrgID")
                        .HasColumnType("int");

                    b.Property<int>("VolId")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("OrgID");

                    b.HasIndex("VolId");

                    b.ToTable("ClanoviOrganizacija");
                });

            modelBuilder.Entity("Models.Organizacija", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("GodinaOtvaranja")
                        .HasColumnType("int");

                    b.Property<string>("MatBr")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Organizacije");
                });

            modelBuilder.Entity("Models.Projekat", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Aktivan")
                        .HasColumnType("bit");

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Opis")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<int?>("OrganizacijaID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("OrganizacijaID");

                    b.ToTable("Projekti");
                });

            modelBuilder.Entity("Models.Volonter", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Godine")
                        .HasColumnType("int");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("JMBG")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Volonter");
                });

            modelBuilder.Entity("Models.Clanstvo", b =>
                {
                    b.HasOne("Models.Organizacija", "Org")
                        .WithMany("Clanovi")
                        .HasForeignKey("OrgID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Models.Volonter", "Vol")
                        .WithMany("Organizacije")
                        .HasForeignKey("VolId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Org");

                    b.Navigation("Vol");
                });

            modelBuilder.Entity("Models.Projekat", b =>
                {
                    b.HasOne("Models.Organizacija", "Organizacija")
                        .WithMany("Projekti")
                        .HasForeignKey("OrganizacijaID");

                    b.Navigation("Organizacija");
                });

            modelBuilder.Entity("Models.Organizacija", b =>
                {
                    b.Navigation("Clanovi");

                    b.Navigation("Projekti");
                });

            modelBuilder.Entity("Models.Volonter", b =>
                {
                    b.Navigation("Organizacije");
                });
#pragma warning restore 612, 618
        }
    }
}
