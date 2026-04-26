import {nanoid} from 'nanoid';
import UrlModel from '../models/url.js';
import {isValidUrl} from '../services/urlValidation.js';

export async function generateShortUrl(req, res) {
    try{
        const{originalUrl} = req.body;
        if(!originalUrl){
            return res.status(400).json({error: "Original URL is required"});
        }
        if(!isValidUrl(originalUrl)){
            return res.status(400).json({error: "Invalid URL format"});
        }
        const shortId = nanoid(10);

        const saveData = new UrlModel({originalUrl, shortId});
        await saveData.save();

        const shortUrl = `${req.protocol}://${req.get("host")}/${shortId}`;
        return res.status(201).json({shortUrl});
    } catch (error) {
        console.error("Error generating short URL:", error);
        return res.status(500).json({error: "Internal server error"});
    }
}

export async function redirectToUrl(req, res) {
    try{
        const{shortId} = req.params;

        if(!shortId)
            return res.status(400).json({error: "Short ID is required"});
        const urlData = await UrlModel.findOne({shortId : shortId});

        if(!urlData)
            return res.status(404).json({error: "Short URL not found"});
        return res.redirect(urlData.originalUrl);
    } catch (error) {
        console.error("Error redirecting to original URL:", error);
        return res.status(500).json({error: "Internal server error"});
    }
}
