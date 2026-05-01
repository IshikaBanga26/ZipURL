import {nanoid} from 'nanoid';
import UrlModel from '../models/url.js';
import {isValidUrl} from '../services/urlValidation.js';

export async function generateShortUrl(req, res) {
    try{
        const{originalUrl, expiresIn} = req.body;
        if(!originalUrl){
            return res.status(400).json({error: "Original URL is required"});
        }
        if(!isValidUrl(originalUrl)){
            return res.status(400).json({error: "Invalid URL format"});
        }
        const shortId = nanoid(10);

        let expiresAt = null;
        if (expiresIn) {
            expiresAt = new Date(Date.now() + expiresIn * 60 * 60 * 1000);
        }

        const saveData = new UrlModel({originalUrl, shortId, expiresAt});
        await saveData.save();

        const shortUrl = `${req.protocol}://${req.get("host")}/${shortId}`;
        return res.status(201).json({shortUrl, expiresAt });
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

        if (urlData.expiresAt && new Date() > urlData.expiresAt) {
            return res.status(410).json({ error: "This link has expired" });
        }

        await UrlModel.findOneAndUpdate(
            { shortId },
            { $inc: { clicks: 1 } }
        );

        return res.redirect(urlData.originalUrl);
    } catch (error) {
        console.error("Error redirecting to original URL:", error);
        return res.status(500).json({error: "Internal server error"});
    }
}

export async function getUrlStats(req, res) {
    try {
        const { shortId } = req.params;
        const urlData = await UrlModel.findOne({ shortId });

        if(!urlData)
            return res.status(404).json({ error: "Short URL not found" });

        return res.status(200).json({
            originalUrl: urlData.originalUrl,
            shortId: urlData.shortId,
            clicks: urlData.clicks,
            createdAt: urlData.createdAt,
            expiresAt: urlData.expiresAt
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
