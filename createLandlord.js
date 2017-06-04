var db = db.getSiblingDB('tenaconnectdb');

db.createCollection('LandlordInfo');
listsCollection = db.getCollection("LandlordInfo");
listsCollection.remove({});
listsCollection.insert(
    {
        LandlordID: 'L0000001',
        FName: "Tom",
        LName: "Sawyer",
        PhoneNum: "(555)296-3445",
        Email: "mrsawyer@cruisingthemississippi.com",
        BuildingName: "Twain Apartments",
        NumTenants: 10
    }
);