const {companyCatRef}=require("../database/databaseCompany");

async function getAllData(req,res){
        //pagination implementation goes here
        const page=Number(req.query.page)||1;//incase page sent in 0
        const limit=Number(req.query.limit)||10;//incase if limit send is 0
        const skip=(page-1)*limit;
        let data=await companyCatRef.find({}).skip(skip).limit(limit);
        res.status(200).json({
            "msg":"success",
            "data":data
        });
        console.log("Get category for company");
}

async function getOneData(req,res){
    let id=req.params.id;
    let data=await companyCatRef.findOne({"id":id});
    res.status(200).json({
        "msg":"success",
        "data":data
    });
    console.log("This is company category with id");
}

async function postData(req,res){
    let id=req.body.id;
    let title=req.body.title;
     //create new database now
    try{
        await companyCatRef.create({
            "id":id,
            "title":title,
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
            res.end()
        }
    
}

async function putData(req,res){
    let id=req.params.id;
    let title=req.body["title"];
    //since id is unique we only have one data for given id:so logic goes like this
    console.log("id"+id+" and title:"+title);
    let data=await companyCatRef.findOne({"id":id});
    if(data!=null){
        //latest updated date will be added
    companyCatRef.findOneAndUpdate({"id":id},{"title":title,"updated_at":Date.now()}).then(()=>{
        res.status(200).json({"msg":"Data updated"});
        res.end();
    }).catch((e)=>{
        res.status(500).json({"msg":"Update Failed","data":e});
        res.end();
    })
    }else{
    res.status(400).json({"msg":"User not found"});
    }
       
    
    
    console.log("company category for put or update");
}

async function deleteData(req,res){
    let id=req.params.id;
    let data=await companyCatRef.findOne({"id":id});
    if(data!=null){
    try{
    await companyCatRef.deleteOne({"id":id});
    res.status(200).json({"msg":"Delete sucess"});
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