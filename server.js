const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const shortid=require("shortid");
const cors = require('cors');
const bcrypt = require('bcrypt');

const app=express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost/departmental-automation-system-db",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
});

//** Login */
const Login = mongoose.model("login", new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    fid:{
        type:String,
        required:"Faculty Id is required",
        unique:true
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
}))

app.post("/api/login",async (req,res)=>{
    const body = req.body;
    const login=new Login(body);
    const salt = await bcrypt.genSalt(10);
    login.password = await bcrypt.hash(login.password, salt);
    const savedLogin=await login.save()
});

app.get("/api/login",async (req,res)=>{
    const faculty=await Login.find({});
    res.send(faculty);
});

app.post("/api/auth",async (req,res)=>{
    const body = req.body;
    const user = await Login.findOne({email: body.email});
    if(user){
        const validPassword = await bcrypt.compare(body.password, user.password);

    if(validPassword){
        return res.status(200).json({message:"Valid password"});
    } else {
        return res.status(400).json({message:"Invalid password"});
    }
} else {
    return res.status(400).json({message:"User does not exist"});   
} 
});

app.get("/api/fid/:id",async (req,res)=>{
    const f=await Faculty.findOne({email: req.params.id});
    res.send(f);
});


const Faculty=mongoose.model("faculty",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    fid:{
        type:String,
        required:"Faculty Id is required",
        unique:true
    },
    name:{
        type:String,
        required:"Faculty Name is required"
    },
    mobile:{
        type:Number,
        required:"Faculty Mobile is required"
    },
    qualification:{
        type:String,
        required:"Faculty Qualification is required"
    },
    email:{
        type:String,
        required:"Faculty email is required"
    },
}))


const Subject=mongoose.model("subject",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    courseCode:{
        type:String,
        required:"Course Code is required",
        unique:true
    },
    courseName:{
        type:String,
        required:"Course Name is required"
    },
    semester:{
        type:String,
        required:"Semester is required"
        },
}))

const SubjectAllocation=mongoose.model("subjectAllocation",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    courseCode:{
        type:String,
        required:"Course Code is required"
    },
    courseName:{
        type:String,
        required:"Course Name is required"
    },
    facultyID:{
        type:String,
        required:"Faculty ID is required"
    },
    facultyName:{
        type:String,
        required:"Faculty Name is required",
    }
}))


/** Faculty Data */
app.get("/api/faculty",async (req,res)=>{
    const faculty=await Faculty.find({});
    res.send(faculty);
});

app.post("/api/faculty",async (req,res)=>{
    const newFaculty=new Faculty(req.body);
    const savedFaculty=await newFaculty.save()
    .then((response) =>{
        console.log(response);
        res.send(response);
       })
       .catch( (error)=> {
        let err="";
        if(error.code===11000){
            err="Faculty id must be unique";  
        }
        else if(error.errors!==undefined){
            if(error.errors.fid!==undefined){
                err=error.errors.fid.properties.message;
            }
            else if(error.errors.name!==undefined){
                err=error.errors.name.properties.message;
            }
            else if(error.errors.mobile!==undefined){
                if(error.errors.mobile.kind==="Number"){
                    err="Mobile number must be a number";
                }else{
                    err=error.errors.mobile.properties.message;
                }
            }
            else if(error.errors.qualification!==undefined){
                err=error.errors.qualification.properties.message;
            }
            else if(error.errors.email!==undefined){
                err=error.errors.email.properties.message;
            }

        } 
        return res.status(400).json({
            "error": err
        })
        
       })
});

app.delete("/api/faculty/:id",async(req,res)=>{
    const deletedFaculty=await Faculty.deleteOne({fid:req.params.id});
    res.send(deletedFaculty);
})


/** Subject Data */
app.get("/api/subject",async (req,res)=>{
    const subject=await Subject.find({});
    res.send(subject);
});

app.post("/api/subject",async(req,res) => {
    const newSubject = new Subject(req.body);
    const savedSubject=await newSubject.save()
    .then((response) =>{
        console.log(response);
        res.send(response);
       })
       .catch( (error)=> {
        let err="";
        if(error.code===11000){
            err="Course code must be unique";  
        }
        else if(error.errors!==undefined){
            if(error.errors.courseCode!==undefined){
                err=error.errors.courseCode.properties.message;
            }
            else if(error.errors.courseName!==undefined){
                err=error.errors.courseName.properties.message;
            }
            else if(error.errors.semester!==undefined){
                err=error.errors.semester.properties.message;
            }
        } 
        return res.status(400).json({
            "error": err
        })
        
       })
    
})

app.delete("/api/subject/:id",async(req,res)=>{
    const deletedSubject=await Subject.deleteOne({courseCode:req.params.id});
    res.send(deletedSubject);
})

/**Subject Allocation */
app.get("/api/subjectAllocation",async (req,res)=>{
    const subjectAllocation=await SubjectAllocation.find({});
    res.send(subjectAllocation);
});

app.post("/api/subjectAllocation",async(req,res) => {
    const newSubjectAllocation = new SubjectAllocation(req.body);
    const savedSubjectAllocation=await newSubjectAllocation.save()
    .then((response) =>{
        console.log(response);
        res.send(response);
       })
       .catch( (error)=> {
        let err="";
        if(error.errors!==undefined){
            if(error.errors.fid!==undefined){
                err=error.errors.fid.properties.message;
            }
            else if(error.errors.name!==undefined){
                err=error.errors.name.properties.message;
            }
            else if(error.errors.courseCode!==undefined){
                err=error.errors.courseCode.properties.message;
            }
            else if(error.errors.courseName!==undefined){
                err=error.errors.courseName.properties.message;
            }
        } 
        return res.status(400).json({
            "error": err
        })
        
       })
})

app.delete("/api/subjectAllocation/:id",async(req,res)=>{
    const deletedAllocation=await SubjectAllocation.deleteOne({courseCode:req.params.id});
    res.send(deletedAllocation);
})

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log("server at http://localhost:5000"));
