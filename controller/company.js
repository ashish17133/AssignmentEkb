const {companyRef,companyCatRef}=require("../database/databaseCompany");
const fs=require("fs");
const path=require("path");
const { contentSecurityPolicy } = require("helmet");


async function getAllData(req,res){
    //pagination implementation below
        const page=Number(req.query.page)||1;//incase page sent in 0
        const limit=Number(req.query.limit)||10;//incase if limit send is 0
        const skip=(page-1)*limit;
        let data=await companyRef.find({}).skip(skip).limit(limit);
        let data2=await companyCatRef.find({});
        //now implementing is category_id is selected
        var result;
        if(req.query.field=="category_id"){
            
            result=data.map(value=>({value,category_data:data2.filter(v=>{
                if(v["id"]==value["category_id"]){
                    return JSON.stringify(v);
                }})}));
        }else{
            result=data;
        }
        
       //console.log(data2);
        if(data!=null && result!=null){
            
            res.status(200).json({"msg":"Success",
                                    "data":result});
             res.end();
        }else{
            res.status(200).json({"msg":"Fail"});
            res.end();
        }
        
        console.log("This is company only");

}


async function getOneData(req,res){
    let id=req.params.id;
    var result="";
    let data=await companyRef.findOne({"id":id});
    let data2=data==null?"":await companyCatRef.findOne({"id":data["category_id"]});
    
    
    //if category_field selected in query.field we will send the desire category data(implementation)
    if(req.query.field=="category_id"){
        
        result={data,data2};
    }else{
        result=data;
    }


    if(data!=null && result!==null){
        res.status(200).json({"msg":"Success",
                                "data":result,});
         res.end();
    }else if(data==null){
        res.status(200).json({"msg":"Invalid User Id"});
         res.end();
    }else{
        res.status(200).json({"msg":"Fail"});//result willshow user invalid msg here
        res.end();
    }
    console.log("This is company only");
}

async function postData(req,res){
    let {id,title,category_id,image,description,status}=req.body;
    console.log(req.body);//for debug purpose
    console.log(req.file);//for debug purpose
     //create new database now
    try{
        await companyRef.create({
            "id":id,
            "category_id":category_id,
            "title":title,
            "image":req.file.path,
            "description":description,
            "status":status,
    
        });
        res.status(200).json({
            "msg":"Success"
        });
        console.log("data stored in database");

        }catch(e){
            
            res.status(400).json({
                "msg":"Failed",
                "data":"Error in database"
            });
            console.log("Error in creating database"+e);
            res.end();
        };
    console.log("company only for post");//debug purpose
}

async function putData(req,res){
    //Here putData function is implemented using req.body not by req.query as we did in above case(select field sent through query).......
    //here we can not only change category_id we can also change status description title and image as well.
    let id=req.params.id;
    //since id is unique we only have one data for given id:so logic goes like this
    let{title,category_id,status,description,image}=req.body;

    console.log(req.body);
    let data=await companyRef.findOne({"id":id});
    if(data!=null){
        //UPDATING data category_id is asked in assignment here we can change title status and description as well
        title==null?"":await companyRef.findOneAndUpdate({"id":id},{"title":title,"updated_at":Date.now()});
        
        category_id==null?"":await companyRef.findOneAndUpdate({"id":id},{"category_id":category_id,"updated_at":Date.now()});
        status==null?"":await companyRef.findOneAndUpdate({"id":id},{"status":status,"updated_at":Date.now()});
        description==null?"":await companyRef.findOneAndUpdate({"id":id},{"description":description,"updated_at":Date.now()});
        //for testing purpose only  :image==null?"":await companyRef.findOneAndUpdate({"id":id},{"image":image});
        res.status(200).json({"msg":"Success"});
    }else{
    res.status(400).json({"msg":"User not found"});
    }
}

async function deleteData(req,res){
    let id=req.params.id;
    let data=await companyRef.findOne({"id":id});
  

    if(data!=null){
    try{
          //file path logic implementation
    let pathString= (__dirname).split("\\");
    pathString[pathString.length-1]=data["image"];
    
    await companyRef.deleteOne({"id":id});
    fs.unlinkSync(pathString.join("\\"));///removing file
    res.status(200).json({"msg":"Delete success"});
    console.log("company category for delete");
    }catch(e){
        res.status(400).json({"msg":"Delete Failed"});
        console.log("Error in delete category "+e);
    };
    }else{
        res.status(400).json({"msg":"Invalid Id"});
        res.end();
        console.log("Id not found for deleting company category");
    }
}

module.exports={getAllData,getOneData,postData,putData,deleteData};