const cartDocument=require('../modals/cartmodal');

module.exports=async(req,res)=>{
    const cartProducts=await cartDocument.find({'userId':req.user._id})
 
    .populate(['productId','category','shopId'])
    .exec((err,data)=>{
      
        if(data){
    
       
           res.send(data);
    
       }else{
           res.send('1')  
       }
  
    })
}
