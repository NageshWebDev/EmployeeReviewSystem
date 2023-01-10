const mongoDB = require('../config/mongoDB')

module.exports.loginAdmin = async function (req, res) {
    console.log("I am called 'loginAdmin' ")
    console.log(req.body)
    const { uniqueID, password } = req.body;
    const collection = await mongoDB();
    const found = await collection.findOne({ uniqueID, password });
    if (found && found.admin === true) {
        res.status(200).json({ response: "SUCCESS", name: found.name, id: found.uniqueID }).end();
    }
    else {
        res.json({ message: "User DoesNot Exist", response: "FALIURE" });
    }
}

module.exports.loginEmp = async function (req, res) {
    console.log("I am called 'loginEmployee' ")
    console.log(req.body)
    const { uniqueID, password } = req.body;
    const collection = await mongoDB();
    const found = await collection.findOne({ uniqueID, password });
    if (found && found.admin === false) {
        res.status(200).json({ response: "SUCCESS", name: found.name, id: found.uniqueID }).end();
    }
    else {
        res.json({ message: "User DoesNot Exist", response: "FALIURE" });
    }
}