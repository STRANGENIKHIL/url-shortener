const express = require('express')
const { connectToMongoDB } = require('./connect');
const path = require('path');
const app = express();
const urlRoute = require("./routes/url_routes");
const PORT = 8001
const URL = require('./models/url');
const staticRoute = require("./routes/staticrouter");
const userRoute = require("./routes/user");
const cookieParser = require('cookie-parser');
const {restrictToLoggedInUsers , checkAuth} = require('./middlewares/auth');

connectToMongoDB('mongodb://localhost:27017/urlshortener').then(()=> console.log("Mongo DB connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/" ,checkAuth, staticRoute);
app.use('/user',  userRoute);
app.use('/url',restrictToLoggedInUsers, urlRoute);


app.set('view engine' , "ejs");
app.set('views', path.resolve("./views") );

app.get("/test", async (req,res)=>{
    const allUrls = await URL.find({});
    return res.render('home', { urls: allUrls, id: null });
});


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

app.listen(PORT,()=>{
    console.log("server is running on port 8001")
})
