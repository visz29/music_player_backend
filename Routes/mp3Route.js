import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';



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

  const filename = `audio_${Date.now()}.mp3`;
  const filepath = path.join(DOWNLOAD_DIR, filename);

  // const cmd = `yt-dlp -x --audio-format mp3 -o "${filepath}" "${url}"`;
  const ffmpegPath = 'ffmpeg/bin'; // Update path for your OS
const cmd = `yt-dlp --ffmpeg-location "${ffmpegPath}" -x --audio-format mp3 -o "${filepath}" "${url}"`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error('yt-dlp error:', stderr);
      console.log('Download failed',err);
      
      return res.status(500).json({ error: 'Download failed' });
    }

    const fileUrl = `http://192.168.1.3:3000/downloads/${filename}`;

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
