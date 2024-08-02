﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPI.Data;

#nullable disable

namespace WebAPI.Migrations
{
    [DbContext(typeof(OrderlyDbContext))]
    [Migration("20240730204515_createdb5914")]
    partial class createdb5914
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.7");

            modelBuilder.Entity("WebAPI.Models.Invoice", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("InvoiceId")
                        .HasColumnType("TEXT");

                    b.Property<string>("InvoiceStatus")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PaymentMethod")
                        .HasColumnType("TEXT");

                    b.Property<string>("SessionId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<decimal>("TotalAmount")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId");

                    b.HasIndex("SessionId");

                    b.ToTable("Invoices");
                });

            modelBuilder.Entity("WebAPI.Models.Item", b =>
                {
                    b.Property<string>("ItemId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("TEXT");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Ingredients")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ItemName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<decimal>("ItemPrice")
                        .HasColumnType("decimal(10, 2)");

                    b.Property<string>("KeyWords")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Portion")
                        .HasColumnType("INTEGER");

                    b.HasKey("ItemId");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("WebAPI.Models.Order", b =>
                {
                    b.Property<string>("OrderId")
                        .HasColumnType("TEXT");

                    b.Property<string>("OrderStatus")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("OrderId");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("WebAPI.Models.OrderItem", b =>
                {
                    b.Property<string>("OrderItemId")
                        .HasColumnType("TEXT");

                    b.Property<string>("ItemId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("OrderId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("OrderItemId");

                    b.HasIndex("ItemId");

                    b.HasIndex("OrderId");

                    b.ToTable("OrderItems");
                });

            modelBuilder.Entity("WebAPI.Models.Session", b =>
                {
                    b.Property<string>("SessionId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("WaiterId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("SessionId");

                    b.HasIndex("WaiterId");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("WebAPI.Models.Table", b =>
                {
                    b.Property<string>("TableId")
                        .HasColumnType("TEXT");

                    b.Property<string>("TableNumber")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("TableStatus")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("WaiterId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("TableId");

                    b.HasIndex("WaiterId");

                    b.ToTable("Tables");
                });

            modelBuilder.Entity("WebAPI.Models.User", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("SessionId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("TableId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("UserId");

                    b.HasIndex("SessionId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebAPI.Models.Waiter", b =>
                {
                    b.Property<string>("WaiterId")
                        .HasColumnType("TEXT");

                    b.Property<string>("WaiterName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("TEXT");

                    b.HasKey("WaiterId");

                    b.ToTable("Waiters");
                });

            modelBuilder.Entity("WebAPI.Models.Invoice", b =>
                {
                    b.HasOne("WebAPI.Models.Session", "Session")
                        .WithMany("Invoices")
                        .HasForeignKey("SessionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Session");
                });

            modelBuilder.Entity("WebAPI.Models.Order", b =>
                {
                    b.HasOne("WebAPI.Models.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebAPI.Models.OrderItem", b =>
                {
                    b.HasOne("WebAPI.Models.Item", "Item")
                        .WithMany("OrderItems")
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebAPI.Models.Order", "Order")
                        .WithMany("OrderItems")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Item");

                    b.Navigation("Order");
                });

            modelBuilder.Entity("WebAPI.Models.Session", b =>
                {
                    b.HasOne("WebAPI.Models.Waiter", "Waiter")
                        .WithMany("Sessions")
                        .HasForeignKey("WaiterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Waiter");
                });

            modelBuilder.Entity("WebAPI.Models.Table", b =>
                {
                    b.HasOne("WebAPI.Models.Waiter", "Waiter")
                        .WithMany("Tables")
                        .HasForeignKey("WaiterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Waiter");
                });

            modelBuilder.Entity("WebAPI.Models.User", b =>
                {
                    b.HasOne("WebAPI.Models.Session", "Session")
                        .WithMany("Users")
                        .HasForeignKey("SessionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Session");
                });

            modelBuilder.Entity("WebAPI.Models.Item", b =>
                {
                    b.Navigation("OrderItems");
                });

            modelBuilder.Entity("WebAPI.Models.Order", b =>
                {
                    b.Navigation("OrderItems");
                });

            modelBuilder.Entity("WebAPI.Models.Session", b =>
                {
                    b.Navigation("Invoices");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("WebAPI.Models.User", b =>
                {
                    b.Navigation("Orders");
                });

            modelBuilder.Entity("WebAPI.Models.Waiter", b =>
                {
                    b.Navigation("Sessions");

                    b.Navigation("Tables");
                });
#pragma warning restore 612, 618
        }
    }
}
