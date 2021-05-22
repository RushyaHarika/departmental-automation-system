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
    fid:String,
    name:String,
    mobile:Number,
    qualification:String
}))

app.get("/api/faculty",async (req,res)=>{
    const faculty=await Faculty.find({});
    res.send(faculty);
});

app.post("/api/faculty",async (req,res)=>{
    const newFaculty=new Faculty(req.body);
    const savedFaculty=await newFaculty.save();
    res.send(savedFaculty);
    console.log(savedFaculty);
});

app.delete("api/faculty/:id",async(req,res)=>{
    const deletedFaculty=await Faculty.findByIdAndDelete(req.params.id);
    res.send(deletedFaculty);
})

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log("server at http://localhost:5000"));
