const getAllFactory=function(ElementModel){
    return async function(req,res){
        try{
            const elements=await ElementModel.find();
            if(elements.length===0){
                throw new Error("no element found");
            }
            res.status(200).json({
                status:"success",
                message:elements
            })
        }catch(err){
            res.status(400).json({
                status:"failure",
                message:err.message
            })
        }
    }
}
const createAllFactory=function(ElementModel){
    return async function(req,res){
        try{
            const elementDetails = req.body;
            const element=await ElementModel.create(elementDetails);
            console.log(element);
            res.status(200).json({
                status:"success",
                message:"got response from post method",
                user
            })
        }catch(err){
            res.status(404).json({
                status:"failure",
                message:err.message
            })
        }
        
    }
}
const getElementByIdFactory=function(ElementModel){
    return async function(req,res){
        try{
            const elementId = req.params.elementId;
        const elementDetails =await ElementModel.findById(elementId)
        if(elementDetails == "no element found"){
            throw new Error(`user with ${elementId} not found`)
        }else{
            res.status(200).json({
                status:"success",
                message:elementDetails
            })
        }
        }catch(err){
            res.status(404).json({
                status:"failure",
                message:err.message
            })
        }
    }
}
const deleteByIdFactory=function(ElementModel){
    return async function(req,res){
        const elementId=req.params;
        const id=Object.values(elementId)[0]

        try{
            const element =await ElementModel.findByIdAndDelete(id);
            res.status(200).json({
                status:"successfully deleted element with id "+id,
                message:element
            })
        }catch(err){
            res.status(404).json({
                status:"failure",
                message:err.message
            })
        }
    }
}


module.exports={getAllFactory, createAllFactory, deleteByIdFactory, getElementByIdFactory}