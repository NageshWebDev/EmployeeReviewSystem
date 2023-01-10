const { ObjectId } = require('mongodb');
const mongoDB = require('../config/mongoDB')

module.exports.review = async (req, res) => {
    console.log('employeePage');
    const collection = await mongoDB();
    const found = await collection.find({ id: "AssignedTo" }).toArray();
    console.log(found)
    res.json({ response: "SUCCESS", message: found }).end();
}

module.exports.record = async (req, res) => {
    console.log('employee Record');
    const collection = await mongoDB();
    console.log(req.body)
    const found = await collection.find({ name: req.body.employeeName }).toArray();
    console.log(found)
    if (found) {
        res.json({ response: "SUCCESS", message: found[0].uniqueID }).end();
    } else {
        res.json({ response: "FALIURE" }).end();
    }
}

module.exports.fetchPerformance = async (req, res) => {
    console.log('fetchPerformance');
    const collection = await mongoDB();
    console.log(req.body);
    const query = [];
    req.body.forEach(element => {
        query.push({ "_id": ObjectId(element) });
    });
    if (query.length > 0) {
        const found = await collection.find({ $or: query }).toArray();
        console.log(found);
        if (found) {
            res.json({ response: "SUCCESS", message: found }).end();
        }
    }
    else {
        res.json({ response: "FALIURE" }).end();
    }
}

module.exports.checkReview = async (req, res) => {
    console.log('check Record');
    const collection = await mongoDB();
    console.log(req.body);
    empID = req.body.empID;
    id = req.body.id;
    const found = await collection.find({ $and: [{ empID }, { id }] }).toArray();
    if (found.length > 0) {
        console.log(found);
        res.json({ response: "FALIURE" }).end();
    } else {
        res.json({ response: "SUCCESS" }).end();
    }
}

module.exports.submitReview = async (req, res) => {
    console.log('employee Record');
    const collection = await mongoDB();
    console.log(req.body);
    await collection.insertOne(req.body);
    res.json({ response: "SUCCESS" }).end();
}