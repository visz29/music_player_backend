import User from "../Models/user.Model.js";


const getUser = async (req, res) => {

    // console.log(res.body);
    

    let cookie = req.body.cookie
    // console.log("this is cookie", cookie);

    let { email, password } = req.body
    if (email == "" || password == "") {
        res.status(400).json({ msg: "Please fill all inputs" })
    }

    let findUser = await User.findOne({ email })
    if (!findUser) return res.status(404).json({ msg: "User not found" })
    // console.log("this is find user",findUser);

    res.status(200).json({ msg: "User Found", user: findUser })
}

export default getUser