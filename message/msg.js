const SETTING = require('../connection/setting')
const keywords = require('../lib/validator/allKeywords')

let modul = SETTING['modul'];
let getreq = SETTING['file'];
const chalk = modul['chalk'];
const fs = modul['fs'];
const util = modul['util'];
const https = modul['https'];
const axios = modul['axios'];
const ytsr = modul['ytsr'];
const { spawn, exec, execSync } = modul['child'];
const { downloadContentFromMessage, WA_DEFAULT_EPHEMERAL, getLastMessageInChat, MessageType, generateWAMessageFromContent, prepareWAMessageMedia, proto } = modul['baileys'];
const moment = modul['time'];
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const qrcode = modul['qrcode'];
const QrCode = modul['QrCode'];
const qr = new QrCode();
const speed = modul['speed'];
const request = modul['request'];
const path = modul['path'];
const ms = modul['premium'];
const cheerio = require('cheerio');
const _prem = require('.' + getreq['prem']);
const { isLimit, limitAdd, getLimit, giveLimit, addBalance, kurangBalance, getBalance, isGame, gameAdd, givegame, cekGLimit } = require('.' + getreq['limit']);
const { color, bgcolor, ConsoleLog, biocolor } = require('.' + getreq['color']);
const { formatSize, sleep, readTime, reSize, runtime, getBuffer, getRandom, pickRandom, fetchJson, isUrl, genMath, formatp } = require('.' + getreq['funct']);
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, writeExif, writeExifStc } = require('.' + getreq['exif']);

//DATABASE 
var balance = JSON.parse(fs.readFileSync('./database/balance.json'));
var limit = JSON.parse(fs.readFileSync('./database/limit.json'));
var glimit = JSON.parse(fs.readFileSync('./database/glimit.json'));
var premium = JSON.parse(fs.readFileSync('./database/premium.json'));
var pendaftar = JSON.parse(fs.readFileSync('./database/user.json'));
const db_api = JSON.parse(fs.readFileSync('./database/api.json'));
const afk = require("../lib/afk");
let _afk = JSON.parse(fs.readFileSync("./database/afk.json"));

//SETUP
module.exports = async(m, Shannz, from, store) => { 
   const isGrouP = from.endsWith('@g.us')
   const sender = isGrouP ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
   const pushname = m.pushName || "No Name"
   const CMD = (m.xtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.xtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.xtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.xtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.xtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId ? m.message.buttonsResponseMessage.selectedButtonId : (m.xtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.xtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''.slice(1).trim().split(/ +/).shift().toLowerCase()
   const prefix = /^[#!.,®©¥€¢£/\∆✓]/.test(CMD) ? CMD.match(/^[#!.,®©¥€¢£/\∆✓]/gi) : '#'   
	 global.prefix = prefix
   const chatmessage = (m.xtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.xtype == 'imageMessage') ? m.message.imageMessage.caption : (m.xtype == 'videoMessage') ? m.message.videoMessage.caption : (m.xtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.xtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.xtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.xtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.xtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
   const ordermessage = (m.xtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.xtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.xtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.xtype == 'extendedTextMessage') && m.message.extendedTextMessage.text.startsWith(prefix) ? m.message.extendedTextMessage.text : (m.xtype == 'buttonsResponseMessage') && m.message.buttonsResponseMessage.selectedButtonId.startsWith(prefix) ? m.message.buttonsResponseMessage.selectedButtonId : (m.xtype == 'listResponseMessage') && m.message.listResponseMessage.singleSelectReply.selectedRowId.startsWith(prefix) ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.xtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId.startsWith(prefix) ? m.message.templateButtonReplyMessage.selectedId : ''   
   const chats = (m.xtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.xtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.xtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.xtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.xtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.xtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.xtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''   	
   const args = ordermessage.trim().split(/ +/).slice(1)         
   const order = ordermessage.slice(0).trim().split(/ +/).shift().toLowerCase()	   
   const isCmd = ordermessage.startsWith(prefix)   
   const command = isCmd ? ordermessage.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
   const text = q = args.join(' ')   
   const fatkuns = (m.quoted || m)
   const quoted = (fatkuns.xtyp == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.xtyp == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.xtyp == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m   
   const content = JSON.stringify(m.message)
   const orderPlugins = isCmd ? ordermessage.slice(1).trim().split(/ +/).shift().toLowerCase() : null
   const isGroup = from.endsWith(keywords[0]['chats'][1])
   const isChanel = from.endsWith('@newsletter')
   const botNumber = Shannz.user.id.split(':')[0] + keywords[0]['chats'][0]
   const mime = (quoted.m || quoted).mimetype || '' 
   const isMedia = /image|video|sticker|audio/.test(mime)
   const itulho = isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid  
   const isOwner = [botNumber, ...global.ownerNumber].map(jid => jid.replace(/[^0-9]/g, '') + keywords[0]['chats'][0]).includes(itulho)
   const groupMetdata = isGroup ? await Shannz.groupMetadata(from) : ''
         Shannz.groupMembers = isGroup ? groupMetdata.participants : ''
         Shannz.groupName = isGroup ? await groupMetdata.subject : ''   
         Shannz.groupAdmins = isGroup ? m.getGroupAdmins(Shannz.groupMembers) : ''
   const isBotGroupAdmins = Shannz.groupAdmins.includes(botNumber) || false
   const isGroupAdmins = Shannz.groupAdmins.includes(m.sender)
   const isPremium = isOwner ? true : _prem.checkPremiumUser(sender, premium)
   const gcounti = SETTING.gcount
   const gcount = isPremium ? gcounti.prem : gcounti.user
   const limitCount = SETTING.limitCount
   const isUser = pendaftar.includes(sender)
   const isAfkOn = afk.checkAfkUser(m.sender, _afk)
   _prem.expiredCheck(Shannz, premium)
   const mentionByTag = m.xtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
   const mentionByreply = m.xtype == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
  const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByreply) : []
  const mentionUser = mention != undefined ? mention.filter(n => n) : false
  const today = moment().tz("Asia/Jakarta")
  const day = today.format('dddd');
  const datee = today.format('D');
  const month = today.format('MMMM');
  const year = today.format('YYYY');

//FUNCTION
  const qkontak = { 
    key: {
        fromMe: false, 
        participant: "0@s.whatsapp.net", 
        ...(from ? { remoteJid: "status@broadcast" } : {})
    }, 
    message: { 
        contactMessage: { 
            displayName: `${m.sayingtime + m.timoji}\n☏User: ${pushname}`, 
            vcard: 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + `item1.TEL;waid=${sender.split("@")[0]}:+${sender.split("@")[0]}\n` + 'item1.X-ABLabel:Ponsel\n' + 'END:VCARD' 
        } 
    } 
  }

//CONFIG AFK
if (m.isGroup) {
let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
for (let ment of mentionUser) {
if (afk.checkAfkUser(ment, _afk)) {
let getId2 = afk.getAfkId(ment, _afk)
let getReason2 = afk.getAfkReason(getId2, _afk)
let getTime = Date.now() - afk.getAfkTime(getId2, _afk)
let heheh2 = await readTime(getTime)
m.reply(` *[ ⛔ PERINGATAN ⛔ ]*
 
 📝 *Note :* Jangan tag dia kak, Dia sedang afk
 💡 *Alasan* : ${getReason2}
 🕛 *Selama* : ${heheh2.hours} jam, ${heheh2.minutes} menit, ${heheh2.seconds} detik yg lalu`)
}
}
if (afk.checkAfkUser(m.sender, _afk)) {
let getId = afk.getAfkId(m.sender, _afk)
let getReason = afk.getAfkReason(getId, _afk)
let getTime = Date.now() - afk.getAfkTime(getId, _afk)
let heheh = await readTime(getTime)
_afk.splice(afk.getAfkPosition(m.sender, _afk), 1)
fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
Shannz.sendTextWithMentions(m.chat,`*[ 👑 KEMBALI DARI AFK 👑 ]*
 
 👤 *User* : @${m.sender.split('@')[0]}
 💡 *Alasan* : ${getReason}
 🕛 *Selama* : ${heheh.hours} jam, ${heheh.minutes} menit, ${heheh.seconds} detik yg lalu`, m)
}
}

//EVALED & EXEC
if (chatmessage.startsWith('<')) {
    if (!isOwner) return
    if (!q) return m.reply('Masukan Parameter Code!')
    let kode = chatmessage.trim().split(/ +/)[0]
    let teks
    try {
        teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
    } catch (e) {
        teks = e
    } finally {
        await m.reply(require('util').format(teks))
    }
}
if (chatmessage.startsWith('=>')) {
    if (!isOwner) return
    function Return(sul) {
        sat = JSON.stringify(sul, null, 2)
        bang = util.format(sat)
        if (sat == undefined) {
            bang = util.format(sul)
        }
        return m.reply(bang)
    }
    try {
        m.reply(util.format(eval(`(async () => { ${chatmessage.slice(3)} })()`)))
    } catch (e) {
        m.reply(String(e))
    }
}
if (chatmessage.startsWith('>')) {
    if (!isOwner) return
    try {
        let evaled = await eval(chatmessage.slice(2))
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
        await m.reply(evaled)
    } catch (err) {
        m.reply(String(err))
    }
}
if (chatmessage.startsWith('$')) {
    if (!isOwner) return
    exec(chatmessage.slice(2), (err, stdout) => {
        if(err) return Shannz.sendMessage(from, {text :String(err)}, {quoted:m})
        if (stdout) return m.reply(stdout)
    })
}

//AUTO REGISTER
if (m.message && m.text && !isUser && !isGroup) {
    pendaftar.push(sender)
    fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
}

//ONLYGC
const onlygc = () => {
  Shannz.sendMessage(m.chat, {
    text: `_ʜᴀʟᴏ ${pushname}, *xʙᴏᴛ-ɴᴇxᴛ ᴠᴇʀꜱɪᴏɴ* ʜᴀɴʏᴀ ʙɪꜱᴀ ᴅɪɢᴜɴᴀᴋᴀɴ ᴅɪ ᴅᴀʟᴀᴍ ɢʀᴏᴜᴘ ꜱᴀᴊᴀ, ᴊɪᴋᴀ ɪɴɢɪɴ ᴍᴇɴɢɢᴜɴᴀᴋᴀɴɴʏᴀ ᴅɪ ᴘʀɪᴠᴀᴛ ᴄʜᴀᴛ ᴘᴇʀᴛɪᴍʙᴀɴɢᴋᴀɴ ᴜɴᴛᴜᴋ ᴍᴇᴍʙᴇʟɪ ʜᴀᴋ ᴀᴋꜱᴇꜱ ᴘʀᴇᴍɪᴜᴍ ᴀᴛᴀᴜ ᴍᴇᴍʙᴇʟɪ ꜱᴄʀɪᴘᴛ ɴʏᴀ_`,
    contextInfo: {
      externalAdReply: {
        showAdAttribution: true, 
        title: `AKSES DILARANG 🚫`,
        body: "Only In Group Chat",
        thumbnailUrl: "https://endpoint.web.id/server/file/Zy853r7VXWBRHTnM.jpg",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  })
}

//NYALAKAN INI JIKA INGIN ONLYGC
/*if (order) {
  if (!isOwner && !m.isGroup && !m.isChanel) return onlygc();
}*/

//CMD
if (m.message) {
  if (isCmd && !m.isGroup) {
    console.log(chalk.white(`===================================================
    📆 DATE: ${new Date().toLocaleString()}
    💭 PESAN : ${m.body || m.mtype}
    👤️ DARI : ${pushname}
    🔖 USER JID : ${m.sender}`));
  } else if (isCmd && m.isGroup) {
    console.log(chalk.white(`===================================================
    📆 DATE: ${new Date().toLocaleString()}
    💭 PESAN : ${m.body || m.mtype}
    👤 DARI : ${pushname}
    🔖 USER JID : ${m.sender}
    💡 LOKASI : ${Shannz.groupName}`));
  }
}

//CONFIG ANTILINK
let antilinkStatus = false;
const saveAntilinkStatus = () => {
    fs.writeFileSync('./database/antilink.json', JSON.stringify({ status: antilinkStatus }));
};
const loadAntilinkStatus = () => {
    if (fs.existsSync('./database/antilink.json')) {
        const data = JSON.parse(fs.readFileSync('./database/antilink.json'));
        antilinkStatus = data.status;
    }
};
loadAntilinkStatus();

//COMMAND 
    switch(order) {    
  case prefix + 'menu': case prefix + 'menuall': case prefix + 'allmenu': {    
      Shannz.sendMessage(m.chat, {
        document: fs.readFileSync('./img.jpg'), 
        fileName: 'ʙᴇɴᴇᴅᴇᴛᴛᴀ - ᴍᴅ',
        mimetype: 'image/jpeg',
        caption: 'ꜱᴇʟᴀᴍᴀᴛ ᴅᴀᴛᴀɴɢ ᴅɪ ʙᴇɴᴇᴅᴇᴛᴛᴀ-ᴍᴅ, ꜱᴇʙᴜᴀʜ ʙᴏᴛ ᴡʜᴀᴛꜱᴀᴘᴘ ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ ʏᴀɴɢ ᴄᴀɴɢɢɪʜ ᴅᴀɴ ᴍᴏᴅᴇʀɴ, ꜱɪʟᴀʜᴋᴀɴ ᴍᴇʟᴀɴᴊᴜᴛᴋᴀɴ ᴅᴇɴɢᴀɴ ᴍᴇᴍɪʟɪʜ ᴏᴘꜱɪ ᴅɪ ʙᴀᴡᴀʜ ɪɴɪ',
        contextInfo: {
            externalAdReply: {
                title: '𝔹𝔼ℕ𝔼𝔻𝔼𝕋𝕋𝔸-𝕄𝔻',
                body: time,
                thumbnailUrl: 'https://files.catbox.moe/e1phx0.jpg',
                mediaType: 1,
                renderLargerThumbnail: true 
            }
        },
        footer: '@ ᴘᴏᴡᴇʀᴇᴅ ʙʏ SʜᴀɴɴMᴏᴅᴇʀᴢ',
        buttons: [
            {
                buttonId: ".listmenu",    
                buttonText: { 
                    displayText: 'List Feature' 
                }
            },
            {
                buttonId: ".owner",    
                buttonText: { 
                    displayText: 'Creator' 
                }
            }
        ],
        viewOnce: true,
        headerType: 6,
      }, { quoted: m, ephemeralExpiration: 86400 });
  }
  break
  
  case prefix + 'listmenu': {
    let { menu } = require('../lib/menu.js')
    let menunya = menu(isPremium, time, sender, prefix, pushname);
    Shannz.sendMessage(m.chat, {
      video: { url: 'https://files.catbox.moe/tj5ebw.mp4' },
      caption: menunya,
      gifPlayback: true,
      footer: '@ ᴘᴏᴡᴇʀᴇᴅ ʙʏ SʜᴀɴɴMᴏᴅᴇʀᴢ'
    }, { quoted: m });
  }
  break
  
  case prefix + 'addcase': {
  if (!isOwner) return m.reply(mess.owner)
  if (!text) return m.reply(`*PERMINTAAN ERROR!! CONTOH :*\n> .addcase case \'test\': {\n> m.reply('hello world')\n> }\n> break`)

  const fileName = 'message/msg.js';
  const newCase = `${text}`;
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      console.error('*ERROR SAAT MEMBACA FILE*', err);
      return;
    }
    const posisiAwal = data.indexOf("case prefix + ['addcase']:");
    if (posisiAwal !== -1) {
      const kodeBaru = data.slice(0, posisiAwal) + '\n' + newCase + '\n' + data.slice(posisiAwal);
      fs.writeFile(fileName, kodeBaru, 'utf8', (err) => {
        if (err) {
          m.reply('*TERJADI KESALAHAN SAAT MENULIS CASE* :', err);
        } else {
          m.reply('*CASE SUKSES DITAMBAHKAN*');
    }});
    } else {
        m.reply('*CASE ADDCASE TIDAK DITEMUKAN');
    }});
}
break

case prefix + 'gc': case prefix + 'getcase':
 const getCase = (cases) => {
 const caseWithPrefix = `case prefix + '${cases}'`;
 const caseWithArray = `case prefix + ['${cases}']`;
 const caseContent = fs.readFileSync("./message/msg.js").toString();
 let caseFound = caseContent.split(caseWithPrefix)[1] || caseContent.split(caseWithArray)[1];
 
 if (caseFound) {
 return "case" + caseFound.split("break")[0] + "break";
 } else {
 return null;
 }
 };

 try {
 if (!isOwner) return m.reply(mess.owner);
 if (!q) return m.reply(`*PERMINTAAN ERROR!! CONTOH :*\\n> *.gc namacase*`);
 
 let getc = await getCase(q);
 if (getc) {
 m.reply(getc);
 } else {
 m.reply(`*CASE ${q} TIDAK DITEMUKAN!!*`);
 }
 } catch (err) {
 console.log(err);
 m.reply(`*ERROR: ${err.message}*`);
 }
break

case prefix + 'afk':
if (!m.isGroup) return m.reply('khusus di group')
if (isAfkOn) return m.reply('*Afk sudah diaktifkan sebelumnya*')
let reason = text ? text : 'tidak ada.'
afk.addAfkUser(m.sender, Date.now(), reason, _afk)
Shannz.sendTextWithMentions(m.chat, `*[ 📢 USER AFK 📢 ]*
 
 👤 *User* : ${pushname}
 💡 *Alasan* : ${reason}`)
      break
    
    case prefix + 'antilink':
        if (!text) return m.reply('contoh: antilink on/off untuk menyalakan dan mematikan antilink');
        
        if (text.toLowerCase() === 'on') {
            antilinkStatus = true;
            saveAntilinkStatus();
            m.reply('Fitur antilink telah diaktifkan.');
        } else if (text.toLowerCase() === 'off') {
            antilinkStatus = false;
            saveAntilinkStatus();
            m.reply('Fitur antilink telah dimatikan.');
        } else {
            m.reply('Perintah tidak dikenali. Gunakan "on" atau "off".');
        }
        break
        
        case prefix + ['public'] :{
         if(!isOwner) return
           SETTING['banchats'] = false
          m.reply(keywords[0]['mode'][0])
         }
      break

case prefix + ['self'] :{
         if(!isOwner) return
             SETTING['banchats'] = true
          m.reply(keywords[0]['mode'][1])
        }
      break
      
       case prefix + 'delsesi': {
  if (!isOwner) return
  fs.readdir("./session", async function (err, files) {
  if (err) {
    console.log('Unable to scan directory: ' + err);
    return m.reply('PERMINTAAN ERROR!! PESAN :*\n> *folder tidak ditemukan*' + err);
  } 
  let filteredArray = await files.filter(item => item.startsWith("pre-key") || item.startsWith("sender-key") || item.startsWith("session-") || item.startsWith("app-state"))
  console.log(filteredArray.length); 
  let teks =`Terdeteksi *${filteredArray.length}* file sampah\n\n`
  if (filteredArray.length == 0) return m.reply(`${teks}`)
  filteredArray.map(function(e, i){
    teks += (i+1)+`. ${e}\n`
  })     
  m.reply(`${teks}`) 
  await sleep(2000)
  wett()
  await filteredArray.forEach(function (file) {
    fs.unlinkSync(`./session/${file}`)
  });
  await sleep(2000)
  m.reply("*PERMINTAAN BERHASIL!! PESAN :*\n> *sukses menghapus semua sampah, efek kena session*")     
  });
}
break

case prefix + 'kick': {
  if (!m.isGroup) return m.reply(mess.group)
  if (!isBotGroupAdmins) return m.reply(mess.botAdmin)
  if (!isGroupAdmins) return m.reply(mess.admin)
  if (!text) return m.reply('tag user dengan caption .kick');
  let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
  await Shannz.groupParticipantsUpdate(from, [users], 'remove')
}
break

case prefix + 'hidetag':
if (!isGroup) return m.reply(mess.only.group)
if (!isGroupAdmins && !isOwner) return m.reply(mess.only.admin)
let mem = [];
Shannz.groupMembers.map( i => mem.push(i.id) )
Shannz.sendMessage(from, { text: q ? q : '', mentions: mem })
break

case prefix + 'group' : { 
     	if (!isGroup) return m.reply('Khusus gc')
     	if (!isBotGroupAdmins) return reply('Bot ga admin')
     	if (!isGroupAdmins) return reply('Anda bukan admin')
     	if (q.toLowerCase() === "close") {
     		await Shannz.groupSettingUpdate(from, 'announcement').then((res) => m.reply(`Sukses Menutup Group`)).catch((err) => m.reply(jsonformat(err)))
         } else if (q.toLowerCase() === "open") {
         	 await Shannz.groupSettingUpdate(from, 'not_announcement').then((res) => m.reply(`Sukses Membuka Group`)).catch((err) => m.reply(jsonformat(err)))
          } else {	
          	 m.reply('masukan *group close* untuk menutup group dan *group open* untuk membuka group')
          }   
      }      
      break
      
      case prefix + 'get': {
 if (!text) return m.reply(`masukkan url nya`);
 try {
 const gt = await axios.get(text, {
 headers: {
 "Access-Control-Allow-Origin": "*",
 "Referer": "https://www.google.com/",
 "Referrer-Policy": "strict-origin-when-cross-origin",
 "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
 },
 responseType: 'arraybuffer' });
 const contentType = gt.headers['content-type'];
 if (/json/i.test(contentType)) {
 const jsonData = JSON.parse(Buffer.from(gt.data, 'binary').toString('utf8'));
 return m.reply(JSON.stringify(jsonData, null, 2));
 } else if (/text/i.test(contentType)) {
 const textData = Buffer.from(gt.data, 'binary').toString('utf8');
 return m.reply(textData);
 } else if (text.includes('webp')) {
 return Shannz.sendStickerImg(m.chat, text, m, { packname: global.packname, author: global.author })
 } else if (/image/i.test(contentType)) { return Shannz.sendMessage(m.chat, { image: { url: text }}, { quoted: m });
 } else if (/video/i.test(contentType)) { return Shannz.sendMessage(m.chat, { video: { url: text }}, { quoted: m });
 } else if (/audio/i.test(contentType) || text.includes(".mp3")) {
 return Shannz.sendMessage(m.chat, { audio: { url: text }}, { quoted: m });
 } else if (/application\/zip/i.test(contentType) || /application\/x-zip-compressed/i.test(contentType)) {
 return Shannz.sendFile(m.chat, text, '', text, m)			
 } else if (/application\/pdf/i.test(contentType)) {
 return Shannz.sendFile(m.chat, text, '', text, m)
 } else {
 return m.reply(`MIME : ${contentType}\n\n${gt.data}`);
 }
 } catch (error) {
 return m.reply(`Terjadi kesalahan saat mengakses URL: ${error.message}`);
 }
}
break
  
  case prefix + 'felo': {
    if (!text) return m.reply('i\'m felo, real-time AI, what do you want to ask?');
    try {
        const response = await fetch(`https://shannz-myapi.hf.space/ai/felo?question=${encodeURIComponent(text)}`);
        const data = await response.json();

        if (data.status) {
            const answer = data.result.answer;
            const sources = data.result.source;

            let message = `${answer}\n\nSumber:\n`;
            sources.forEach(source => {
                message += `* [${source.title}](${source.link})\n`;
            });
            m.reply(message);
        }
    } catch (error) {
        console.error(error);
        m.reply('Terjadi kesalahan saat mengambil data. Silakan coba lagi nanti.');
    }
}
break

  default:
 }

if (antilinkStatus) {
let gc = `https://`
if (chatmessage.includes(gc)) {
    m.reply('*sebuah link terdeteksi maaf kamu harus di kick ⛔*');
    let gclink = (`https://chat.whatsapp.com/` + await Shannz.groupInviteCode(m.chat))
    let isLinkThisGc = new RegExp(gclink, 'i')
    let isgclink = isLinkThisGc.test(m.text)
    if (isgclink) return m.reply(`Ohh, Link Group Ini Ternyata`)
    if (!isBotGroupAdmins) return m.reply(`Duhh bot bukan admin`)
    if (isGroupAdmins) return m.reply(`Ternyata kamu admin, maaf min`)
    if (isOwner) return m.reply(`Ternyata kamu owner, maaf king`)
    Shannz.sendMessage(m.chat, {
               delete: {
                  remoteJid: m.chat,
                  fromMe: false,
                  id: m.key.id,
                  participant: m.key.participant
               }
            })
    Shannz.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
}
}

}

let file = require.resolve(__filename)
 fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log('===================================================');
	console.log(chalk.red(`    New ${__filename}`))
	delete require.cache[file]
	require(file)
})