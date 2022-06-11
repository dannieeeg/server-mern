import pkg from "mongoose";
const {model, Schema} = pkg

const Role = model(
  "Role",
  new Schema({
    name: String,
  })
);

export default Role;
