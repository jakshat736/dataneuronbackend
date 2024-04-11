var express = require('express');
var router = express.Router();
const DataTable = require('./Schemas/DataModal')
const ApiCallCount = require('./Schemas/ApiCount')



router.post('/add', async (req, res) => {
  console.log(req)
  let countDoc = await ApiCallCount.findOne();
  if (!countDoc) {
    countDoc = new ApiCallCount();
  }
  countDoc.addCount++;

  await countDoc.save();
  try {
    let customer = new DataTable(req.body);

    await customer.save();
    return res.status(200).json({ status: true, message: 'Data Added Succesfully' });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/update', async (req, res) => {

  const { _id, name, age } = req.body
  let countDoc = await ApiCallCount.findOne();
  if (!countDoc) {
    countDoc = new ApiCallCount();
  }
  countDoc.updateCount++;

  await countDoc.save();
  try {
    let customer = await DataTable.findOne({ _id });
    if (customer) {

      customer.name = name;
      customer.age = age;
      await customer.save()
      return res.status(200).json({ status: true, message: 'Data Updated Succesfully' });

    } else {
      return res.status(404).json({ status: false, message: 'Not Found' });
    }
    return res.status(200).json({ status: true, message: 'Data Added Succesfully' });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/displayalldata', async (req, res) => {
  try {


    const data = await DataTable.find();

    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }

    return res.status(200).json({ status: true, data: data });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Failed to retrieve user details' });
  }
});
router.get('/displayApiCount', async (req, res) => {
  try {


    const data = await ApiCallCount.findOne();

    if (!data) {
      return res.status(404).json({ error: 'Data not found' });
    }

    return res.status(200).json({ status: true, data: data });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Failed to retrieve user details' });
  }
});


module.exports = router;
