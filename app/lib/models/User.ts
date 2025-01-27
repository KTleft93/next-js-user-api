import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User extends Document {
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiration?: Date;
  createdAt: Date;
}

export const UserSchema: Schema<User> = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: { type: String, required: false },
  resetTokenExpiration: { type: Date, required: false },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.methods.comparePassword = async function (password: string) {

  return bcrypt.compare(password, this.password);

};

const UserModel = mongoose.model('UserSchema', UserSchema);
export default UserModel;
