const mongo=require("mongoose");


const companyCategory=new mongo.Schema({
    "id":{type:String,
        unique:[true,"Data not unique"]},

    "title":{
        type:String,
        required:true
    },
    "created_at":{
        type:Date,
        default:Date.now()
    },
    "updated_at":{
        type:Date,
        default:"0"
    }
});
const company=new mongo.Schema({
    "id":{
        type:String,
        unique:true
    },
    "category_id":{
        type:String,
        default:null
    },
    "title":{
        type:String,
        required:true
        },
    "image":String,
    "description":String,
    "status":{
        type:Boolean,
        required:true    
    },
    "created_at":{
        type:Date,
        default:Date.now()
    },
    "updated_at":{
        type:Date,
        default:Date.now(),
    }

})

const companyCatRef=mongo.model("companyCategory",companyCategory);
const companyRef=mongo.model("company",company);
module.exports={companyCatRef,companyRef};