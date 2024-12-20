//email: ushuarencs@gmail.com
//password: Signin2025

// init-db.js
db = db.getSiblingDB('ushuaren_dev');  // Explicitly select the database

// Insert documents into the homeCategories collection
db.homeCategories.insertMany([
    { name: "Rental", description: "Find rental places", icon: "url_to_icon_image" },
    { name: "Used", description: "Find used items", icon: "url_to_icon_image" }
]);

// Update specific documents with Chinese translations and descriptions
db.homeCategories.updateOne(
    {_id: ObjectId("676495aaa0714d44cb9220f5")},
    {$set: {name: "租赁", description: "出租房屋"}}
);

db.homeCategories.updateOne(
    {_id: ObjectId("676495aaa0714d44cb9220f6")},
    {$set: {name: "二手", description: "买卖二手"}}
);

// Log the updated documents!
printjson(db.homeCategories.find().toArray());
