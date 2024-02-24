if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
import catchAsync from '../methods/catchAsync';
import express, { Response, NextFunction } from 'express';
import User from '../models/user';
import { RequestWithUser } from '../types/apiTypes';
import { firebaseAdmin } from '../methods/firebase';

const AuthRouter = express.Router();

AuthRouter.post('/google-signup', catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { firebaseUID, email, name } = req.body;
    const oldUser = await User.findOne({ firebaseUID });
    if (oldUser) {
        return res.status(400).send({ message: 'Email already in use' });
    }
    const newUser = new User({ firebaseUID, email, name });
    await newUser.save();
    res.status(200).send({ message: 'Account Created' });
}));

AuthRouter.post('/email-signup', catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(400).send({ message: 'This email is already in use with another account.' });
        }

        const newFirebaseUser = await firebaseAdmin.auth().createUser({email, password});
        if (!newFirebaseUser) {
            return res.status(500).send({ message: 'There was an error creating account.' });
        }
        const firebaseUID = newFirebaseUser.uid;
        const newUser = new User({ firebaseUID, email, name });
        await newUser.save();
        res.status(200).send({ message: 'Account Created' });

    } catch (err) {
        res.status(500).send({ message: 'There was an error creating account.' });
    }
}));


export default AuthRouter;