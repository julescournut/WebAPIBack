import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routes from "./routes/routes";

dotenv.config();

const app = express();

mongoose.connect(
    process.env.MONGO,
    { useNewUrlParser: true }
);
mongoose.set('useCreateIndex', true);

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    app.use("/", routes);

    let listener = app.listen(process.env.PORT, () => {
        console.log(`server running on port ${listener.address().port}`)
    });
});
