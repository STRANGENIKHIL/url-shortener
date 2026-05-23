const {getUser} = require('../service/auth');

function checkForAuthentication(req,res,next){
    const authHeaderValue = req.headers?.Authorization || '';
    req.user = null;
    if(!authHeaderValue || !authHeaderValue.startsWith("Bearer")) return next();

    const token = authHeaderValue.split('Bearer ')[1];
    const user = getUser(token);
    req.user = user;
    return next();

}

function restrictTo(roles){
    return function(req,res,next){
        if(!req.user)  return res.redirect('/login');
        if(!roles.includes(req.user.role)) return res.end('UnAuthorize');

        return next();
    };
}
module.exports = {
    checkForAuthentication,
    restrictTo,
}
