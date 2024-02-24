if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
import catchAsync from '../methods/catchAsync';
import express, { Response, NextFunction } from 'express';
import Sheet from '../models/sheet';
import { RequestWithUser } from '../types/apiTypes';
import { Authenticate } from '../methods/middleware';
import User from '../models/user';

const SheetsRouter = express.Router();

SheetsRouter.get('/getNames', Authenticate, catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;
    const sheetsIDs = user.sheetIDs;
    const allSheets = await Promise.all(sheetsIDs.map(async (id) => {
        const sheet = await Sheet.findById(id).select('sheetName -_id');
        return {id: id, name: sheet?.sheetName || 'no name'};
    }));

    res.status(200).send(allSheets);
}));

SheetsRouter.post('/create', Authenticate, catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const userID = req.user._id;
    const {sheetName, rows, prompt, columns} = req.body;
    const newSheet = new Sheet({sheetName, rows, prompt, columns});
    console.log(newSheet);
    await newSheet.save();
    await User.findByIdAndUpdate(userID, { $push: { sheetIDs: newSheet._id } }).exec();
    res.status(200).send(newSheet);
}));


SheetsRouter.get('/get', Authenticate, catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { id } = req.query;
    const sheet = await Sheet.findById(id);
    if (!sheet) return res.status(404).send('Sheet not found');
    res.status(200).send(sheet);
}));

export default SheetsRouter;