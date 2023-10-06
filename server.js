const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const cors = require('cors');
const VideoModel = require ('./models/VideoModel');
const Tags = require ('./models/Tags');
const UserModel = require('./models/UserModel');
const { SendEmail } = require('./service/mail');
const { GenerateJWT, VerifyJWT} = require('./service/auth');


const HOST = "127.0.0.1";
const PORT =  5000;
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/youtube");
const db = mongoose.connection;
db.on('open', () => {
    console.log("db connected");
});

 app.use(bodyParser.urlencoded({extended:true}));
 app.use(express.json());
 app.use(cors())
 
 app.get('/',(req,res) =>{
    return res.json("success working");
 });

 

 

// tags
app.get('/allTags' ,async(req,res) => {
    const model = await Tags.find({});
    return res.json({status:true , msg:"Success fetch" , model });
});




// tags1

app.post('/uploadTag',async(req,res) =>{
   const Exist = await Tags.findOne(req.body)
       //return res.json(req.body)
       if(Exist){
           return res.json({status: false, msg : "already"});
       }
      
             const model = new Tags(req.body);
       
       
       model.save();
       console.log(model);
       return res.json({status:true, msg :"success uploaded", model});
       
   });






// tags2

app.post('/uploadTags' , (req,res)=> {
    const model = new Tags(req.body);
 
    model.save();
    console.log(model);
    return res.json({status:true , msg:"success uploaded" ,model});
 });

//videos

app.get('/allvideos',async(req,res) => {
    const model = await VideoModel.find({});
    return res.json({status:true , msg:"Sucess fetch" , model });
 });


//  videos1
 

// app.post('/uploadVideo',async(req,res) =>{
//    const Exist = await VideoModel.findOne(req.body)
//        //return res.json(req.body)
//        if(Exist){
//            return res.json({status: false, msg : "already"});
//        }
      
//              const model = new VideoModel(req.body);
       
       
//        model.save();
//        console.log(model);
//        return res.json({status:true, msg :"success uploaded", model});
       
//    });
   
// videos2

app.post('/uploadvideos' , (req,res)=> {
   const model = new VideoModel(req.body);

   model.save();
   console.log(model);
   return res.json({status:true , msg:"success uploaded" ,model});
});
   
// register
app.post('/register' , async(req,res) =>{
    const Exist = await UserModel.findOne(
        {email:req.body.email}
    );
    
if(Exist){
    return res.json({status:false , msg:"user allready found" });
}
 
const otp = Math.floor(100000 + Math.random() * 900000);
req.body.otp= otp;
const user = new UserModel(req.body);
user.save();

const subject = "Register Verification Code";
const message = {
info : "Hi "+ user.name+ ",",
otp
}
SendEmail(user.email,subject, message);
console.log(user);
const token = GenerateJWT(user);
return res.json({status : true, msg:"sucess register",token });




// const model =new UserModel(req.body);
// model.save();

// return res.json({status:true, msg:"success register",model});

});


//login

// app.post('/login', async(req,res) =>{
//     const Exist = await UserModel.findOne(req.body);

//     if(!Exist){
//         return res.json({status:flase, msg:"user not exist"});
//     }
    
//     return res.json({status:true , msg:"login success" ,model});
//     }


// );

app.post('/login', async(req,res) =>{
    const Exist = await UserModel.findOne(req.body)
    
    if(!Exist) {
      return res.json({status : false, msg: "User Not Exist!"});

    }

    if(Exist.status==0) {
      return res.json({status : false, msg: "Account not Verfied!"});

    }

    // const token = GenerateJWT(Exist);
    // return res.json({status : true, msg:"sucess login", token });

const otp =Math.floor(100000 + Math.random() *900000);
await UserModel.findByIdAndUpdate(Exist._id, {
  otp
});

  
  const subject = "Signin Verification Code";
const message = {
info : "Hi "+ Exist.name+ ",",
otp
}
SendEmail(Exist.email,subject, message);

const token = GenerateJWT(Exist);
return res.json({status : true, msg:"sucess Signin",token });

});

app.post('/verifySignin' , VerifyJWT, async(req,res) =>{
  const Exist = await UserModel.findOne({_id: req.user._id})
  console.log(Exist);


  if(req.body.otp==Exist.otp){
    const token = GenerateJWT(Exist);
    return res.json({status : true , msg:"sucessVerified", token});
  }
  return res.json({status :false, msg:"wrong OTP"});
})




  app.post('/verify', VerifyJWT, async(req,res) => {
     
    if(req.body.otp == req.user.otp) {
      await UserModel.findByIdAndUpdate(req.user._id, {
            status: 1,
            email_verify_at: new Date()
      });
      return res.json({status : true, msg:"sucess Verfied" });

    }
    return res.json({status : false, msg:"Wrong OTP" });

  } );

  app.get('/getUser' , VerifyJWT, async(req,res) =>{
    const user = await UserModel.findOne({_id: req.user._id});
    return res.json({status: true, msg:"get Session user",user});
  })
 





   


 




 app.listen( PORT, HOST, ()=>{
    console.log(`http://${HOST}:${PORT}`);
 });
