import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../types/apiTypes';

const catchAsync = func => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        func(req, res, next).catch(next);
    }
}

export default catchAsync;
