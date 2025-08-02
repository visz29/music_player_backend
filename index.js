import express from 'express';
import mp3Route from './Routes/mp3Route.js'; // or './mp3Router' if not in /routes
import path from 'path';
import cors from 'cors';
import router from './Routes/UserRoute.js';
import { configDotenv } from 'dotenv';
import dbconnect from './daatBase/db.js';
import os from 'os';
import { downloadFFmpeg } from './download_ffmpeg.js';

configDotenv();

const app = express();
app.use(express.json({ limit: '10mb' })); // or larger if needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors({
  origin:'*'
}));

// Serve downloaded files
app.use('/downloads', express.static(path.join(process.cwd(), 'downloads')));
// Mount the music route
app.use('/music', mp3Route);

downloadFFmpeg()
dbconnect()

app.use(express.json());
app.use('/user', router);




app.get('/', (req, res) => {
  res.send('Welcome to the Music API');
});


function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const net of iface) {
      if (
        net.family === 'IPv4' &&
        !net.internal &&
        net.address.startsWith('192.168.')
      ) {
        return net.address;
      }
    }
  }
  return '127.0.0.1'; // fallback
}

const localIP = getLocalIP();

let PORT = process.env.PORT || 4000;
app.listen(PORT,  '0.0.0.0', () => {
  console.log(`✅ Server running on http://${localIP}:${PORT}`);
});
