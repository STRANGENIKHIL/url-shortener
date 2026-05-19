const express = require('express')
const { connectToMongoDB } = require('./connect');
const app = express();
const urlRoute = require("./routes/url_routes");
const PORT = 8001
const URL = require('./models/url');
connectToMongoDB('mongodb://localhost:27017/urlshortener').then(()=> console.log("Mongo DB connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/:shortId" , async (req,res) =>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {shortId},
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    if(!entry) return res.status(404).json({error: "URL not found"});
    
    res.redirect(entry.redirectURL);

})
app.use('/url',urlRoute);
app.listen(PORT,()=>{
    console.log("server is running on port 8001")
})
