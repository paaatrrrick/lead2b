import { Request } from 'express';
import { UserType } from '../types/models';


export interface RequestWithUser extends Request {
    user?: UserType;
}
