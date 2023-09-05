import dotenv from "dotenv"
import app from "./app";
import http from "http";
import connectDB from "./config/connectDB";

dotenv.config();

const server = http.createServer(app)
const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        console.log("Connected to db")
        try {
            server.listen(PORT, () => console.log(`Server listening & database connected on ${PORT}`));
        } catch (e) {
            console.log('Cannot connect to the server');
        }
    })
    .catch((e) => {
        console.log('Invalid database connection...! ', e);
    });
