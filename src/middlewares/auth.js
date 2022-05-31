const jwt = require("jsonwebtoken")
const JWT_SECRET = "jadilson"
const  getCookieFromString  = require("../utils/utils")



module.exports = function CheckAuthentication(req, res, next){

        const cookiesString = req.headers.cookie;

        if(!cookiesString) return res.status(401).redirect("/login")
    
        const token = getCookieFromString(cookiesString,"Authorization")

        if(!token) return res.status(401).redirect("/login")
    
        try {
            const decoded = jwt.verify(token, JWT_SECRET)
            req.body.UserID =  decoded._id
            next()
        } catch (error) {
            return res.status(401).redirect("/login")
        }
    }




