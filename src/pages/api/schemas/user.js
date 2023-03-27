import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String, 
  email: String,
  salon: String,
  curso: String,
  hasFood: {type: String, default: "false|false|false|false"},
});