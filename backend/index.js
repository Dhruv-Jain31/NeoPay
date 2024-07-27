const express = require('express');
const cors = require("cors");
const mainRouter = require("./routes/index")

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1", mainRouter); // routes all requests coming to api/ to mainRouter

app.listen(5600, function(){
    console.log(`Neopay is running on localhost:5600`);
})
