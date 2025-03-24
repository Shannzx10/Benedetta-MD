const fs = require('fs');
const axios = require('axios');
const { fromBuffer } = require('file-type');

async function upload(filePath) {
  const buffer = fs.readFileSync(filePath);
  const { ext, mime } = (await fromBuffer(buffer)) || {};
  const fileName = Date.now() + "." + ext;

  const folder = "uploads";
  const responsej = await axios.post("https://pxpic.com/getSignedUrl", { folder, fileName }, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { presignedUrl } = responsej.data;

  await axios.put(presignedUrl, buffer, {
    headers: {
      "Content-Type": mime,
    },
  });

  const cdnDomain = "https://files.fotoenhancer.com/uploads/";
  const sourceFileUrl = cdnDomain + fileName;

  return sourceFileUrl;
}

module.exports = { upload }