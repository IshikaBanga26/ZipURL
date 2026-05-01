import {model, Schema} from 'mongoose';
const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortId: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        default: null  
    }
});
export default model('Url', urlSchema);