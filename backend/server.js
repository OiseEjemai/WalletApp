// server.js
// // // require('dotenk
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Transaction = require('./models/Transaction');

const app = express();
let balance = 0;


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/bead-transaction', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/api/transactions', async (req, res) => {
  try {

    // Create and save transaction
    const transaction = new Transaction(req.body);

    await transaction.save();
    res.status(201).send(transaction);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.send(transactions);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.get('/api/balance', (req, res) => {
  res.json({ balance });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
