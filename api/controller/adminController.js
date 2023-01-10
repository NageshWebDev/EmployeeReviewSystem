const { ObjectId } = require('mongodb');
const mongoDB = require('../config/mongoDB');

module.exports.viewEmp = async function (req, res) {
    const collection = await mongoDB();
    console.log('admin is called: viewEmp');

    const allEmp = await collection.find({}).toArray()
    if (allEmp) {
        // console.log(allEmp);
        res.json({ response: "SUCCESS", message: allEmp }).end();
    }
    else {
        res.json({ response: "FALIURE", message: "NO RECORD FOUND" })
    }
}

module.exports.updateEmp = async function (req, res) {
    const collection = await mongoDB();
    console.log('admin is called: updateEmp');

    const filter = req.body.previousId;
    const name = req.body.name;
    const uniqueID = req.body.uniqueID;
    const adminStatus = req.body.adminStatus;

    console.log(uniqueID)
    console.log(name)
    console.log(adminStatus)

    const updated = await collection.findOneAndUpdate({ uniqueID: filter }, { $set: { uniqueID, name, admin: adminStatus } })
    if (updated) {
        console.log(updated)
        const allEmp = await collection.find({}).toArray()
        res.json({ response: "SUCCESS", message: allEmp }).end();
        res.end();
    }
    else {
        res.json({ response: "FALIURE", message: "NO RECORD FOUND" })
    }
}

module.exports.removeEmp = async function (req, res) {
    const collection = await mongoDB();
    console.log('admin is called: updateEmp');
    const uniqueID = req.body.uniqueID;
    console.log(uniqueID);
    const deleted = await collection.findOneAndDelete({ uniqueID: uniqueID })
    if (deleted) {
        console.log(deleted)
        const allEmp = await collection.find({}).toArray()
        res.json({ response: "SUCCESS", message: allEmp }).end();
        res.end();
    }
    else {
        res.json({ response: "FALIURE", message: "NO RECORD FOUND" })
    }
}

module.exports.submittedPerformance = async function (req, res) {
    const collection = await mongoDB();
    console.log('admin is called: submittedPerformance');
    const allPerformance = await collection.find({ formId: "SubmittedReviews" }).toArray()
    console.log(allPerformance)
    res.json({ response: "SUCCESS", message: allPerformance }).end();
}

module.exports.addPerformance = async function (req, res) {
    const collection = await mongoDB();
    console.log('admin is called: addPerformance');
    console.log(req.body);
    const performanceQues = req.body;
    const result = await collection.insertOne(performanceQues);
    console.log(result)
    res.json({ response: "SUCCESS" }).end();
}

module.exports.allPerformance = async function (req, res) {
    const collection = await mongoDB();
    console.log('admin is called: addPerformance');
    console.log(req.body);
    const result = await collection.find({ id: "PerformanceQuestions" }).toArray();
    console.log(result)
    res.json({ response: "SUCCESS", message: result }).end();
}

module.exports.removePerformance = async function (req, res) {
    const collection = await mongoDB();
    console.log('admin is called: removePerformance');
    console.log(req.body);
    const removePerformanceID = new ObjectId(req.body.removePerformanceID);
    const found = await collection.findOneAndDelete({ "_id": removePerformanceID })
    if (found.ok) {
        const allPerformance = await collection.find({ id: "PerformanceQuestions" }).toArray()
        res.json({ response: "SUCCESS", message: allPerformance }).end();
    } else {
        res.json({ response: "FALIURE" }).end();
    }
}

module.exports.viewFormAndEmployee = async function (req, res) {
    const collection = await mongoDB();
    console.log('admin is called: viewFormAndEmployee');
    const found = await collection.find({ $or: [{ id: "PerformanceQuestions" }, { admin: false }] }).toArray()
    console.log(found)
    if (found) {
        res.json({ response: "SUCCESS", message: found }).end();
    } else {
        res.json({ response: "FALIURE" }).end();
    }
}

module.exports.assignPerformance = async function (req, res) {
    const collection = await mongoDB();
    console.log('admin is called: assignPerformance');
    console.log(req.body);
    const result = await collection.insertOne(req.body);
    if (result) {
        res.json({ response: "SUCCESS" }).end();
    }
}

module.exports.findPerformance = async function (req, res) {
    const collection = await mongoDB();
    console.log('admin is called: findPerformance');
    console.log(req.body);
    const found = await collection.findOne({ _id: ObjectId(req.body.findPerformance) }, { _id: 0, formName: 0, date: 0, id: 0 });
    console.log(found);
    if (found) {
        res.json({ response: "SUCCESS", message: found }).end();
    }
}