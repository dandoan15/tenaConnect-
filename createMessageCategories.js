var db = db.getSiblingDB('tenaconnectdb');

db.createCollection('messageCategories');
message = db.getCollection("messageCategories");
message.remove({});

message.insert(
{
	Category:"Plumbing"
})

message.insert(
{
	Category:"Electrical"
})

message.insert(
{
	Category:"Appliances"
})

message.insert(
{
	Category:"Bathroom"
})

message.insert(
{
	Category:"Flooring"
})

message.insert(
{
	Category:"Pest"
})

message.insert(
    {
        Category: "Payment"
    })

message.insert(
{
	Category:"Other"
})
