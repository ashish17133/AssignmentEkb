const urlError=(req,res)=>{
res.status(400).json({
    "msg":"Invalid Url"
});
res.end();
}

module.exports={urlError};