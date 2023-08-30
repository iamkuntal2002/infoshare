const express = require("express");
const app = express();
require("./src/db/mongoose");
const bodyParser = require("body-parser");
const DataRouter = require("./src/routers/Data");
const cors = require("cors");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// CORS ISSUE ---------------------
const corsOptions = {
    origin: 'https://infoshare.netlify.app',
    // origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get("/", (req,res)=>{
    res.send("Welcome to InfoShare Backend");
})


app.use(DataRouter);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log("Server is listening on port:", port);
})