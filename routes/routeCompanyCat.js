const express = require('express');
const route=express.Router();
const {getAllData,getOneData,postData,putData,deleteData}=require("../controller/companyCategory");


route.get("/",getAllData);

route.get("/:id",getOneData);

route.post("/",postData);

route.put("/:id",putData);

route.delete("/:id",deleteData);



module.exports={route};
