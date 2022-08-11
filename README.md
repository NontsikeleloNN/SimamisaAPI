* the following decisions were made when creating the models
- ondelete was set to cascade, meaning that if the orphanage is deleted, so will the children
- sequilize makes the table names plural so please keep that it mind if you want to reference a table. Foreign keys are tableName+ID


* I didn't add the chat table to the database. Doesn't really make sense, I did create a model for it though, didn't add user call either. I will explore the options as we progress with our iterations

* The update event method is ment to be used in conjunction to the get event method where, the user will given back the information and will use that very info to update. So the must submit all the fields in json format. I expect that null checks, validation and all will be conducted in the front-end

* images will have to be sent in base64 and read out from the database in base64 then converted to images

* childneed should cater for donations as well instead of that thre way table
* an enumeration should be defined in the front-end in order to fill out the donation type. It could be a donation towrds a neeed or just a donation towards a certain amount. So I expect the type to be ITEM or DONATION

* item proposal now also work with donation. This is to eliminate redundancy, the disadvantage with this approach is the nulls being introduced. Will have to work closely with the front-end developer to mitigate invalid nulls. 

* the type in the item proposal field will now be used to figure out if this was a donation or giving of an item. If type == ITEM or DONATION do accordingly

* confirmProposal and acceptProposal are to set isFulfilled to true 

* You have to set isAccepted to true and only then will you be able to mark a proposal as fulfilled. Otherwise it will return an error

* calculations are done in the fulfill method, namely, the number of received items is updated. But if the button is pressed twice, 
1. Nothing will happen to the isFulfilled field
2. The number of received items will be incorrectly incremented. I will therefore need front-end people to not allow the button to be pressed twice. Maybe grey it out once pressed. BUT, you are able to update a proposal so that will be an option, you just send the json of whatever you want to edit

* The following are the defined routes :
- /simamisa/orphanages/getSingleOrphanage takes in an id in the body and brings back a single orphanage. I     only learnt later how to do query strings, I apologize that option is not available. I will fix it in our next iteration
Orphanages
- /simamisa/orphanages/ - gets all orphs
OrphanageManager
- /simamisa/orphanages/om/accept?propsalID=# accepts a proposal
- /simamisa/orphanages/om/confirm?proposalID=# sets a proposal as fulfilled and accordingly updates the related itemNeed


Donations
- all functions defined but I forgot to define the routes. Will have to redeploy so if they are needed, please let me know and I'll redeploy
Proposals
- */simamisa/orphanages/needs/proposals* 
- router.get('/',itemProposalController.getAllProposals)
- router.get('/:id',itemProposalController.getProposal)
- router.get('/item/:id',itemProposalController.getItemProposals)
- router.get('/user/:id',itemProposalController.getUserProposals)
- router.get('/unfulfilled',itemProposalController.getUnfulfilled) : thiss wil retrieve all the proposals that are unfulfilled
- router.put('/accept',OrphanageManagerController.acceptProposal) : accept a proposal an OM made


Needs
- */simamisa/orphanages/needs*
- router.get('/',itemNeedController.getAllNeeds)
- router.get('/active/',itemNeedController.getAllActiveNeeds)
- router.get('/orphanage/:id',itemNeedController.getOrphanageNeeds)
- router.get('/:name',itemNeedController.getAllActiveNeedsByName)
- router.post('/',itemNeedController.createItem)
- router.put('/',itemNeedController.updateItem)
- router.delete('/',itemNeedController.deleteItem) .../?id=#

Children

*/simamisa/orphanages/children*

- router.get('/',childController.getAllChildren)
- router.get('/mychildren',sponsorship.getMyChildren) .../mychildren?id=# the id is this case is the sponsor id
- router.get('/child', childController.getChildbyID) .../child?id=#

Events
- */simamisa/orphanages/events*
- router.get('/', eventController.getAllEvents);
- router.get('/orphanage/:id',eventController.getEventbyOrphanage);
- router.get('/id/:id',eventController.getEvent);
- router.get('/:name',eventController.getEventByName);
- router.post('/', eventController.createEvent);
- router.put('/:id', eventController.updateEvent);
- router.delete('/:id',eventController.deleteEvent);

Authentication
- */simamisa/orphanages/users*
- router.post('/register',authC.registerUser);
- router.post('/login',authC.login)


Sponsorship on Orphanage Manager side
*/simamisa/orphanages/om*

- router.put('/update',OrphanageManagerController.updateChildNeed) : 

- router.post('/sponsorship/accept',OrphanageManagerController.acceptSponsor) :
* here you make a person a sponsor, theyare added on to the list of sponsor. Everything concerning sponsorships will have to start here or the system will throw an exception. Takes in the id of the registered user you are trying to make a sponsor 
.../?id=#

- router.put('/childneed/confirm',OrphanageManagerController.fulfillChildNeed):
* here is where the childneeds can be set as fulfilled and will no longer show up on the needs
 ../?propsalID=#


- router.post('/sponsorship',OrphanageManagerController.createSponsorship): 
* here a sponsorship is created between a child and sponsor. Please refer to the list of tables I added at the bottom to see what fields are needed. 
.../?childID=#&sponsorID=#&seed=#

 */simamisa/orphanages/meetings*
- router.post('/', meetingController.createMeeting) : will take in the fields defined in the database. By default, the is accepted is said to false. The accept meeting method is there to change the accepted field to true. 
- router.get('/',meetingController.getAllActiveMeetings) : gets all meetings that have no passed the current date. This is where the OM should be able to accept or not keep the meeting 
- router.put('/',meetingController.acceptMeeting) : will change the isAccepted to true and  .. /id?=# this is the meetingID

Partnerships
*/simamisa/orphanages/partnering*

- router.post('/',partneringController.sendReq)// sending a partnering request (... /from?=x&to?=y)
- router.get('/',partneringController.getPartners) //get my partners ( orphanages/partnering/id?=x)
- router.post('/offers/',partneringController.sendOfferToAll) // (orphanages/partnering/offers/id?=x)
- router.post('/offers/',partneringController.sendOfferToOne) check table for a partnership
- router.put('/',partneringController.acceptRequest) // (/?from=x&to=y)
- router.get('/offers/',partneringController.getMyOffers) //ffers made to me .. /offers/?id=x
- router.get('/requests/', partneringController.getRequests) //get my .. /requests/?id=x


Main Route
- https://simamisa.herokuapp.com/

* Please not I will be updating our routes to use query strings as we progress with the project to make it easier to consume the api 

Please do not hesitate to reach out if you have any further questions


_______________________________________________________________________________________________________________

An example on how to consume + header requests
--------------------------------------------------------------------------------------------------------
fetch('https://simamisaapiv3.azurewebsites.net/simamisa/orphanages/users/login', {method: "POST"})
  .then(response => response.json())
  .then(json => console.log(json))
  ________________________________________________________________________________________________________

  var requestBody = {"Email" : "nozi@gmail.com",
                   "UserPassword" : "pass123"}

const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(requestBody)
}

fetch('https://simamisa.herokuapp.com/simamisa/orphanages/users/login', options)
  .then(response => response.json())
  .then(json => console.log(json))


===========================
Script to create the database as of 2022-08-01

CREATE TABLE `orphanagemanagers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `orphanageID` int(11) NOT NULL,
  `registeredUserID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `orphanageID` (`orphanageID`),
  KEY `registeredUserID` (`registeredUserID`),
  CONSTRAINT `orphanagemanagers_ibfk_1` FOREIGN KEY (`orphanageID`) REFERENCES `orphanages` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orphanagemanagers_ibfk_2` FOREIGN KEY (`registeredUserID`) REFERENCES `registeredusers` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE `volunteerskills` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SkillName` varchar(255) NOT NULL,
  `ValidationDoc` blob,
  `SkillDescription` varchar(255) DEFAULT NULL,
  `volunteerID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `volunteerID` (`volunteerID`),
  CONSTRAINT `volunteerskills_ibfk_1` FOREIGN KEY (`volunteerID`) REFERENCES `volunteers` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `volunteers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Profession` varchar(255) DEFAULT NULL,
  `TotalTimeServed` double DEFAULT NULL,
  `registeredUserID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `registeredUserID` (`registeredUserID`),
  CONSTRAINT `volunteers_ibfk_1` FOREIGN KEY (`registeredUserID`) REFERENCES `registeredusers` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `volunteerinfos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ArrivalTime` datetime NOT NULL,
  `DepartureTime` datetime NOT NULL,
  `volunteerID` int(11) NOT NULL,
  `serviceID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `volunteerID` (`volunteerID`),
  KEY `serviceID` (`serviceID`),
  CONSTRAINT `volunteerinfos_ibfk_1` FOREIGN KEY (`volunteerID`) REFERENCES `volunteers` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `volunteerinfos_ibfk_2` FOREIGN KEY (`serviceID`) REFERENCES `services` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `usersubscriptions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Status` varchar(255) NOT NULL,
  `SubscriptionDate` date NOT NULL,
  `OrphID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `OrphID` (`OrphID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `usersubscriptions_ibfk_1` FOREIGN KEY (`OrphID`) REFERENCES `orphanages` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usersubscriptions_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `registeredusers` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `stores` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `StoreName` varchar(255) NOT NULL,
  `StoreLink` varchar(255) DEFAULT NULL,
  `Active` char(255) NOT NULL,
  `orphanageID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `orphanageID` (`orphanageID`),
  CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`orphanageID`) REFERENCES `orphanages` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `sponsorships` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DateStarted` date NOT NULL,
  `MonthlySeed` int(11) DEFAULT NULL,
  `isActive` char(255) NOT NULL,
  `sponsorID` int(11) NOT NULL,
  `childID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `childID` (`childID`),
  KEY `sponsorID` (`sponsorID`),
  CONSTRAINT `sponsorships_ibfk_1` FOREIGN KEY (`sponsorID`) REFERENCES `sponsors` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sponsorships_ibfk_2` FOREIGN KEY (`childID`) REFERENCES `children` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

CREATE TABLE `sponsors` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Profession` varchar(255) NOT NULL,
  `registeredUserID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `registeredUserID` (`registeredUserID`),
  CONSTRAINT `sponsors_ibfk_1` FOREIGN KEY (`registeredUserID`) REFERENCES `registeredusers` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE `sponsorfiles` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DocumentName` varchar(255) NOT NULL,
  `DocumentFile` blob NOT NULL,
  `sponsorID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `sponsorID` (`sponsorID`),
  CONSTRAINT `sponsorfiles_ibfk_1` FOREIGN KEY (`sponsorID`) REFERENCES `sponsors` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `services` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ServiceName` varchar(255) NOT NULL,
  `ServiceDescription` varchar(255) NOT NULL,
  `VolunteerType` varchar(255) DEFAULT NULL,
  `Duration` double DEFAULT NULL,
  `CutOffDate` datetime DEFAULT NULL,
  `orphanageID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `orphanageID` (`orphanageID`),
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`orphanageID`) REFERENCES `orphanages` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `servicevolunteers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TimeServed` decimal(10,0) NOT NULL,
  `Comment` varchar(255) NOT NULL,
  `DateServed` date NOT NULL,
  `volunteerID` int(11) NOT NULL,
  `serviceID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `volunteerID` (`volunteerID`),
  KEY `serviceID` (`serviceID`),
  CONSTRAINT `servicevolunteers_ibfk_1` FOREIGN KEY (`volunteerID`) REFERENCES `volunteers` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `servicevolunteers_ibfk_2` FOREIGN KEY (`serviceID`) REFERENCES `services` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `registeredusers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) NOT NULL,
  `Surname` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Phonenumber` varchar(255) DEFAULT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `isFlagged` char(255) NOT NULL,
  `isVolunteer` tinyint(1) NOT NULL DEFAULT '0',
  `isSponsor` tinyint(1) NOT NULL DEFAULT '0',
  `isDonor` tinyint(1) NOT NULL DEFAULT '0',
  `UserPassword` varchar(255) NOT NULL,
  `UserRole` varchar(255) NOT NULL,
  `UserAddress` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

CREATE TABLE `products` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(255) NOT NULL,
  `ProductDescription` varchar(255) NOT NULL,
  `ProductCondition` varchar(255) NOT NULL,
  `ProductPrice` decimal(10,0) NOT NULL,
  `ProductImage` blob NOT NULL,
  `isAvailable` tinyint(1) NOT NULL,
  `storeID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `storeID` (`storeID`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`storeID`) REFERENCES `stores` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `partnerships` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PartnershipDate` date NOT NULL,
  `isActive` char(255) NOT NULL,
  `SenderID` int(11) NOT NULL,
  `ReceiverID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `SenderID` (`SenderID`),
  KEY `ReceiverID` (`ReceiverID`),
  CONSTRAINT `partnerships_ibfk_1` FOREIGN KEY (`SenderID`) REFERENCES `orphanages` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `partnerships_ibfk_2` FOREIGN KEY (`ReceiverID`) REFERENCES `orphanages` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `orphanages` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `OrphanageName` varchar(255) NOT NULL,
  `OrphanageAddress` varchar(255) NOT NULL,
  `OrphanageImage` varchar(255) NOT NULL,
  `OrphanageDescription` varchar(255) NOT NULL,
  `DateReg` varchar(255) NOT NULL,
  `Children` int(11) NOT NULL,
  `DefaultChildPassword` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

CREATE TABLE `offers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `Detail` varchar(255) NOT NULL,
  `DateMade` date NOT NULL,
  `isAccepted` tinyint(1) NOT NULL,
  `SendingPartner` int(11) NOT NULL,
  `orphanageID` int(11) DEFAULT NULL,
  `ReceivingPartner` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `SendingPartner` (`SendingPartner`),
  KEY `orphanageID` (`orphanageID`),
  KEY `ReceivingPartner` (`ReceivingPartner`),
  CONSTRAINT `offers_ibfk_1` FOREIGN KEY (`SendingPartner`) REFERENCES `orphanages` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `offers_ibfk_2` FOREIGN KEY (`orphanageID`) REFERENCES `orphanages` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `offers_ibfk_3` FOREIGN KEY (`ReceivingPartner`) REFERENCES `orphanages` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `offeritems` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ItemName` varchar(255) NOT NULL,
  `ItemDescription` varchar(255) NOT NULL,
  `ItemQuantity` int(11) NOT NULL,
  `offerID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `offerID` (`offerID`),
  CONSTRAINT `offeritems_ibfk_1` FOREIGN KEY (`offerID`) REFERENCES `offers` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `needfulfillments` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `NeedComment` varchar(255) DEFAULT 'FULFILLED',
  `DateGiven` date NOT NULL,
  `NumberGiven` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `messages` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DatetimeSent` datetime NOT NULL,
  `MessageContent` varchar(255) NOT NULL,
  `isFlagged` char(255) NOT NULL,
  `chatID` int(11) DEFAULT NULL,
  `SenderID` int(11) DEFAULT NULL,
  `ReceiverID` int(11) DEFAULT NULL,
  `childID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `chatID` (`chatID`),
  KEY `SenderID` (`SenderID`),
  KEY `ReceiverID` (`ReceiverID`),
  KEY `childID` (`childID`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`chatID`) REFERENCES `chats` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`SenderID`) REFERENCES `registeredusers` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`ReceiverID`) REFERENCES `registeredusers` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `messages_ibfk_4` FOREIGN KEY (`childID`) REFERENCES `children` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `meetings` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MeetingDate` datetime NOT NULL,
  `MeetingVenue` varchar(255) NOT NULL,
  `MeetingAccepted` tinyint(1) NOT NULL,
  `MeetingComments` varchar(255) DEFAULT NULL,
  `orphanageManagerID` int(11) NOT NULL,
  `registeredUserID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `orphanageManagerID` (`orphanageManagerID`),
  KEY `registeredUserID` (`registeredUserID`),
  CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`orphanageManagerID`) REFERENCES `orphanagemanagers` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `meetings_ibfk_2` FOREIGN KEY (`registeredUserID`) REFERENCES `registeredusers` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `itemneeds` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DueDate` datetime DEFAULT NULL,
  `DateEstablished` datetime DEFAULT NULL,
  `Title` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `isFulfilled` tinyint(1) NOT NULL DEFAULT '0',
  `PriorityRating` int(11) NOT NULL,
  `ItemImage` blob,
  `NumberReceived` int(11) NOT NULL,
  `NumberNeeded` int(11) NOT NULL,
  `AmountNeed` double DEFAULT NULL,
  `AmountReceived` double DEFAULT NULL,
  `UnitCost` double DEFAULT NULL,
  `orphanageID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `orphanageID` (`orphanageID`),
  CONSTRAINT `itemneeds_ibfk_1` FOREIGN KEY (`orphanageID`) REFERENCES `orphanages` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `itemproposals` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PickUpTime` datetime DEFAULT NULL,
  `PickUpPlace` varchar(255) DEFAULT NULL,
  `DropOffTime` datetime DEFAULT NULL,
  `NumberToGive` int(11) DEFAULT '0',
  `ProposalComment` varchar(255) DEFAULT NULL,
  `ProposalType` varchar(255) NOT NULL,
  `AmountGiven` double DEFAULT '0',
  `isFulfilled` tinyint(1) NOT NULL DEFAULT '0',
  `isAccepted` tinyint(1) NOT NULL DEFAULT '0',
  `itemNeedID` int(11) NOT NULL,
  `registeredUserID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `itemNeedID` (`itemNeedID`),
  KEY `registeredUserID` (`registeredUserID`),
  CONSTRAINT `itemproposals_ibfk_1` FOREIGN KEY (`itemNeedID`) REFERENCES `itemneeds` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `itemproposals_ibfk_2` FOREIGN KEY (`registeredUserID`) REFERENCES `registeredusers` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `events` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `EventName` varchar(255) NOT NULL,
  `EventDescription` varchar(255) NOT NULL,
  `EventPoster` longblob NOT NULL,
  `EventDate` datetime NOT NULL,
  `orphanageID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `orphanageID` (`orphanageID`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`orphanageID`) REFERENCES `orphanages` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `donations` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DueDate` date DEFAULT NULL,
  `DateEstablished` date NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `isFufilled` tinyint(1) DEFAULT NULL,
  `PriorityRating` int(11) NOT NULL,
  `ItemImage` blob,
  `isFullfilled` tinyint(1) NOT NULL,
  `AmountReceived` double NOT NULL,
  `AmountNeeded` double NOT NULL,
  `DonationType` varchar(255) DEFAULT NULL,
  `orphanageID` int(11) DEFAULT NULL,
  `childNeedID` int(11) DEFAULT NULL,
  `itemNeedID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `orphanageID` (`orphanageID`),
  KEY `childNeedID` (`childNeedID`),
  KEY `itemNeedID` (`itemNeedID`),
  CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`orphanageID`) REFERENCES `orphanages` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `donations_ibfk_2` FOREIGN KEY (`childNeedID`) REFERENCES `childneeds` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `donations_ibfk_3` FOREIGN KEY (`itemNeedID`) REFERENCES `itemneeds` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `donationfulfillments` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DonationComment` varchar(255) DEFAULT NULL,
  `isFulfilled` tinyint(1) DEFAULT '0',
  `DateGiven` date NOT NULL,
  `AmountGiven` double NOT NULL,
  `donationID` int(11) DEFAULT NULL,
  `registeredUserID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `donationID` (`donationID`),
  KEY `registeredUserID` (`registeredUserID`),
  CONSTRAINT `donationfulfillments_ibfk_1` FOREIGN KEY (`donationID`) REFERENCES `donations` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `donationfulfillments_ibfk_2` FOREIGN KEY (`registeredUserID`) REFERENCES `registeredusers` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `children` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `Nickname` varchar(255) NOT NULL,
  `ChildDescription` varchar(255) NOT NULL,
  `ChildStruggles` varchar(255) NOT NULL,
  `Avatar` blob NOT NULL,
  `ChildPassword` varchar(255) NOT NULL,
  `orphanageID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Username` (`Username`),
  KEY `orphanageID` (`orphanageID`),
  CONSTRAINT `children_ibfk_1` FOREIGN KEY (`orphanageID`) REFERENCES `orphanages` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

CREATE TABLE `childneeds` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `DueDate` datetime DEFAULT NULL,
  `Title` varchar(255) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `isFullfilled` tinyint(1) NOT NULL,
  `AmountReceived` double DEFAULT NULL,
  `AmountNeeded` double DEFAULT NULL,
  `sponsorshipID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `sponsorshipID` (`sponsorshipID`),
  CONSTRAINT `childneeds_ibfk_1` FOREIGN KEY (`sponsorshipID`) REFERENCES `sponsorships` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `chats` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ChatDate` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

    
