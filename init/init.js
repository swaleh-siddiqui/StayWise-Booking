const mongoose = require("mongoose");

const Listing = require("../models/listing.js");

const initdata = require("./data.js");



const db_url = 'mongodb://127.0.0.1:27017/staywise';

main()
    .then(
        console.log("successfull")
    )
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(db_url);
}


const init = async () => {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((ob) => ({...ob, owner : '65fd09cfdf0d22f768ff35bc'}))
    await Listing.insertMany(initdata.data);
    console.log("data inserted")

}

init();



