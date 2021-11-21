const express=require("express");
const app=express();
const morgan=require("morgan");
const {checkHeader}=require("./middleware/checkHeader");
const mongoose = require('mongoose');
const {urlError}=require("./Error/error");
const cors=require("cors");
const helmet=require("helmet");
const limitRate=require("express-rate-limit");
const limitedRate=limitRate({
    windowMs:10*60*100,
    max:80
});//max of 80 request in 10min
const clean=require("xss-clean");
//const dataload=require("./tempForLoading_DATA/mongodb_dataLoad");DEBUG_PURPOSE ONLY

const routeCompanyCat=require("./routes/routeCompanyCat");
const routeCompany=require("./routes/routeCompany");


const {dbURL}=require("./database/databaseURL");
const port=5050||process.env.PORT;
const server=()=>{
                app.listen(port,()=>{
                console.log("Server started at port: "+port);
                });
};

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(limitedRate);
app.use(morgan("tiny"));
app.use(clean());
app.use("/upload",express.static('upload'));

app.use("/api/category",checkHeader,routeCompanyCat.route);
app.use("/api/company",checkHeader,routeCompany.route);

app.get("/",checkHeader,(req,res)=>{

    res.status(200).json({"msg":"Ekbana assignment homepage"});
});

app.use("*",urlError);

mongoose.connect(dbURL).then(()=>{
    console.log("Database connection completed");
    server();
    
}).catch((e)=>{
    console.log("Database connection error has occured:"+e);
});


