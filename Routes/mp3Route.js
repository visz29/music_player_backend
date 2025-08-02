import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

import ffmpeg from 'fluent-ffmpeg';



const DOWNLOAD_DIR = path.join(process.cwd(), 'downloads');
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}

const mp3Route = (req, res) => {
  const url = req.query.url;
  console.log("this is url",url);
  

  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ error: 'Missing or invalid URL' });
  }
  

// const ffmpegPath = process.env.FFMPEG_PATH || 'ffmpeg'; // system path fallback


const filename = `audio_${Date.now()}.mp3`;
const filepath = path.join(DOWNLOAD_DIR, filename);

// const cmd = `yt-dlp -x --audio-format mp3 -o "${filepath}" "${url}"`;
const ffmpegPath = 'ffmpeg/ffmpeg-7.1.1-essentials_build/bin'; // Update path for your OS
ffmpeg.setFfmpegPath(ffmpegPath);

// const ffmpegDir = path.join(__dirname, 'ffmpeg', 'ffmpeg-2025-07-28-git-xxxxxxxx-essentials_build', 'bin');

// const command = `yt-dlp --ffmpeg-location "${ffmpegDir}" -f bestaudio ...`;
// if (!fs.existsSync(path.join(ffmpegDir, 'ffmpeg.exe'))) {
//   console.error('❌ ffmpeg.exe not found!');
// }

const cmd = `yt-dlp --ffmpeg-location "${ffmpegPath}" -x --audio-format mp3 -o "${filepath}" "${url}"`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error('yt-dlp error:', stderr);
      console.log('Download failed',err);
      
      return res.status(500).json({ error: 'Download failed' });
    }

   

    const fileUrl = `https://music-player-backend-ejtd.onrender.com/downloads/${filename}`;

    // Send the response in the format your frontend expects 
    res.json({ url: fileUrl });
    console.log(`File downloaded: ${filepath}`);
    

    // Delete file after 30 seconds
    setTimeout(() => {
      fs.unlink(filepath, (err) => {
        if (err) {
          console.error(`❌ Failed to delete ${filename}`, err);
        } else {
          console.log(`🗑️ Deleted: ${filename}`);
        }
      });
    }, 10000);
  });
};

export default mp3Route;
