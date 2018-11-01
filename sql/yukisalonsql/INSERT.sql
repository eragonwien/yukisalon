use [YUKISALONDEV];
GO

DELETE FROM [Product];
DELETE FROM [Category];
DELETE FROM [Salon];
DELETE FROM [OpenHour];
DELETE FROM [Contact];
DELETE FROM [Address];
DELETE FROM [Owner];
GO

INSERT INTO [Owner] ([Name], [Description], [ExtraInfo]) VALUES ('Yuki Tuyet', 'ist eine professionelle Friseurin mit mehr als 20 Jahren Erfahrung sowohl im Inland als ach im Ausland. Yuki und Ihr Team bieten ihren Kunden ausgezeichnete Dienstleistungen an. Darüber hinauss werden Produkte berühmter Hersteller weltweit verwendet.', '');
GO
