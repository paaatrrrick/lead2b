import mongoose from 'mongoose';
import { UserType } from '../types/models';

const Schema = mongoose.Schema;
const UserSchema = new Schema<UserType>({
    email: { type: String, optional: false },
    dateCreate: { type: Date, default: Date.now },
    name: { type: String, optional: false },
    profilePicture: { type: String, optional: true },
    firebaseUID: { type: String, optional: false },
    sheetIDs: { type: [String], optional: false, default: []},
});

export default mongoose.model('User', UserSchema);