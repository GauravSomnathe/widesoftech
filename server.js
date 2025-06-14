require ('dotenv').config()
const express = require('express')
const path =  require('path')
const mongoose=require('mongoose')
const bodyparser=require('body-parser')


const app = express ()

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyparser.urlencoded({extended:true}))


// Connect to the database once
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("Database Connected Successfully");
})
.catch((e)=>{
    console.log("Error",e);
})

/*  Admission form Database and their Schemas */

const schemaAdmission = mongoose.Schema

const admissionSchema = new schemaAdmission ({
    ChildName: String,
    parentName: String,
    phone_no: Number,
    email: String,
    address: String,
    

});

const AdmissionData = mongoose.model('AdmissionData', admissionSchema)

app.post('/admissionForm', (req, res) => {

    const {ChildName, parentName, phone_no, email, address } = req.body

    const newdata = new AdmissionData({
        childName : req.body.childName,
        parentName:req.body.parentName,
        phone_no : req.body.phone_no,
        email : req.body.email,
        address :req.body.address,
        
    });
    newdata.save()
    res.redirect('/')
  })



//<--------------------------------------------------------------------------------------->//

  /*  Franchise form Database and their Schemas */


const schemaFranchise = mongoose.Schema

const FranchiseSchema = new schemaFranchise({
    studentNametudentName : String,
    parentName:String,
    email : String,
    mobileNumberobileNumber : Number,
    selectClass : String,
    selectState : String,
})

const FranchiseData = mongoose.model("FranchiseData", FranchiseSchema)

app.post('/franchiseForm', async(req,res)=>{
    const {studentName, email, mobileNumber, selectClass, selectState} = req.body

    const newdata = new FranchiseData({
        studentName : req.body.sudentName,
        email : req.body.email,
        mobileNumber : req.body. mobileNumber,
        selectClass : req.body.selectClass,
        selectState : req.body.selectState,
    });
    newdata.save();
    res.redirect('/')

})


//html file server
app.get ('/',(req,res) => {
    res.sendFile(path.join(__dirname ,'views','index.html'))
})

app.get ('/about',(req,res) => {
    res.sendFile(path.join(__dirname ,'views','about.html'))
})
app.get ('/from',(req,res) => {
    res.sendFile(path.join(__dirname ,'views','from.html'))
})

app.get ('/admission',(req,res) => {
  res.sendFile(path.join(__dirname ,'views','admission.html'))
})
app.get ('/program',(req,res) => {
  res.sendFile(path.join(__dirname ,'views','program.html'))
})
//database routes
app.get('/franchiseForm', (req,res)=>{
  res.sendFile(path.join(__dirname , 'views', 'from.html'));
})

app.get('/admissionForm', (req,res)=>{
  res.sendFile(path.join(__dirname , 'views', 'admission.html'));
})
app.get('/franchise', (req,res)=>{
  res.sendFile(path.join(__dirname , 'views', 'from.html'));
})



//const PORT = process.env.PORT || 4667;
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});

