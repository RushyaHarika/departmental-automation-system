const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const shortid=require("shortid");
const bcrypt = require('bcrypt');
const cors = require('cors');

const app=express();

app.use(bodyParser.json());
app.use(cors({origin:true}))

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

/*Faculty*/
const Faculty=mongoose.model("faculty",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    fid:{
        type:String,
        required:"Faculty Id is required",
        unique:true
    },
    name:{
        type:String
    },
    mobile:{
        type:Number
    },
    qualification:{
        type:String
    },
    email:{
        type:String,
        required:"Faculty email is required"
    },
    designation:{
        type:String
    }
}))

/*subject Addition*/
const Subject=mongoose.model("subject",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    courseCode:{
        type:String,
        required:"Course Code is required",
        unique:true
    },
    courseName:{
        type:String
    },
    semester:{
        type:String
        },
}))

/*Subject Allocation*/
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

/** Syllabus Status*/
 const Syllabus=mongoose.model("syllabus",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    facultyId:{
        type:String,
        unique:false
    },
    sname:{
        type:String,
        required:"Subject Name is required"
    },
    syllabusCovered:String,
    actualSyllabus:String,
    topicCovered:String,
    noc:String,
    remarks:String,
    date:Date,
    section:{
        type:String,
        required:"Section is required"
    },
    year:{
        type:String,
        required:"Year is required"
    }

}))
 

/**FDPs and workshops attended */
const FDP = mongoose.model("fdp", new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    fid:{
        type:String,
        required:true
    },
    fdpName:{
        type:String,
        required:"Name of the program is required"
    },
    org:{
        type:String
    },
    from: {
        type: Date,
        required:"Date is required"
    },
    to:{
        type: Date
    }
}))

/** Certifications */
const Certification=mongoose.model("certification",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    fid:{
        type:String,
        required:true
    },
    courseName:{
        type:String,
        required:"Course Name is required"
    },
    score:{
        type:String
    },
    issuedBy:{
        type:String
    },
    certificate:{
        type:String
    },
    topper:{
        type:String
    }
}))

/**Guest Lecture */
const GuestLecture=mongoose.model("lecture",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    fid:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:"Lecture topic is required"
    },
    date:{
        type:Date,
        required:"Date is required"
    },
    participants:{
        type:String
    },
    college:{
        type:String
    }
}))

/**Patents */
const Patent=mongoose.model("patent",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    fid:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:"Title topic is required"
    },
    applicationNumber:{
        type:String,
        required:"Application number is required"
    },
    inventors:{
        type:String
    },
    date:{
        type:Date
    }
}))

/**Seminars and Guest Lectures Organized */
const Seminar=mongoose.model("seminar",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    topic:{
        type:String,
        required:"Title topic is required"
    },
    resourcePerson:{
        type:String
    },
    venue:{
        type:String
    },
    date:{
        type:Date,
        required:"Date is required"
    },
    participants:{
        type:Number
    },
    who:{
        type:String
    }
}))



/*FDP Organized*/
const FDPOrganized = mongoose.model("fdpOrganized", new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    name:{
        type:String,
        required:"Name of the program is required"
    },
    org:String,
    venue:String,
    resourcePerson:String,
    date: {
        type: Date,
        required:"Date is required"
    },
    nop:String,
    stuFac:String
}))

/**Login */
app.post("/api/login",async (req,res)=>{
    const body = req.body;
    const login=new Login(body);
    const salt = await bcrypt.genSalt(10);
    login.password = await bcrypt.hash(login.password, salt);
    await login.save()
});

app.get("/api/login",async (req,res)=>{
    const faculty=await Login.find({});
    res.send(faculty);
});

app.post("/api/auth",async (req,res)=>{
    const body = req.body;
    const user = await Login.findOne({email: body.email});
    console.log(body,user);
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

/** To get faculty id based on email */
app.get("/api/fid/:id",async (req,res)=>{
    const f=await Faculty.findOne({email: req.params.id});
    res.send(f);
});

app.delete("/api/login/:id",async(req,res)=>{
    const deletedFaculty=await Login.deleteOne({fid:req.params.id});
    res.send(deletedFaculty);
})


/**FDPs workshops and seminars attended */
app.post("/api/fdp",async (req,res)=>{
    const newFdp=new FDP(req.body);
    await newFdp.save()
    .then((response) =>{
        console.log(response);
        res.send(response);
       })
       .catch( (error)=> {
        let err="";
        if(error.errors!==undefined){
            if(error.errors.fdpName!==undefined){
                err=error.errors.name.properties.message;
            }
            else if(error.errors.from!==undefined){
                err=error.errors.from.properties.message;
            }
        } 
        return res.status(400).json({
            "error": err
        })
        
       })
})
app.get("/api/fdp",async (req,res)=>{
    const fdp=await FDP.find({});
    res.send(fdp);
});
app.get("/api/fdp/:id",async (req,res)=>{
    const fdp=await FDP.find({fid:req.params.id});
    res.send(fdp);
});
app.delete("/api/fdp/:id",async(req,res)=>{
    const deletedFDP=await FDP.deleteOne({_id:req.params.id});
    res.send(deletedFDP);
})

/** Faculty Data */
app.get("/api/faculty",async (req,res)=>{
    const faculty=await Faculty.find({});
    res.send(faculty);
});


app.post("/api/faculty",async (req,res)=>{
    const newFaculty=new Faculty(req.body);
    await newFaculty.save()
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

app.put("/api/faculty/:id",async(req,res)=>{
    const updatedFaculty=await Faculty.updateOne({ fid: req.params.id },{ $set: {name:req.body.name, mobile:req.body.mobile, qualification:req.body.qualification, designation:req.body.designation} });
    res.send(updatedFaculty);
})

/** Subject Data */
app.get("/api/subject",async (req,res)=>{
    const subject=await Subject.find({});
    res.send(subject);
});

app.post("/api/subject",async(req,res) => {
    const newSubject = new Subject(req.body);
    await newSubject.save()
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

app.put("/api/subject/:id",async(req,res)=>{
    const updatedSubject=await Subject.updateOne({courseCode:req.params.id },{ $set:{courseName:req.body.courseName, semester:req.body.semester}});
    res.send(updatedSubject);
})

/**Subject Allocation */
app.get("/api/subjectAllocation",async (req,res)=>{
    const subjectAllocation=await SubjectAllocation.find({});
    res.send(subjectAllocation);
});

app.get("/api/subjectAllocation/:fid",async (req,res)=>{
    const subjectAllocation=await SubjectAllocation.find({facultyID:req.params.fid});
    console.log(subjectAllocation);
    res.send(subjectAllocation);
});

app.post("/api/subjectAllocation",async(req,res) => {
    const newSubjectAllocation = new SubjectAllocation(req.body);
    await newSubjectAllocation.save()
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


/**Syllabus Data*/
app.get("/api/syllabus/:fid",async (req,res)=>{
    const syllabus=await Syllabus.find({facultyId:req.params.fid});
    res.send(syllabus);
});

app.get("/api/syllabus",async (req,res)=>{
    const syllabus=await Syllabus.find({});
    res.send(syllabus);
});

app.get("/api/syllabus/:date/:subject/:section/:year",async (req,res)=>{
    let dateP=req.params.date;
    let subjectP=req.params.subject;
    let sectionP=req.params.section;
    let yearP=req.params.year;
    let dateQuery="";
    let subjectQuery="";
    let sectionQuery="";
    let yearQuery="";
    
    console.log(dateP,typeof dateP);
    if(dateP!=="null"){
        dateQuery="{\"date\":\""+ new Date(dateP)+"\"}"
        dateQuery=JSON.parse(dateQuery);
    }else{
        dateQuery=JSON.parse("{}");
    }
    if(subjectP!=="null" && subjectP!=="Select Subject"){
        subjectQuery="{\"sname\":\""+ subjectP+"\"}";
        subjectQuery=JSON.parse(subjectQuery);
    }else{
        subjectQuery=JSON.parse("{}");
    }
    if(sectionP!=="null" &&sectionP!=="Select section"){
        sectionQuery="{\"section\":\""+ sectionP+"\"}";
        sectionQuery=JSON.parse(sectionQuery);
        
    }else{
        sectionQuery=JSON.parse("{}");
    }
    if(yearP!=="null" && yearP!=="Select year"){
        yearQuery="{\"year\":\""+ yearP+"\"}"
        yearQuery=JSON.parse(yearQuery);
    }else{
        yearQuery=JSON.parse("{}");
    }
   
    const syllabus=await Syllabus.find({
        $and:[
            dateQuery,
            subjectQuery,
            sectionQuery,
            yearQuery
        ]
    });
    console.log(typeof syllabus);
    res.send(syllabus);
});

app.post("/api/syllabus",async (req,res)=>{
    console.log("body",req.body);
    const newSyllabus=new Syllabus(req.body);
    await newSyllabus.save()
    .then((response) =>{
        console.log(response);
        res.send(response);
       })
       .catch( (error)=> {
        console.log("error",error)
        let err="";
        if(error.errors!==undefined){
            if(error.errors.subjectName!==undefined){
                err=error.errors.subjectName.properties.message;
            }
            else if(error.errors.section!==undefined){
                err=error.errors.section.properties.message;
            }
            else if(error.errors.year!==undefined){
                err=error.errors.year.properties.message;
            }
        } 
        return res.status(400).json({
            "error": err
        })       
    })
});

app.delete("/api/syllabus/:id",async(req,res)=>{
    const deletedSyllabus=await Syllabus.deleteOne({_id:req.params.id});
    res.send(deletedSyllabus);
})

/**Certification */
app.post("/api/certification",async (req,res)=>{
    const newCertification=new Certification(req.body);
    await newCertification.save()
    .then((response) =>{
        console.log(response);
        res.send(response);
       })
       .catch( (error)=> {
        let err="";
        if(error.errors!==undefined){
            if(error.errors.courseName!==undefined){
                err=error.errors.courseName.properties.message;
            }
        } 
        return res.status(400).json({
            "error": err
        })
        
       })
})
app.get("/api/certification",async (req,res)=>{
    const certification=await Certification.find({});
    res.send(certification);
});
app.get("/api/certification/:id",async (req,res)=>{
    const certification=await Certification.find({fid:req.params.id});
    res.send(certification);
});
app.delete("/api/certification/:id",async(req,res)=>{
    const deletedCertification=await Certification.deleteOne({_id:req.params.id});
    res.send(deletedCertification);
})

/**Guest Lecture */
app.post("/api/lecture",async (req,res)=>{
    const newLecture=new GuestLecture(req.body);
    const savedLecture=await newLecture.save()
    .then((response) =>{
        console.log(response);
        res.send(response);
       })
       .catch( (error)=> {
        let err="";
        if(error.errors!==undefined){
            if(error.errors.topic!==undefined){
                err=error.errors.topic.properties.message;
            } else if(error.errors.date!==undefined){
                err=error.errors.date.properties.message;
            }
        } 
        return res.status(400).json({
            "error": err
        })
        
       })
})
app.get("/api/lecture/:id",async (req,res)=>{
    const lecture=await GuestLecture.find({fid:req.params.id});
    res.send(lecture);
});
app.get("/api/lecture/",async (req,res)=>{
    const lecture=await GuestLecture.find({});
    res.send(lecture);
});
app.delete("/api/lecture/:id",async(req,res)=>{
    const deletedLecture=await GuestLecture.deleteOne({_id:req.params.id});
    res.send(deletedLecture);
})

/**Patents */
app.post("/api/patent",async (req,res)=>{
    const newPatent=new Patent(req.body);
    const savedPatent=await newPatent.save()
    .then((response) =>{
        console.log(response);
        res.send(response);
       })
       .catch( (error)=> {
        let err="";
        if(error.errors!==undefined){
            if(error.errors.title!==undefined){
                err=error.errors.title.properties.message;
            } else if(error.errors.applicationNumber!==undefined){
                err=error.errors.applicationNumber.properties.message;
            }
        } 
        return res.status(400).json({
            "error": err
        })
        
       })
})
app.get("/api/patent/:id",async (req,res)=>{
    const patent=await Patent.find({fid:req.params.id});
    res.send(patent);
});
app.get("/api/patent/",async (req,res)=>{
    const patent=await Patent.find({});
    res.send(patent);
});
app.delete("/api/patent/:id",async(req,res)=>{
    const deletedPatent=await Patent.deleteOne({_id:req.params.id});
    res.send(deletedPatent);
})

/**Seminars and Guest Lectures Organized */
app.post("/api/seminar",async (req,res)=>{
    const newSeminar=new Seminar(req.body);
    const savedSeminar=await newSeminar.save()
    .then((response) =>{
        console.log(response);
        res.send(response);
       })
       .catch( (error)=> {
        let err="";
        if(error.errors!==undefined){
            if(error.errors.topic!==undefined){
                err=error.errors.topic.properties.message;
            } else if(error.errors.date!==undefined){
                err=error.errors.date.properties.message;
            }
        } 
        return res.status(400).json({
            "error": err
        })
        
       })
})
app.get("/api/seminar/",async (req,res)=>{
    const seminar=await Seminar.find({});
    res.send(seminar);
});
app.delete("/api/seminar/:id",async(req,res)=>{
    const deletedSeminar=await Seminar.deleteOne({_id:req.params.id});
    res.send(deletedSeminar);
})

/**FDP Organized */
app.post("/api/fdpOrganized",async (req,res)=>{
    const newLecture=new FDPOrganized(req.body);
    await newLecture.save()
    .then((response) =>{
        console.log(response);
        res.send(response);
       })
       .catch( (error)=> {
        let err="";
        if(error.errors!==undefined){
            if(error.errors.name!==undefined){
                err=error.errors.name.properties.message;
            } else if(error.errors.date!==undefined){
                err=error.errors.date.properties.message;
            }
        } 
        return res.status(400).json({
            "error": err
        })
        
       })
})

app.get("/api/fdpOrganized",async (req,res)=>{
    const lecture=await FDPOrganized.find({});
    res.send(lecture);
});

app.delete("/api/fdpOrganized/:id",async(req,res)=>{
    const deletedLecture=await FDPOrganized.deleteOne({_id:req.params.id});
    res.send(deletedLecture);
})

/** Awards */
const Award=mongoose.model("award",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    fid:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:"Title is required"
    },
    date:{
        type:Date,
        required:"Date is required"
    },
    issuedBy:{
        type:String
    },
    description:{
        type:String
    }
}))

app.post("/api/award",async (req,res)=>{
    const newAward=new Award(req.body);
    await newAward.save()
    .then((response) =>{
        console.log(response);
        res.send(response);
       })
       .catch( (error)=> {
        let err="";
        if(error.errors!==undefined){
            if(error.errors.title!==undefined){
                err=error.errors.title.properties.message;
            } else if(error.errors.date!==undefined){
                err=error.errors.date.properties.message;
            }
        } 
        return res.status(400).json({
            "error": err
        })
        
       })
})
app.get("/api/award",async (req,res)=>{
    const award=await Award.find({});
    res.send(award);
});
app.get("/api/award/:id",async (req,res)=>{
    const award=await Award.find({fid:req.params.id});
    res.send(award);
});
app.delete("/api/award/:id",async(req,res)=>{
    const deletedAward=await Award.deleteOne({_id:req.params.id});
    res.send(deletedAward);
})

/** Journals */
const Journal=mongoose.model("journal",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    fid:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:"Title is required"
    },
    date:{
        type:Date,
        required:"Date is required"
    },
    author:{
        type:String
    },
    authPos:{
        type:String
    },
    nameOfJournal:{
        type:String
    },
    impact:{
        type:String
    },
    volume:{
        type:String
    },
    issue:{
        type:String
    },
    page:{
        type:String
    },
    type:{
        type:String
    }
}))

app.post("/api/journal",async (req,res)=>{
    const newJournal=new Journal(req.body);
    await newJournal.save()
    .then((response) =>{
        console.log(response);
        res.send(response);
       })
       .catch( (error)=> {
        let err="";
        if(error.errors!==undefined){
            if(error.errors.title!==undefined){
                err=error.errors.title.properties.message;
            } else if(error.errors.date!==undefined){
                err=error.errors.date.properties.message;
            }
        } 
        return res.status(400).json({
            "error": err
        })
        
       })
})
app.get("/api/journal",async (req,res)=>{
    const journal=await Journal.find({});
    res.send(journal);
});
app.get("/api/journal/:id",async (req,res)=>{
    const journal=await Journal.find({fid:req.params.id});
    res.send(journal);
});
app.delete("/api/journal/:id",async(req,res)=>{
    const deletedJournal=await Journal.deleteOne({_id:req.params.id});
    res.send(deletedJournal);
})

/** Conferences */
const Conference=mongoose.model("conference",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    fid:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:"Title is required"
    },
    date:{
        type:Date,
        required:"Date is required"
    },
    author:{
        type:String
    },
    authPos:{
        type:String
    },
    nameOfConference:{
        type:String
    },
    impact:{
        type:String
    },
    volume:{
        type:String
    },
    issue:{
        type:String
    },
    page:{
        type:String
    },
    type:{
        type:String
    }
}))

app.post("/api/conference",async (req,res)=>{
    const newConference=new Conference(req.body);
    await newConference.save()
    .then((response) =>{
        console.log(response);
        res.send(response);
       })
       .catch( (error)=> {
        let err="";
        if(error.errors!==undefined){
            if(error.errors.title!==undefined){
                err=error.errors.title.properties.message;
            } else if(error.errors.date!==undefined){
                err=error.errors.date.properties.message;
            }
        } 
        return res.status(400).json({
            "error": err
        })
        
       })
})
app.get("/api/conference",async (req,res)=>{
    const conference=await Conference.find({});
    res.send(conference);
});
app.get("/api/conference/:id",async (req,res)=>{
    const conference=await Conference.find({fid:req.params.id});
    res.send(conference);
});
app.delete("/api/conference/:id",async(req,res)=>{
    const deletedConference=await Conference.deleteOne({_id:req.params.id});
    res.send(deletedConference);
})

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log("server at http://localhost:5000"));