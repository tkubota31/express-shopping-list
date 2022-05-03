const express = require("express");
const ExpressError = require('./expressError')

const itemRoutes = require("./itemRoutes")

const app = express();

app.use(express.json());

app.use("/items", itemRoutes)

//404 handler
app.use(function(req,res){
    return new ExpressError("Not Found", 404);
});

//Error Handler
app.use(function(err,req,res,next){
    let status = err.status || 500;
    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    });
});

app.listen(3000, function(){
    console.log("Server is starting on port 3000")
});
