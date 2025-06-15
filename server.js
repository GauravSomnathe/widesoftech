require('dotenv').config(); // Loads environment variables from .env file
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Middleware to parse request bodies

const app = express(); // Create an Express application instance

// --- Middleware Setup ---
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(bodyParser.urlencoded({ extended: true }));

// --- MongoDB Connection ---
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

// --- Mongoose Schema for Admission Data ---
// 'program' field has been REMOVED from the schema
const admissionSchema = new mongoose.Schema({
    childName: { type: String, required: true },
    dob: { type: Date, required: true },
    parentName: { type: String, required: true },
    email: { type: String, required: true },
    phone_no: { type: Number, required: true },
    address: { type: String, required: true },
    message: String,
    submittedAt: { type: Date, default: Date.now }
});

// Create a Mongoose model from the schema
const AdmissionData = mongoose.model('AdmissionData', admissionSchema);

// --- POST Route for Admission Form Submission ---
app.post('/admissionForm', async (req, res) => {
    try {
        // 'program' has been REMOVED from destructuring
        const { childName, dob, parentName, email, phone_no, address, message } = req.body;

        console.log("Received admission form data:", req.body); // Keep this for debugging if needed

        // 'program' has been REMOVED from validation check
        if (!childName || !dob || !parentName || !email || !phone_no || !address) {
            return res.status(400).send('Missing required admission form fields.');
        }

        // 'program' has been REMOVED from new object creation
        const newAdmission = new AdmissionData({
            childName,
            dob,
            parentName,
            email,
            phone_no,
            address,
            message,
        });

        await newAdmission.save();
        res.redirect('/thankyou.html'); 
    } catch (err) {
        console.error("Error submitting admission form:", err); 
        res.status(500).send('Failed to submit admission form. Please try again later.');
    }
});

// --- Mongoose Schema for Franchise Data (No changes) ---
const franchiseSchema = new mongoose.Schema({
    name: { type: String, required: true },      
    email: { type: String, required: true },     
    phone: { type: Number, required: true },     
    location: { type: String, required: true },  
    experience: String,                          
    submittedAt: { type: Date, default: Date.now } 
});

const FranchiseData = mongoose.model("FranchiseData", franchiseSchema);

// --- POST Route for Franchise Form Submission (No changes) ---
app.post('/franchiseForm', async (req, res) => {
    try {
        const { name, email, phone, location, experience } = req.body;
        if (!name || !email || !phone || !location) { 
            return res.status(400).send('Missing required franchise form fields (Name, Email, Phone, Location).');
        }
        const newFranchise = new FranchiseData({
            name,
            email,
            phone,
            location,
            experience, 
        });
        await newFranchise.save();
        res.redirect('/thankyou.html'); 
    } catch (err) {
        console.error("Error submitting franchise form:", err); 
        res.status(500).send('Failed to submit franchise form. Please try again later.');
    }
});

// --- Static HTML Routes (No changes) ---
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'Index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'views', 'about.html')));
app.get('/admission', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admission.html')));
app.get('/program', (req, res) => res.sendFile(path.join(__dirname, 'views', 'program.html')));
app.get('/franchise', (req, res) => res.sendFile(path.join(__dirname, 'views', 'form.html')));
app.get('/thankyou.html', (req, res) => res.sendFile(path.join(__dirname, 'views', 'thankyou.html')));
app.get('/privacy-policy', (req, res) => res.sendFile(path.join(__dirname, 'views', 'privacy-policy.html')));
app.get('/terms-conditions', (req, res) => res.sendFile(path.join(__dirname, 'views', 'terms-conditions.html')));
app.get('/refund-policy', (req, res) => res.sendFile(path.join(__dirname, 'views', 'refund-policy.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'views', 'contact.html'))); 

// --- Server Startup (No changes) ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});