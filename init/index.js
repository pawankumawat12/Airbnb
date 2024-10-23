const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing")

main().then((res) =>{
    console.log("connected the db");
}).catch((err) =>{
    console.log(err);
})

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/airbnb');
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj, owner: '67125003f71a8c0529e2f0a2'}))
    await Listing.insertMany(initData.data);
    console.log("data is initilized");  
}

initDB();