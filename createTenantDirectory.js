var db = db.getSiblingDB('tenaconnectdb');

db.createCollection('tenantInfo');
listsCollection = db.getCollection("tenantInfo");
listsCollection.remove({});
listsCollection.insert(
{
    Room: 22,
    TenantID: 'T0002910',
    LandlordID: 'L0000001',
    FName: "Jack",
    LName: "Ryder",
    PhoneNum: "(555)123-4567",
    Email: "jRyder@myradio.com"
}
);
listsCollection.insert(
{
    Room: 12,
    TenantID: 'T0002145',
    LandlordID: 'L0000001',
    FName: "Veronica",
    LName: "Vreeland",
    PhoneNum: "(555)250-6651",
    Email: "vvreeland1@notareporter.com"
}
);
listsCollection.insert(
{
    Room: 53,
    TenantID: 'T0003789',
    LandlordID: 'L0000001',
    FName: "Thomas",
    LName: "Elliot",
    PhoneNum: "(555)443-5964",
    Email: "drtelliot@crazymail.com"
}
);
listsCollection.insert(
{
    Room: 36,
    TenantID: 'T0003221',
    LandlordID: 'L0000001',
    FName: "Harvey",
    LName: "Bullock",
    PhoneNum: "(555)271-9943",
    Email: "bullocktheboss@policehq.com"
}
);
listsCollection.insert(
{
    Room: 44,
    TenantID: 'T0001943',
    LandlordID: 'L0000001',
    FName: "Nora",
    LName: "Fries",
    PhoneNum: "(555)179-6234",
    Email: "mrsfreeze@coldforyears.com"
}
);


