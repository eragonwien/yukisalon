
use [YUKISALONDEV];
GO

drop table if exists [Product], [Category], [Image], [User], [Role], [Welcome], [OpenHour], [Contact], [Salon];
GO

CREATE TABLE [Salon] (
    [Id] int NOT NULL IDENTITY,
	[Name] nvarchar(50) UNIQUE NOT NULL,
    [Description] nvarchar(max),
    [ExtraInfo] nvarchar(max),
	[IsActive] bit NOT NULL,
	[WelcomeTitle] nvarchar(max),
    [WelcomeText] nvarchar(max),
    CONSTRAINT [PK_Salon] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Contact] (
    [Id] int NOT NULL IDENTITY,
	[SalonId] INT NOT NULL,
	[Address1] nvarchar(50),
	[Address2] nvarchar(50),
	[PLZ] nvarchar(30),
	[City] nvarchar(30),
    [Phone] nvarchar(20),
    [Facebook] nvarchar(50),
    [Email] nvarchar(50),
	[IsActive] bit NOT NULL,
    CONSTRAINT [PK_Contact] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Contact_Salon_SalonId] FOREIGN KEY ([SalonId]) REFERENCES [Salon] ([Id])
);
GO

CREATE TABLE [OpenHour] (
    [Id] int NOT NULL IDENTITY,
	[ContactId] INT NOT NULL,
    [Day] nvarchar(10),
	[IsOpen] bit,
    [Open] nvarchar(5),
    [Close] nvarchar(5),
	[IsActive] bit NOT NULL,
    CONSTRAINT [PK_OpenHour] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_OpenHour_Contact_ContactId] FOREIGN KEY ([ContactId]) REFERENCES [Contact] ([Id])
);
GO

CREATE TABLE [Role] (
    [Id] int NOT NULL IDENTITY,
    [Title] nvarchar(max),
	[IsActive] bit NOT NULL,
    [Description] nvarchar(max),
    CONSTRAINT [PK_Role] PRIMARY KEY ([Id])
);
GO


CREATE TABLE [User] (
    [Id] int NOT NULL IDENTITY,
    [SalonId] int NOT NULL,
    [Email] nvarchar(50) UNIQUE NOT NULL,
	[Name] nvarchar(max),
    [Password] nvarchar(max),
    [Description] nvarchar(max),
    [ExtraInfo] nvarchar(max),
    [IsActive] bit NOT NULL,
    [IsDisplayed] bit,
    [RoleId] int NOT NULL,
    CONSTRAINT [PK_User] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_User_Salon_SalonId] FOREIGN KEY ([SalonId]) REFERENCES [Salon] ([Id]),
	CONSTRAINT [FK_User_Role_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [Role] ([Id])
);
GO

CREATE TABLE [Image] (
    [Id] int NOT NULL IDENTITY,
	[Data] nvarchar(max),
	[Name] nvarchar(max),
	[MimeType] nvarchar(64),
	[IsActive] bit NOT NULL,
    CONSTRAINT [PK_Image] PRIMARY KEY ([Id])
);
GO

CREATE TABLE [Category] (
    [Id] int NOT NULL IDENTITY,
    [SalonId] int,
    [ParentId] int,
	[ImageId] int,
	[Name] nvarchar(max),
	[IsSubcategory] bit NOT NULL DEFAULT 0,
	[IsActive] bit NOT NULL,
    CONSTRAINT [PK_Category] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Category_Parent_ParentId] FOREIGN KEY ([ParentId]) REFERENCES [Category] ([Id]),
	CONSTRAINT [FK_Category_Salon_SalonId] FOREIGN KEY ([SalonId]) REFERENCES [Salon] ([Id]),
	CONSTRAINT [FK_Category_Image_ImageId] FOREIGN KEY ([ImageId]) REFERENCES [Image] ([Id])
);
GO

CREATE TABLE [Product] (
    [Id] int NOT NULL IDENTITY,
	[CategoryId] int NOT NULL,
	[ImageId] int,
    [Name] nvarchar(max),
    [Description] nvarchar(max),
    [Price] money NOT NULL,
	[IsFixPrice] bit,
    [Currency] nvarchar(10) NOT NULL,
    [IsFeatured] bit,
	[IsActive] bit NOT NULL,
    CONSTRAINT [PK_Product] PRIMARY KEY ([Id]),
	CONSTRAINT [FK_Product_Category_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
	CONSTRAINT [FK_Product_Image_ImageId] FOREIGN KEY ([ImageId]) REFERENCES [Image] ([Id])
);
GO




