import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import https from 'https';
import pem from 'https-pem'
import './db'

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

import { mediaController } from './media/MediaController';

app.use('/media', mediaController.router);
// app.use('/favorites', mediaController.router);

app.set('port', 8000);
https
  .createServer(pem, app)
  .listen(
    app.get('port'),
    () => console.log('Express server listening on port ' + app.get('port'))
  );

export default app;