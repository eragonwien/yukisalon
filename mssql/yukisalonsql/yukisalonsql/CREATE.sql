
use [YUKISALONDEV];
GO

drop table if exists [Product], [Category], [Salon], [OpenHour], [Contact], [Address], [Owner];
GO

CREATE TABLE [Owner] (
    [Id] int NOT NULL IDENTITY,
    [Name] nvarchar(max),
    [Description] nvarchar(max),
    [ExtraInfo] nvarchar(max),
    CONSTRAINT [PK_Owner] PRIMARY KEY ([Id]),
);
GO

CREATE TABLE [Address] (
    [Id] int NOT NULL IDENTITY,
    [Street] nvarchar(max),
    [PLZ] nvarchar(30),
    [City] nvarchar(max),
    CONSTRAINT [PK_Address] PRIMARY KEY ([Id]),
);
GO

CREATE TABLE [Contact] (
    [Id] int NOT NULL IDENTITY,
    [AddressId] int NOT NULL,
    [Name] nvarchar(50) NOT NULL UNIQUE,
    [Phone] nvarchar(50),
    [Facebook] nvarchar(50),
    [Email] nvarchar(50),
    CONSTRAINT [PK_Contact] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Contact_Address_AddressId] FOREIGN KEY ([AddressId]) REFERENCES [Address] ([Id])
);
GO

CREATE TABLE [OpenHour] (
    [Id] int NOT NULL IDENTITY,
	[ContactId] INT NOT NULL,
    [Day] nvarchar(30),
    [Open] nvarchar(10),
    [Close] nvarchar(10),
    CONSTRAINT [PK_OpenHour] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_OpenHour_Contact_ContactId] FOREIGN KEY ([ContactId]) REFERENCES [Contact] ([Id])
);
GO

CREATE TABLE [Salon] (
    [Id] int NOT NULL IDENTITY,
	[ContactId] INT NOT NULL,
	[OwnerId] INT NOT NULL,
    [Description] nvarchar(max),
    [ExtraInfo] nvarchar(max),
    CONSTRAINT [PK_Salon] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Salon_Contact_ContactId] FOREIGN KEY ([ContactId]) REFERENCES [Contact] ([Id]),
	CONSTRAINT [FK_Salon_Owner_OwnerId] FOREIGN KEY ([OwnerId]) REFERENCES [Owner] ([Id])
);
GO

CREATE TABLE [Category] (
    [Id] int NOT NULL IDENTITY,
    [SalonId] int,
    [SubcategoryId] int,
	[Image] nvarchar(max),
    CONSTRAINT [PK_Category] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Category_SubCategory_SubcategoryId] FOREIGN KEY ([SubcategoryId]) REFERENCES [Category] ([Id]),
	CONSTRAINT [FK_Category_Salon_SalonId] FOREIGN KEY ([SalonId]) REFERENCES [Salon] ([Id])
);
GO

CREATE TABLE [Product] (
    [Id] int NOT NULL IDENTITY,
	[CategoryId] int NOT NULL,
    [Description] nvarchar(max),
    [Price] money NOT NULL,
    [Currency] nvarchar(10) NOT NULL,
    [Image] nvarchar(max),
    [IsFeatured] bit,
    CONSTRAINT [PK_Product] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Product_Category_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
);
GO
