
INSERT INTO users ("id", "createdAt", "updatedAt", "type", "status", "name", "email", "avatarImageFile", "jobTitle", "idpUsername", "notificationsOn", "acceptedTermsAt", "deactivatedOn", "deactivatedBy", "capabilities", "idpId", "lastAcceptedTermsAt") VALUES('39b86e99-9a39-49ae-8962-c7d815e56125', '2021-12-16 23:22:27.162+00', '2021-12-16 23:22:27.162+00', 'GOV', 'ACTIVE', 'Test Gov User', 'fake@gov.bc.ca', null, null, 'test-gov', null, null, null, null, '{}', 'test-gov', null);
INSERT INTO users ("id", "createdAt", "updatedAt", "type", "status", "name", "email", "avatarImageFile", "jobTitle", "idpUsername", "notificationsOn", "acceptedTermsAt", "deactivatedOn", "deactivatedBy", "capabilities", "idpId", "lastAcceptedTermsAt") VALUES('39b86e99-9a39-49ae-8962-c7d815e56126', '2021-12-16 23:22:27.162+00', '2021-12-16 23:22:27.162+00', 'ADMIN', 'ACTIVE', 'Test Admin User', 'fakeADMIN@gov.bc.ca', null, null, 'test-admin', null, null, null, null, '{}', 'test-admin', null);
INSERT INTO users ("id", "createdAt", "updatedAt", "type", "status", "name", "email", "avatarImageFile", "jobTitle", "idpUsername", "notificationsOn", "acceptedTermsAt", "deactivatedOn", "deactivatedBy", "capabilities", "idpId", "lastAcceptedTermsAt") VALUES('06172f56-f08c-4380-86db-603bec98a8c5', '2021-12-16 23:22:27.162+00', '2021-12-16 23:22:27.162+00', 'VENDOR', 'ACTIVE', 'Test Vendor User 2', 'fake2@gmail.com', null, null, 'test-vendor-2', null, null, null, null, '{}', 'test-vendor-2', null);
INSERT INTO users ("id", "createdAt", "updatedAt", "type", "status", "name", "email", "avatarImageFile", "jobTitle", "idpUsername", "notificationsOn", "acceptedTermsAt", "deactivatedOn", "deactivatedBy", "capabilities", "idpId", "lastAcceptedTermsAt") VALUES('06172f56-f08c-4380-86db-603bec98a8c4', '2021-12-16 23:22:27.162+00', '2022-02-16 17:19:55.296+00', 'VENDOR', 'ACTIVE', 'Test Vendor User', 'fake@gmail.com', null, '', 'test-vendor', null, '2022-02-16 17:16:54.572+00', null, null, '{"Agile Coaching","Backend Development","Delivery Management","DevOps Engineering","Frontend Development","Security Engineering","Technical Architecture","User Experience Design","User Research"}', 'test-vendor', null);

INSERT INTO organizations ("id", "createdAt", "legalName", "logoImageFile", "websiteUrl", "updatedAt", "streetAddress1", "streetAddress2", city, region, "mailCode", country, "contactName", "contactTitle", "contactEmail", "contactPhone", active, "deactivatedOn", "deactivatedBy", "acceptedSWUTerms") VALUES('0e593592-4df5-412c-bd68-cc7718e3bc74', '2022-02-16 16:50:25.321+00', 'Test Organization', null, null, '2022-02-16 16:50:25.321+00', '123 Street', null, 'Victoria', 'BC', 'V8W 2Z6', 'Canada', 'Test Vendor User', null, 'fake@gmail.com', null, 't', null, null, '2021-12-16 23:22:27.162+00');

INSERT INTO affiliations ("user", "organization", "createdAt", "membershipType", "updatedAt", "id", "membershipStatus") VALUES('06172f56-f08c-4380-86db-603bec98a8c4', '0e593592-4df5-412c-bd68-cc7718e3bc74', '2022-02-16 16:50:25.323+00', 'OWNER', '2022-02-16 16:50:25.323+00', 'afc2af74-1d2e-4a5b-8f7f-6315d4e7648f', 'ACTIVE');
INSERT INTO affiliations ("user", "organization", "createdAt", "membershipType", "updatedAt", "id", "membershipStatus") VALUES('06172f56-f08c-4380-86db-603bec98a8c5','0e593592-4df5-412c-bd68-cc7718e3bc74','2022-02-16 17:11:50.651+00','MEMBER','2022-02-16 17:11:50.651+00','d71e9046-04eb-46dc-96a9-d6c64b87219c','ACTIVE');
