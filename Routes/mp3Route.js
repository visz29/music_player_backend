import ytdlp from 'yt-dlp-exec';
import ffmpegPath from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';
import { env } from 'process';

const DOWNLOAD_DIR = path.join(process.cwd(), 'downloads');
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}

const mp3Route = async (req, res) => {
  const url = req.query.url;
  console.log("🔗 Requested URL:", url);

  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ error: 'Missing or invalid URL' });
  }

  const filename = `audio_${Date.now()}.mp3`;
  const filepath = path.join(DOWNLOAD_DIR, filename);

  try {
    console.log("🎬 Running yt-dlp...");
    await ytdlp(url, {
      extractAudio: true,
      audioFormat: 'mp3',
      output: filepath,
      ffmpegLocation: ffmpegPath,
      cookies: 'AKEyXzXdA8atk2kYY-C6qdqEDAwI1vuvhfGREBHp9oLYo7r8erLjJRFqMX6IIgd-9RxsDMltSDs',
    });

    const fileUrl = `/${filename}`;
    res.json({ url: fileUrl });

    // auto-delete after 10 seconds
    setTimeout(() => {
      fs.unlink(filepath, (err) => {
        if (err) console.error(`❌ Failed to delete ${filename}`, err);
        else console.log(`🗑️ Deleted: ${filename}`);
      });
    }, 10000);

  } catch (err) {
    console.error('❌ yt-dlp failed:', err);
    res.status(500).json({ error: 'Download failed' });
  }
};

export default mp3Route;
