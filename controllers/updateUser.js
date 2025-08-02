import User from "../Models/user.Model.js";



function updateUser(req, res) {
    // This function will handle the update user logic
    // console.log("Update User Request:", req.body);
    let { username, email, password, profilePic, bio,_id } = req.body;
    // console.log(_id);
    
    let result = User.updateOne({
        _id: _id
    }, {
        $set: {username, email, password, profilePic, bio}
    }).then((result) => {
        // console.log("User updated successfully:", result);
    }).catch((err) => {
        console.error("Error updating user:", err);})
    // For now, it just sends a response back
    res.status(200).json({ message: "User updated successfully" });
    
}

export default updateUser