function checkHeader(req,res,next){
    try {
        const apiKey=req.headers["api_key"];
        if(apiKey==="BA673A414C3B44C98478BB5CF10A0F832574090C"){
            console.log("Valid api key");
            next();
        }else{
            res.status(200).json({
                "api_key":req.headers["api_key"],
                "msg":"Invalid api key"
            })
        }
        

        
    } catch (error) {
        res.status(401).json({
            "msg":"invalid request"
        })
        
    }
   
}



module.exports={checkHeader}