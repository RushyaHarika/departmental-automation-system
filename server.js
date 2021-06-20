const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const shortid=require("shortid");
const bcrypt = require('bcrypt');
const multer = require('multer');

const app=express();

app.use(bodyParser.json({limit: '10mb'}));
app.use(express.static('public'))

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
    email:String,
    password:String
}))

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

/*Faculty*/
const Faculty=mongoose.model("faculty",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    fid:{
        type:String,
        required:"Faculty Id is required",
        unique:true
    },
    name:String,
    mobile:Number,
    qualification:String,
    email:{
        type:String,
        required:"Faculty email is required"
    },
    designation:String
}))

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
            else if(error.errors.mobile!==undefined){
                if(error.errors.mobile.kind==="Number"){
                    err="Mobile number must be a number";
                }
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


/*subject Addition*/
const Subject=mongoose.model("subject",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    courseCode:{
        type:String,
        required:"Course Code is required",
        unique:true
    },
    courseName:String,
    semester:String,
}))

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


/*Subject Allocation*/
const SubjectAllocation=mongoose.model("subjectAllocation",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    courseCode:{
        type:String,
        required:"Course Code is required"
    },
    courseName:String,
    facultyID:{
        type:String,
        required:"Faculty ID is required"
    },
    facultyName:String,
    section:String
}))

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
            else if(error.errors.courseCode!==undefined){
                err=error.errors.courseCode.properties.message;
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
    },
    file_mimetype:String,
    file_path:  String,
    file_name:String
}))
const uploadFdp = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './public/uploadedImages');
        console.log("file",file)
      },
      filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      }
    }),
    limits: {
      fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(pdf)$/)) {
        return cb(
          new Error(
            'only upload files with pdf format.'
          )
        );
      }
      cb(undefined, true); // continue with upload
    }
  });
  
/**FDPs workshops and seminars attended */
app.post("/api/fdp",uploadFdp.single('pdf'),async (req,res)=>{
    const {fid,fdpName,org,from,to}=req.body;
    const newFdp=new FDP({
        fid,fdpName,org,from,to,
        "file_mimetype":req.file.mimetype,
       "file_path":req.file.path,
       "file_name":req.file.filename
    });
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

app.get("/api/fdp/download/:id",async(req,res)=>{
    try {
      const file = await FDP.findById(req.params.id);
      console.log(file.file_path);
      res.set({
        'content-type': file.file_mimetype
      });
      res.sendFile(file.file_path,{root:__dirname});
      //console.log(res);
    } catch (error) {
      res.status(400).send('Error while downloading file. Try again later.');
    }
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

app.get("/api/fdp/:from/:to",async (req,res)=>{
    let fromP=req.params.from;
    let toP=req.params.to;
    let fromQuery="";
    let toQuery="";

    if(fromP!=="null"){
        fromQuery="{\"$gte\":\""+ new Date(fromP)+"\","
    }else{
        fromQuery="{"
    }
    if(toP!=="null"){
        toQuery="\"$lte\":\""+ new Date(toP)+"\"}"
    }else{
        toQuery="}"
    }

    console.log(fromQuery+toQuery);
    const lecture=await FDP.find({
        "from":JSON.parse(fromQuery+toQuery)
    });
    console.log(lecture);
    res.send(lecture);
});

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

/**Guest Lecture */
app.post("/api/lecture",async (req,res)=>{
    const newLecture=new GuestLecture(req.body);
    await newLecture.save()
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
app.get("/api/lecture",async (req,res)=>{
    const lecture=await GuestLecture.find({});
    res.send(lecture);
});

app.get("/api/lecture/:id",async (req,res)=>{
    const lecture=await GuestLecture.find({fid:req.params.id});
    res.send(lecture);
});
app.delete("/api/lecture/:id",async(req,res)=>{
    const deletedLecture=await GuestLecture.deleteOne({_id:req.params.id});
    res.send(deletedLecture);
})

app.get("/api/lecture/:from/:to",async (req,res)=>{
    let fromP=req.params.from;
    let toP=req.params.to;
    let fromQuery="";
    let toQuery="";

    if(fromP!=="null"){
        fromQuery="{\"$gte\":\""+ new Date(fromP)+"\","
    }else{
        fromQuery="{"
    }
    if(toP!=="null"){
        toQuery="\"$lte\":\""+ new Date(toP)+"\"}"
    }else{
        toQuery="}"
    }

    console.log(fromQuery+toQuery);
    const lecture=await GuestLecture.find({
        "date":JSON.parse(fromQuery+toQuery)
    });
    console.log(lecture);
    res.send(lecture);
});


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
    },
    status:String
}))

/**Patents */
app.post("/api/patent",async (req,res)=>{
    const newPatent=new Patent(req.body);
    await newPatent.save()
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

app.get("/api/patent",async (req,res)=>{
    const patent=await Patent.find({});
    res.send(patent);
});

app.get("/api/patent/:from/:to",async (req,res)=>{
    let fromP=req.params.from;
    let toP=req.params.to;
    let fromQuery="";
    let toQuery="";

    if(fromP!=="null"){
        fromQuery="{\"$gte\":\""+ new Date(fromP)+"\","
    }else{
        fromQuery="{"
    }
    if(toP!=="null"){
        toQuery="\"$lte\":\""+ new Date(toP)+"\"}"
    }else{
        toQuery="}"
    }

    console.log(fromQuery+toQuery);
    const patents=await Patent.find({
        "date":JSON.parse(fromQuery+toQuery)
    });
    console.log(patents);
    res.send(patents);
});

app.delete("/api/patent/:id",async(req,res)=>{
    const deletedPatent=await Patent.deleteOne({_id:req.params.id});
    res.send(deletedPatent);
})

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

/**Seminars and Guest Lectures Organized */
app.post("/api/seminar",async (req,res)=>{
    const newSeminar=new Seminar(req.body);
    await newSeminar.save()
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
    score:String,
    issuedBy:String,
    certificate:String,
    topper:String,
    year:String,
    cycle:String,
    file_mimetype:String,
    file_path:  String,
    file_name:String
}))
const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './public/uploadedImages');
        console.log("file",file)
      },
      filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      }
    }),
    limits: {
      fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(pdf)$/)) {
        return cb(
          new Error(
            'only upload files with pdf format.'
          )
        );
      }
      cb(undefined, true); // continue with upload
    }
  });
  

app.post("/api/certification", upload.single('pdf'),async (req,res)=>{
    const {fid,courseName,score,issuedBy,certificate,topper,year,cycle}=req.body;
   // const { path, mimetype } = req.file;
    const newCertification=new Certification({
       fid,courseName,score,issuedBy,certificate,topper,year,cycle,
       "file_mimetype":req.file.mimetype,
       "file_path":req.file.path,
       "file_name":req.file.filename
    });
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

app.get("/api/certification/download/:id",async(req,res)=>{
        console.log()
        try {
          const file = await Certification.findById(req.params.id);
          console.log(file.file_path);
          res.set({
            'content-type': file.file_mimetype
          });
          res.sendFile(file.file_path,{root:__dirname});
          //console.log(res);
        } catch (error) {
          res.status(400).send('Error while downloading file. Try again later.');
        }
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

app.get("/api/certification/:year/:cycle",async (req,res)=>{
    let yearP=req.params.year;
    let cycleP=req.params.cycle;
    console.log(yearP,cycleP);
    let yearQuery="";
    let cycleQuery="";
    let count=0;
    if(yearP!=="null"){
        yearQuery="{\"year\":\""+ yearP+"\"}"
        yearQuery=JSON.parse(yearQuery);
    }else{
        yearQuery=JSON.parse("{}");
        count++;
    }
    if(cycleP!=="null" && cycleP!=="Select Cycle"){
        cycleQuery="{\"cycle\":\""+ cycleP+"\"}";
        cycleQuery=JSON.parse(cycleQuery);
    }else{
        cycleQuery=JSON.parse("{}");
        count++;
    }
    console.log(count);
    const certification=await Certification.find({
        $and:[
            yearQuery,
            cycleQuery
        ]
    });
    console.log(certification);
    res.send(certification);
});

/** Certifications */
const LessonPlan=mongoose.model("lessonPlan",new mongoose.Schema({
    _id:{type:String, default:shortid.generate},
    fid:{
        type:String,
        required:true
    },
    courseName:{
        type:String,
        required:"Course Name is required"
    },
    file_mimetype:String,
    file_path:  String,
    file_name:String
}))
const uploadLessonPlan = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './public/uploadedImages');
        console.log("file",file)
      },
      filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      }
    }),
    limits: {
      fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(xls)$/)) {
            return cb('only upload files of .xls format',false);            
        }
        cb(undefined, true); // continue with upload
    }
  })
  

app.post("/api/lessonPlan",
 uploadLessonPlan.single('lessonFile'),
 async (req,res)=>{
    console.log(res.status)
    console.log(req.body,req.file);
    const {fid,courseName}=req.body;
   // const { path, mimetype } = req.file;
    const newLessonPlan=new LessonPlan({
       fid,courseName,
       "file_mimetype":req.file.mimetype,
       "file_path":req.file.path,
       "file_name":req.file.filename
    });
    await newLessonPlan.save()
    .then((response) =>{
        console.log(response);
        res.send(response);
       })
       .catch( (error)=> {
        console.log(error)
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

app.get("/api/lessonPlan/download/:id",async(req,res)=>{
        console.log()
        try {
          const file = await LessonPlan.findById(req.params.id);
          console.log(file.file_path);
          res.set({
            'content-type': file.file_mimetype
          });
          res.sendFile(file.file_path,{root:__dirname});
          //console.log(res);
        } catch (error) {
          res.status(400).send('Error while downloading file. Try again later.');
        }
})
app.get("/api/lessonPlan",async (req,res)=>{
    const lessonPlan=await LessonPlan.find({});
    res.send(lessonPlan);
});
app.get("/api/lessonPlan/:id",async (req,res)=>{
    const lessonPlan=await LessonPlan.find({fid:req.params.id});
    res.send(lessonPlan);
});
app.delete("/api/lessonPlan/:id",async(req,res)=>{
    const deletedLessonPlan=await LessonPlan.deleteOne({_id:req.params.id});
    res.send(deletedLessonPlan);
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
    },
    file_mimetype:String,
    file_path:  String,
    file_name:String
}))

const uploadAward = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './public/uploadedImages');
        console.log("file",file)
      },
      filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      }
    }),
    limits: {
      fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(pdf)$/)) {
        return cb(
          new Error(
            'only upload files with pdf format.'
          )
        );
      }
      cb(undefined, true); // continue with upload
    }
  });

app.post("/api/award",uploadAward.single('pdf'),async (req,res)=>{
    const {fid,title,date,issuedBy,description}=req.body;
    const newAward=new Award({
        fid,title,date,issuedBy,description,
        "file_mimetype":req.file.mimetype,
       "file_path":req.file.path,
       "file_name":req.file.filename
    });
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

app.get("/api/award/download/:id",async(req,res)=>{
    console.log()
    try {
      const file = await Award.findById(req.params.id);
      console.log(file.file_path);
      res.set({
        'content-type': file.file_mimetype
      });
      res.sendFile(file.file_path,{root:__dirname});
      //console.log(res);
    } catch (error) {
      res.status(400).send('Error while downloading file. Try again later.');
    }
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
});

app.get("/api/award/:from/:to",async (req,res)=>{
    let fromP=req.params.from;
    let toP=req.params.to;
    let fromQuery="";
    let toQuery="";

    if(fromP!=="null"){
        fromQuery="{\"$gte\":\""+ new Date(fromP)+"\","
    }else{
        fromQuery="{"
    }
    if(toP!=="null"){
        toQuery="\"$lte\":\""+ new Date(toP)+"\"}"
    }else{
        toQuery="}"
    }

    console.log(fromQuery+toQuery);
    const award=await Award.find({
        "date":JSON.parse(fromQuery+toQuery)
    });
    console.log(award);
    res.send(award);
});

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
