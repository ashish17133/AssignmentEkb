const express = require('express');
const route=express.Router();
const {getAllData,getOneData,postData,putData,deleteData}=require("../controller/company");
const {companyRef}=require("../database/databaseCompany");

const multer=require("multer");
const storageFile=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./upload");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})
const filterFile=(req,file,cb)=>{
    if(file.mimetype=="image/jpeg" || file.mimetype=="image/png"){
        cb(null,true);
    
    }else{
        cb(null,false);
    }
}

const getImage=multer({storage:storageFile,fileFilter:filterFile});



route.get("/",getAllData);

route.get("/:id",getOneData);

route.post("/",getImage.single("image"),postData);

route.put("/:id",getImage.single("image"),putData);

route.delete("/:id",deleteData);



module.exports={route};
