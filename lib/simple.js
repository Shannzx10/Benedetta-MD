 const { getContentType, generateForwardMessageContent, downloadContentFromMessage, prepareWAMessageMedia, generateWAMessage, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys')
 const { exec } = require("child_process")
 const fs = require('fs')
 const jimp = require('jimp')
 const chalk = require('chalk')
 const axios = require('axios')
 const FileType = require('file-type')
 const { color, getRandom, pickRandom, getBuffer } = require('./function.js')
 const moment = require("moment-timezone")
 const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
  const sleep = async (ms) => {
       return new Promise(resolve => setTimeout(resolve, ms))
   }
 exports.move = (Shannz, m, store) => {
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//
 let morph = m
 const from = morph.key.remoteJid
 if (!m) return m
 if (morph.key) {
 
        ID = m.key.id

        m.isBaileys = ID.startsWith('BAE5') && ID.length === 16
               
        m.sender = Shannz.decodeJid(m.Me && Shannz.user.id || m.participant || m.key.participant || m.key.remoteJid || '')
        
    }
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//    
 if (m.message) { 
   m.msgType = Object.keys (m.message)[0]
   m.xtype = getContentType(m.message)
   m.isMedia = (m.xtype === 'imageMessage' || m.xtype === 'videoMessage')

   m.content = JSON.stringify(m.message)


   m.isQuotedImage = m.xtype === 'extendedTextMessage' && m.content.includes('imageMessage')


   m.isQuotedVideo = m.xtype === 'extendedTextMessage' && m.content.includes('videoMessage')


   m.isQuotedAudio = m.xtype === 'extendedTextMessage' && m.content.includes('audioMessage')


   m.isQuotedSticker = m.xtype === 'extendedTextMessage' && m.content.includes('stickerMessage')


   m.isQuotedLocation = m.xtype === 'extendedTextMessage' && m.content.includes('locationMessage')        
   m.m = (m.xtype == 'viewOnceMessage' ? m.message[m.xtype].message[getContentType(m.message[m.xtype].message)] : m.message[m.xtype])
   if (m.m) { 
   let quoted = m.quoted = m.m.contextInfo ? m.m.contextInfo.quotedMessage : null  
   if (m.quoted) {
   let type = getContentType(quoted)


   if (['productMessage'].includes(type)) {


     type = getContentType(m.quoted)


    	 m.quoted = m.quoted[type]


	}


   if (typeof m.quoted === 'string') m.quoted = {


	text: m.quoted


	}
	try{
	    const context = m.message[m.xtype].contextInfo.quotedMessage


        if(context["ephemeralMessage"]){


            m.quotedMsg = context.ephemeralMessage.message


        }else{


            m.quotedMsg = context


        }


        m.isQuotedMsg = true


        m.quotedMsg.sender = m.message[m.xtype].contextInfo.participant


        m.quotedMsg.fromMe = m.quotedMsg.sender === conn.user.id.split(':')[0]+'@s.whatsapp.net' ? true : false


        m.quotedMsg.type = Object.keys(m.quotedMsg)[0]


        let ane = m.quotedMsg


        m.quotedMsg.chats = (ane.type === 'conversation' && ane.conversation) ? ane.conversation : (ane.type == 'imageMessage') && ane.imageMessage.caption ? ane.imageMessage.caption : (ane.type == 'documentMessage') && ane.documentMessage.caption ? ane.documentMessage.caption : (ane.type == 'videoMessage') && ane.videoMessage.caption ? ane.videoMessage.caption : (ane.type == 'extendedTextMessage') && ane.extendedTextMessage.text ? ane.extendedTextMessage.text : (ane.type == 'buttonsMessage') && ane.buttonsMessage.contentText ? ane.buttonsMessage.contentText : ""


        m.quotedMsg.id = m.message[m.xtype].contextInfo.stanzaId


    }catch{


        m.quotedMsg = null


        m.isQuotedMsg = false


    }
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//    
    m.quoted.id = m.m.contextInfo.stanzaId


    m.quoted.chat = m.m.contextInfo.remoteJid || m.chat


    m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false


    m.quoted.sender = Shannz.decodeJid(m.m.contextInfo.participant)


    m.quoted.fromMe = m.quoted.sender === (Shannz.user && Shannz.user.id)


    m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''


    m.quoted.mentionedJid = m.m.contextInfo ? m.m.contextInfo.mentionedJid : []
    
    
    }  
   }   
  }
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//  
  m.getGroupMembers = function(participants){
   let adminz = []


	for (let i of participants) {


		i.id !== null ? adminz.push(i.id) : ''


   }
  return adminz
}
  m.getGroupAdmins = function(participants){


    let admins = []


	for (let i of participants) {


		i.admin !== null ? admins.push(i.id) : ''


	}


	return admins


}
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*// 
  m.reply = async (teks) => {


    Shannz.sendMessage(from, 


        { text: teks, mentions: [m.sender] },


        { quoted : m }) 



        }
        
     const downloadMediaMessage = async (message) => {

        let mime = (message.m || message).mimetype || ''

        let messageType = mime.split('/')[0].replace('application', 'document') ? mime.split('/')[0].replace('application', 'document') : mime.split('/')[0]

        let extension = mime.split('/')[1]

        const stream = await downloadContentFromMessage(message, messageType)

        let buffer = Buffer.from([])

        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
	}
        
	return buffer
}
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//
 Shannz.deleteAll = async(idMsg, toDel) => {
 Shannz.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: idMsg, participant: toDel }})
 .catch((err) => {
        console.log(err)
        m.reply('Error!')
  })
 }
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//
 Shannz.copyMSGForward = async (ID, messg, forceForward = false, options = {}) => {
    let zType
     if (options.readViewOnce) {
       messg.message = messg.message && messg.message.ephemeralMessage && messg.message.ephemeralMessage.message ? messg.message.ephemeralMessage.message : (messg.message || undefined)
       zType = Object.keys(messg.message.viewOnceMessage.message)[0]
        delete(messg.message && messg.message.ignore ? messg.message.ignore : (messg.message || undefined))
        delete messg.message.viewOnceMessage.message[zType].viewOnce
        messg.message = {
           ...messg.message.viewOnceMessage.message
         }
      }
    let vType = Object.keys(messg.message)[0]
    let content = await generateForwardMessageContent(messg, forceForward)
    let xType = Object.keys(content)[0]
    let context = {}
    if (vType != "conversation") context = messg.message[vType].contextInfo
        content[xType].contextInfo = {
         ...context,
         ...content[xType].contextInfo
       }
    const WAMessaGE = await generateWAMessageFromContent(ID, content, options ? {
     ...content[xType],
     ...options,
     ...(options.contextInfo ? {
         contextInfo: {
           ...content[xType].contextInfo,
           ...options.contextInfo
          }
       } : {})
     } : {})
   await Shannz.relayMessage(ID, WAMessaGE.message, { messageId:  WAMessaGE.key.id })
   return WAMessaGE
  }
  
  Shannz.sendTextWithMentions = async (jid, text, quoted, options = {}) => Shannz.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') } }, { quoted })

Shannz.downloadMediaMessage = async (message) => {
        let mime = (message.m || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
	}
        
	return buffer
     } 
     
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//
 Shannz.DeleteMessage = async(mes, botNumber) => {
    mekh = mes.length
    pesan_ke = 0 
    async function me(){
     
      if(mekh == pesan_ke) return    
      await sleep(1000)       
        Shannz.sendMessage(from, { delete: { remoteJid: from, fromMe: true, id: mes[pesan_ke], participant: botNumber } })   
        pesan_ke += 1
        me()
      }
     me()
   }
   Shannz.Delete = async (KEY, botNumber) => {
   await Shannz.sendMessage(from, { delete: { remoteJid: from, fromMe: true, id: KEY, participant: botNumber } })
   }
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//
   
    Shannz.sendButtonImage = async(ID, coma, TXT, optsimg, caption, footer, quoted) => {
             let buttons = [
                {  buttonId: `${coma}`,
                  buttonText: {  displayText: TXT
                }, type: 1},
               ]
              let buttonMessage = {
                 image: optsimg,
                 caption: caption,
                 footer: footer,
                 buttons: buttons,
                 headerType: 4
               }
               await Shannz.sendMessage(from, buttonMessage, quoted)
    }
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//
 m.createMsg = async (
    jidnya, 
    kontennya, 
    optionnya
 ) =>    
   {
   return await generateWAMessage(
    jidnya, 
    kontennya, 
   {
    ...optionnya,
    userJid: Shannz.authState.creds.me.id,
    upload: Shannz.waUploadToServer
    }
   )
  }  
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//            
 m.sendButton = async (id, text1, text2, button, desc1, yo) => {
 var templates = await generateWAMessageFromContent(id, {
    "templateMessage": {
      "hydratedTemplate": {
        ...yo.message,
        "hydratedContentText": text1,
        "hydratedFooterText": text2, 
        "hydratedButtons": button
      }
    }
  }, {})
  Shannz.relayMessage(id, templates.message, { messageId: templates.key.id })
  }
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//
  const times = moment().tz('Asia/Jakarta').format('HH:mm:ss')


  if(times < "23:59:00"){


    m.sayingtime         = 'Good night'


    m.timoji = '🌃'}


  if(times < "19:00:00"){


    m.sayingtime         = 'Good afternoon'


    m.timoji = '🌆'}
  if(times < "18:00:00"){


    m.sayingtime         = 'Good afternoon'


    m.timoji = '🌇'}


  if(times < "15:00:00"){


    m.sayingtime         = 'Good afternoon'
    m.timoji = '🌞'}
  if(times < "11:00:00"){


    m.sayingtime         = 'Good morning'


    m.timoji = '🌅'}


  if(times < "05:00:00"){


    m.sayingtime         = 'Good night'


    m.timoji = '🌃' }  

    m.tanggal10 = new Date('1 Jan 2023 00:00:00').getTime();
    m.sekarang1 = new Date().getTime();


    m.selisih = m.tanggal10 - m.sekarang1;


    m.harinye = Math.floor(m.selisih / (1000 * 60 * 60 * 24));


    m.jamnye = Math.floor(m.selisih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));


    m.menitnye = Math.floor(m.selisih % (1000 * 60 * 60) / (1000 * 60));


    m.detiknye = Math.floor(m.selisih % (1000 * 60) / (1000));
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//    
    
 
  Shannz.poll = async (Name, optionsName, options) => {
    var pollCreation = generateWAMessageFromContent(from, proto.Message.fromObject({
            "pollCreationMessage": {
              "name": Name, 
               "options": optionsName,
              "selectableOptionsCount": 5
            }
          }), options)
            Shannz.relayMessage(from, pollCreation.message, { messageId: pollCreation.key.id })
   }
  m.templateButon5IMG = async (jid , text = '' , footer = '', img, button = [], options = {}) => {
        let message = await prepareWAMessageMedia({ 
                       image: img 
                      }, { 
                       upload: 
                       Shannz.waUploadToServer 
                      })
        let template = generateWAMessageFromContent(jid, proto.Message.fromObject({
         templateMessage: {
         hydratedTemplate: {
         imageMessage: message.imageMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": button
              }
             }
           }), 
          options

        )
        Shannz.relayMessage(jid, template.message, { messageId: template.key.id })
      }   
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//      
      
      Shannz.typeMediaUrl = async (url) => {
         let mime = '';
         let res = await axios.head(url)
          mime = res.headers['content-type']
          console.log(mime)
          if (mime.split("/")[1] === "gif") { return `video` 
          }
          if(mime === "application/pdf"){ return `document`
          }
          if(mime.split("/")[0] === "image"){ return `image`
          }
          if(mime.split("/")[0] === "video"){ return `video`
          }
          if(mime.split("/")[0] === "audio"){ return `audio`
          }           
        }
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//             
  
                     Shannz.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
                         let quoted = message.m ? message.m : message
                         let mime = (message.m || message).mimetype || ''
                         let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
                          const stream = await downloadContentFromMessage(quoted, messageType)
                              let buffer = Buffer.from([])
                                  for await(const chunk of stream) {
                                        buffer = Buffer.concat([buffer, chunk])
                                   }
                             let type = await FileType.fromBuffer(buffer)
                                 trueFileName = attachExtension ? (filename + '.' + type.ext) : filename    
                            await fs.writeFileSync(trueFileName, buffer)
                          return trueFileName
                      }
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//
                    
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//                   
                       Shannz.generateProfilePicture = async (buffer) => {
                             const jimpread = await jimp.read(buffer);
                             const result = jimpread.getWidth() > jimpread.getHeight() ? jimpread.resize(550, jimp.AUTO) : jimpread.resize(jimp.AUTO, 650)
                             let jump = await jimp.read(await result.getBufferAsync(jimp.MIME_JPEG));
                              return {
                                 bufferzzz: await result.getBufferAsync(jimp.MIME_JPEG)
                               }
                       }
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//                                          
                      Shannz.parseMention = async(text) => {
                            return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
                      }
 //*------------------------------------------------------------------------------------------------------------------------------------------------------------------*//                                         
                      Shannz.sendButtonMessage = async(ID, buttonId, displaytext, text, footer, options) => {
                       let buttons = [{  buttonId: buttonId, buttonText: { displayText: displaytext }, type: 1}]
                       let buttonMessage = {text: text,footer: footer,buttons: buttons,headerType: 4 }
                        Shannz.sendMessage(ID, buttonMessage, options)
                    }
                    
   Shannz.sendListMsg = (jid, text = '', footer = '', title = '' , butText = '', sects = [], quoted) => {
        let sections = sects
        var listMes = {
        text: text,
        footer: footer,
        title: title,
        buttonText: butText,
        sections
        }
        Shannz.sendMessage(jid, listMes, { quoted: quoted })
        }                  
      
  }

//detect
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.yellow(`New ${__filename}`))
	delete require.cache[file]
	require(file)
})
