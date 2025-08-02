import followRedirects from 'follow-redirects';
import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';
import { fileURLToPath } from 'url';

const https = followRedirects.https;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const zipUrl = 'https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip';
const zipPath = path.join(__dirname, 'ffmpeg.zip');
const extractPath = path.join(__dirname, 'ffmpeg');

export async function downloadFFmpeg() {
  if (fs.existsSync(path.join("ffmpeg/ffmpeg-7.1.1-essentials_build", 'bin', 'ffmpeg.exe'))) {
    console.log('✅ FFmpeg already extracted.');
    return;
  }

  console.log('⬇️  Downloading FFmpeg from:', zipUrl);

  https.get(zipUrl, (res) => {
    if (res.statusCode !== 200) {
      console.error(`❌ Failed to download. Status: ${res.statusCode}`);
      return;
    }

    const fileStream = fs.createWriteStream(zipPath);
    res.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();

      fs.createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: extractPath }))
        .on('close', () => {
          console.log('✅ FFmpeg downloaded and extracted.');
        });
    });
  });
}
