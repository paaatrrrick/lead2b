if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import AuthRouter from './routes/auth';
import mongoose from 'mongoose';
import { createServer } from 'http'; // Use createServer for clearer semantics
import { WebSocketServer } from 'ws';


export default class Api {
    private port: number;
    private dbUrl: string;
    private clientUrl: string;
    constructor(port: number, dbUrl: string, clientUrl: string) {
        this.port = port;
        this.dbUrl = dbUrl;
        this.clientUrl = clientUrl;
    }


    error(): ErrorRequestHandler {
        return (err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err);
            res.status(500).send({ error: err.message });
        }
    }


    start(): void {
        mongoose.set('strictQuery', true);
        mongoose.connect(this.dbUrl, {
            //@ts-ignore
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const db = mongoose.connection;
        db.on("error", console.error.bind(console, "connection error:"));
        db.once("open", () => {
            console.log("💀 Mongo connection successful");
        });

        const app = express();
        app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));
        app.use(cors({ credentials: true, origin: this.clientUrl }));
        app.use(cookieParser());
        app.use(`/auth`, AuthRouter);
        app.use(this.error());

        // Create an HTTP server and wrap the express app
        const server = createServer(app);

        // Set up WebSocket server on the same port
        const wss = new WebSocketServer({ server });
        wss.on('connection', ws => {
            ws.send('Welcome! You are connected.');

            ws.on('message', message => {
                console.log('Received: %s', message);
                ws.send('Welcome! You are connected.');
            });

            ws.on('close', () => {
                console.log('Client disconnected.');
            });
        });

        let PORT: number | string = process.env.PORT || this.port;
        server.listen(PORT, () => {
            console.log(`🙀 We're live and listening for WebSocket connections on port: ${PORT}`);
        });
    }

}
