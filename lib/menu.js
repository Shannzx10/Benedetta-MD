const fs = require('fs');
const chalk = require('chalk');
const { runtime } = require('./function');
const os = require("os")

exports.menu =  ( isPremium, time, sender, prefix, pushname) => {

return `\n◇──────────────────────◇
│ 𝕌𝕊𝔼ℝ & 𝕀ℕ𝔽𝕆ℝ𝕄𝔸𝕋𝕀𝕆ℕ
◇──────────────────────◇
│❐ *ɴᴀᴍᴇ:* ${pushname}
│❐ *ꜱᴛᴀᴛᴜꜱ:* ${isPremium ? 'Premium' : 'Free'}
│❐ *ʀᴜɴᴛɪᴍᴇ:* ${runtime(process.uptime())}
│❐ *ᴜꜱᴇʀꜱ:*
│❐ *ᴏꜱ:* ${os.version()} / ${os.release()}
◇──────────────────────◇


◇──────────────────────◇
│ 𝕄𝔼ℕ𝕌 𝕆𝕎ℕ𝔼ℝ
◇──────────────────────◇
│❐ .ꜱᴇʟꜰ
│❐ .ᴘᴜʙʟɪᴄ
│❐ .ᴀᴅᴅᴄᴀꜱᴇ
│❐ .ɢᴇᴛᴄᴀꜱᴇ
│❐ .ᴅᴇʟꜱᴇꜱɪ
│❐ .ᴀɴᴛɪʟɪɴᴋ
│❐ ᴇᴠᴀʟᴇᴅ & ᴇxᴇᴄ ( =>, >, <, $ )
◇──────────────────────◇

◇──────────────────────◇
│ 𝕄𝔼ℕ𝕌 𝔾ℝ𝕆𝕌ℙ
◇──────────────────────◇
│❐ .ᴋɪᴄᴋ
│❐ .ɢʀᴏᴜᴘ ᴄʟᴏꜱᴇ
│❐ .ɢʀᴏᴜᴘ ᴏᴘᴇɴ
│❐ .ʜɪᴅᴇᴛᴀɢ
│❐ .ᴀꜰᴋ
◇──────────────────────◇

◇──────────────────────◇
│ 𝔸ℝ𝕋𝕀𝔽𝕀ℂ𝕀𝔸𝕃 𝕀ℕ𝕋𝔼𝕃𝔼𝔾𝔼ℕℂ𝕀
◇──────────────────────◇
│❐ .ꜰᴇʟᴏ
◇──────────────────────◇\n\n`
}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.yellow(`New ${__filename}`));
    delete require.cache[file];
    require(file);
});
process.on('uncaughtException', console.error);