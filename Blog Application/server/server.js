import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import  Router from './routes/route.js';
import cors from  'cors';
import bodyParser from 'body-parser';
 
dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({extended :true}));
app.use(bodyParser.urlencoded({extended : true}));
app.use('/', Router);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"));
}
 
const PORT =process.env.PORT || 8000;

app.listen(PORT, () => console.log(`server  is running successfully on port ${PORT}` ));

const USERNAME =process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL =process.env.MONGODB_URI  ||  `mongodb+srv://${USERNAME}:${PASSWORD}@blog-app.uaoapjc.mongodb.net/?retryWrites=true&w=majority`;
   
Connection(URL); 