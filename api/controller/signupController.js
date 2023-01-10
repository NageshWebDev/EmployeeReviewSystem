const mongoDB = require('../config/mongoDB')

module.exports.signupEmp = async function (req, res) {
    console.log("I am called 'SignUpEmployee' ")
    console.log(req.body)
    const { uniqueID } = req.body;
    const collection = await mongoDB();
    const found = await collection.findOne({ uniqueID });
    if (!found) {
        await collection.insertOne(req.body);
        res.status(200).json({response: "SUCCESS"}).end();
    }
    else {
        res.json({message : "User Already Exist", response: "FALIURE"});
    }
}