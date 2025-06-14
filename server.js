require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Database Connected Successfully");
})
.catch((e) => {
  console.log("❌ Database Connection Error:", e);
});

// ---------------------- Admission Form Schema ----------------------

const admissionSchema = new mongoose.Schema({
  childName: String,
  parentName: String,
  phone_no: Number,
  email: String,
  address: String,
});

const AdmissionData = mongoose.model('AdmissionData', admissionSchema);

// POST route for admission form
app.post('/admissionForm', async (req, res) => {
  try {
    const { childName, parentName, phone_no, email, address } = req.body;

    const newAdmission = new AdmissionData({
      childName,
      parentName,
      phone_no,
      email,
      address,
    });

    await newAdmission.save();
    res.status(200).send('Admission form submitted successfully.');
  } catch (err) {
    res.status(500).send('Failed to submit admission form.');
    console.error(err);
  }
});

// ---------------------- Franchise Form Schema ----------------------

const franchiseSchema = new mongoose.Schema({
  studentName: String,
  parentName: String,
  email: String,
  mobileNumber: Number,
  selectClass: String,
  selectState: String,
});

const FranchiseData = mongoose.model("FranchiseData", franchiseSchema);

// POST route for franchise form
app.post('/franchiseForm', async (req, res) => {
  try {
    const { studentName, parentName, email, mobileNumber, selectClass, selectState } = req.body;

    const newFranchise = new FranchiseData({
      studentName,
      parentName,
      email,
      mobileNumber,
      selectClass,
      selectState,
    });

    await newFranchise.save();
    res.status(200).send('Franchise form submitted successfully.');
  } catch (err) {
    res.status(500).send('Failed to submit franchise form.');
    console.error(err);
  }
});

// ---------------------- Static HTML Routes ----------------------

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/form', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

app.get('/admission', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admission.html'));
});

app.get('/program', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'program.html'));
});

// Optional: Separate routes for form pages
app.get('/franchiseForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

app.get('/admissionForm', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admission.html'));
});

// ---------------------- Server Listen ----------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
