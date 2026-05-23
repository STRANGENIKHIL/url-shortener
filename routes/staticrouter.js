const express =require("express");
const URL = require('../models/url');
const {restrictTo} = require('../middlewares/auth');
const router = express.Router();

router.get('/admin/urls' , restrictTo(["ADMIN"]), async(req,res)=>{
    const allurls = await URL.find({});
    return res.render("home" , {
        urls: allurls,
    });
})

router.get("/" , restrictTo(['Normal']),async (req,res)=>{
    const allUrls = await URL.find({createdBy: req.user._id}).lean();
    return res.render('home', { id: null });
});

router.get('/signup',(req,res)=>{
    return res.render('signup');
});

router.get('/login',(req,res)=>{
    return res.render('login');
});
module.exports = router;
