import mongoose from 'mongoose';
import { SheetType } from '../types/models';

const Schema = mongoose.Schema;
const SheetSchema = new Schema<SheetType>({
    sheetName: { type: String, required: true },
    rows: { type: Number, required: true },
    prompt: { type: String, required: true },
    columns: { type: [String], required: true },
    gridItems: { type: [Object], default: [] },
});

export default mongoose.model('Sheet', SheetSchema);