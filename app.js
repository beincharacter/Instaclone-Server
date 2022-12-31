const mongoose = require('mongoose');
const PORT = "9000" || process.env.PORT;
const MongoDb = "mongodb+srv://shubham:shubham@projects.lhvcghn.mongodb.net/?retryWrites=true&w=majority";
mongoose.set('strictQuery', true);
const app =require("./index");



 function main() {
     mongoose.connect(MongoDb, (err) => {
        if(err) console.log(err);
        else console.log("database connected");
    })
     app.listen(PORT, (err) => {
        if(err) console.log(err);
        else console.log("Server running");
    })
} main()