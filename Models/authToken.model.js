import mongoose from "mongoose";


const authTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  // createdAt: { type: Date, default: Date.now, expires: "8d" },
},{ timestamps: true });

const AuthToken = mongoose.model("AuthToken", authTokenSchema);

export default AuthToken;