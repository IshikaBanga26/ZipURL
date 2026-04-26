import {Router} from 'express';
import {generateShortUrl} from '../controllers/Url.js';
const urlRouter = Router();

urlRouter.post("/shorten", generateShortUrl);

export default urlRouter;