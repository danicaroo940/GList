import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  });
  
  const userModel = model('usernamer', userSchema);
  
  export default userModel;