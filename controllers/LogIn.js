import AuthToken from "../Models/authToken.model.js";
import User from "../Models/user.Model.js";
// import bcrypt from 'bcrypt';


const LogIn = async (req, res) => {
    // console.log(req.body.email);

    let cookie = req.body
    // console.log("this is cookie", cookie);

    let { email, password } = req.body
    if (email == "" || password == "") {
        res.status(400).json({ msg: "Please fill all inputs" })
    }

    let findUser = await User.findOne({ email })
    if (!findUser) return res.status(404).json({ msg: "User not found" })
    // console.log("this is find user",findUser);

    let token = await findUser.tokenGenerator()
    // console.log("this is token", token);

    let authToken = await AuthToken.updateOne(
        { userId: findUser._id },
        { token },
        { upsert: true, new: true }
    );

    // console.log("Auth Token : ", authToken);




    if (findUser) {
        let passisMatch = await password == findUser.password ? true : false;
        let emailisMatch = await email == findUser.email ? true : false;
        if (!passisMatch) return res.status(400).json({ msg: "Username or password is wrong" })
        if (!emailisMatch) return res.status(400).json({ msg: "Username or password is wrong" })


        res.cookie("token", token)
        res.status(200).json({ msg: "Login success" })
    }
}

export default LogIn