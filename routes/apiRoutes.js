import {Router} from 'express';
import {generateShortUrl,getUrlStats} from '../controllers/Url.js';
const urlRouter = Router();

urlRouter.post("/shorten", generateShortUrl);
urlRouter.get("/stats/:shortId", getUrlStats); 

export default urlRouter;