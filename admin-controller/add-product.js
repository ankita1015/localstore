const productDocument=require('../modals/productsModal');
const upload=require('../middleware/upload');

module.exports=(req,res)=>{
  let uploadimages=Array();
    upload(req,res,(err)=>{
   
    req.files.forEach(element => {
      //get path from images//
       let imgpath=element.path;
     //make path correct with splite function//
       let  fixpath=imgpath.split('\\')
      //make array of path//
        uploadimages.push(`/${fixpath[1]}/${fixpath[2]}`);
     });
     
     product(uploadimages);
})
async function product(uploadimages){
try{
  const product=new productDocument({
       
     product:req.body.product.toLowerCase(),
     images:uploadimages,
     category:req.body.categoryname,
     description:req.body.details,
    });
    
const productCreated=await product.save();
res.render('add-product');
  }catch(err){
console.log(err)
}

}
}