const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const shortid=require("shortid");

const app=express();

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/departmental-automation-system-db",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
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
}))


const Subject=mongoose.model("subject",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    courseCode:String,
    courseName:String,
    semester:String
}))

const SubjectAllocation=mongoose.model("subjectAllocation",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    courseCode:String,
    courseName:String,
    facultyID:String,
    facultyName:String
}))

/**Faculty Data */
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
        if(error.errors!==undefined){
            if(error.errors.fid!==undefined){
                if(error.errors.fid.kind==="Number"){
                    err="Faculty Id must be a number";
                }else{
                     err=error.errors.fid.properties.message;
                }
            }
            if(error.errors.name!==undefined){
                     err=error.errors.name.properties.message;
            }
            if(error.errors.mobile!==undefined){
                if(error.errors.mobile.kind==="Number"){
                    err="Mobile number must be a number";
                }
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
    const savedSubject=await newSubject.save();
    res.send(savedSubject);
    console.log("savedSubject"+savedSubject);
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
    const savedSubjectAllocation=await newSubjectAllocation.save();
    res.send(savedSubjectAllocation);
    console.log("savedSubjectAllocation"+savedSubjectAllocation);
})

app.delete("/api/subjectAllocation/:id",async(req,res)=>{
    const deletedAllocation=await SubjectAllocation.deleteOne({courseCode:req.params.id});
    res.send(deletedAllocation);
})

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log("server at http://localhost:5000"));
