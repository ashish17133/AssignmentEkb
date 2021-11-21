const {companyCatRef,companyRef}=require("../database/databaseCompany");

async function loadData(){
    for(var i=0;i<=15;i++){
        let title=`Book${i}`;
        companyCatRef.create({
            "id":i,
            "title":title,
        })



      }
}



async function loadDataCompany(){
    for(var i=0;i<=15;i++){
        let title=`Book${i}`;
        let category=`${i}${i}`;
        let description=`Description${i}`;
        let status=true;

        companyRef.create({
            "id":i,
            "category_id":category,
            "title":title,
            "image":"Image url",
            "description":description,
            "status":status
        });
};
};

module.exports={loadData,loadDataCompany}