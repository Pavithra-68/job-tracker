const auth= async (req,res)=>{
    try{
       const {token}=req.header;
       const isVerified=jwt.verify(token,process.env.JWT_SECRET);
       next();
    }
    catch(error){
       res.status(500).json({ 
            message: 'Server error', 
            error: error.message 
        })
    }
}