import AuthToken from "../Models/authToken.model.js";
import User from "../Models/user.Model.js";

const SignUp = async (req, res) => {

    
    let {name, email, password} = req.body
    if(name == "" || email == "" || password == ""){
        res.status(400).json({msg: "Please fill all inputs"})
    }
    // console.log(name);
    let token = ""
    try{

        const user = await User.create({
            username:name,
            email,
            password
        })
        
            
        token  = await user.tokenGenerator()
        // console.log(token);
    
        let authToken = await AuthToken.create({
            userId: user._id,
            token
        })
        // console.log("Auth Token : ",authToken);
        
    }catch(err){
        console.log("Sing Up ERROR => ",err.errorResponse);
        res.status(400).json({msg: "This Email $ username already register"})
    }
    

    // console.log("Sing Up ERROR => ",err.errorResponse);
    // res.status(400).json({msg: "This Email $ username already register"})
        
   

    res.cookie("token", token)
    
    
    res.status(200).json({msg:"sign_up_complete"})
}

export default SignUp