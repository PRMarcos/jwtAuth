const JWT_SECRET = "jadilson"

const express = require("express")
const db = require("./src/database.json")
const cors = require("cors");
const jwt = require("jsonwebtoken")
const CheckAuthentication = require("./src/middlewares/auth")

const app = express()

app.use(cors({origin:"*"}));
app.use(express.json());


app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(express.static(__dirname + "/public"));


//routes

app.get("/", (req,res)=>{

    res.render("home")
})

app.get("/dashboard",CheckAuthentication, (req,res)=>{

    const {UserID} =  req.body;

    const Currentuser = db.users.find(user => user.id == UserID)

    res.render("dashboard",{Currentuser})
})

app.get("/login", (req,res)=>{

    res.render("login")
})

app.post("/login", (req,res)=>{

    const {password, email} = req.body;
    //console.log(password,email)
    
    const user = db.users.find((user)=> user.email == email)

    if(!user){
        return res.status(400).json({error:true, message:"user not found"})
    }

    if(!(user.password == password)){
        return res.status(400).json({error:true, message:"user or password not match"})
    }   


    const token = jwt.sign({_id: user.id}, JWT_SECRET)

    return res.status(200).cookie('Authorization', token,{ maxAge: 1000 * 60 * 60, httpOnly: true }).json({error:false, mesage: "token set", token});



   
})

app.post("/signin", (req,res)=>{

    res.status(200).json({ok:true})
})

app.listen(3000 , ()=>{console.log("o pai ta on em http://localhost:3000")})



