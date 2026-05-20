const {nanoid} = require('nanoid');

const URL = require("../models/url");

async function handleGenerateNewURL(req,res){
    const body = req.body;
    const redirectURL = body?.url || body?.originalUrl;
    if(!redirectURL) return res.status(400).json({ error: "URL is required" });

    const shortID = nanoid(8);
    await URL.create({
        shortId: shortID,
        redirectURL,
        visitHistory: [],
    })
    return res.render('home',{
        id: shortID,
    })
    

}

async function handleAnalytics(req, res){
    const shortId = req.params.id;

    const result = await URL.findOne({shortId});

    return res.json({totalClicks : result.visitHistory.length ,
         analytics: result.visitHistory});

}

module.exports = {
    handleGenerateNewURL,
    handleAnalytics,
}