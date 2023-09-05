"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
dotenv_1.default.config();
const server = http_1.default.createServer(app_1.default);
const PORT = process.env.PORT || 4000;
(0, connectDB_1.default)()
    .then(() => {
    console.log("Connected to db");
    try {
        server.listen(PORT, () => console.log(`Server listening & database connected on ${PORT}`));
    }
    catch (e) {
        console.log('Cannot connect to the server');
    }
})
    .catch((e) => {
    console.log('Invalid database connection...! ', e);
});
