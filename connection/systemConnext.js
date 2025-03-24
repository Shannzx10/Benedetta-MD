const { loading } = require('./starting')
const CFonts = require('cfonts');
const { chalk, color, bgcolor, ConsoleLog, biocolor } = require('../lib/color')

const Connecting = async ({update, Shannz, Boom, DisconnectReason, sleep, operate}) => {

      const { connection, lastDisconnect } = update
      if (connection === 'connecting'){             
      }
                                  	             
       if (connection === 'close') {
         let messageconnect = new Boom(lastDisconnect?.error)?.output.statusCode
            if (messageconnect === DisconnectReason.badSession) { 
               console.log(`Sorry, it looks like the session file is disabled. Please re-scan�`)
               Shannz.logout();
               console.log('Mengkoneksikan ulang dalam 10 detik....')
               setTimeout( () => {
                 operate();
               }, 10000)
              } else if (messageconnect === DisconnectReason.connectionClosed) { 
               console.log("Connection lost, trying to reconnect�"); 
               operate(); 
              } else if (messageconnect === DisconnectReason.connectionReplaced) { 
               console.log("Another connection is replaced, please close this connection first");    
              process.exit(); 
              } else if (messageconnect === DisconnectReason.restartRequired) { 
               console.log("An error occurred, reconnecting�"); 
               setTimeout( () => {
                 operate();
               }, 10000)
              } else if (messageconnect === DisconnectReason.connectionLost) { 
               console.log("Connection lost from the web, trying to reconnect�"); 
               setTimeout( () => {
                 operate();
               }, 10000)             
              } else if (messageconnect === DisconnectReason.loggedOut) { 
              console.log(`Device is out, please re-scan�`);    
              process.exit();               
              } else if (messageconnect === DisconnectReason.timedOut) { 
               console.log("Connection reached the limit, please reload�"); 
               operate(); 
             } else Shannz.end(`Reason : ${messageconnect}|${connection}`)
        }  
       if (connection === 'open'){
          console.clear()
            CFonts.say('XBOT-NEXT', {
                font: 'simple',
                align: 'left',
                colors: ['white', 'red', 'yellow'],
                background: 'transparent',
                letterSpacing: 1,
                lineHeight: 2,
                space: true,
                maxLength: '0'
             });
             await sleep(3000)
            loading()
              await sleep(5500)
                CFonts.say('XBOT-NEXT', {
                    font: 'simple',
                    align: 'left',
                    colors: ['white', 'red', 'yellow'],
                    background: 'transparent',
                    letterSpacing: 1,
                    lineHeight: 2,
                    space: true,
                    maxLength: '0'
                });
                console.log(bgcolor('WhatsApp Bot Create By ShannModerz Multi Development', 'yellow'));
                console.log('connected ✔️') 
         }
   }
   
   module.exports = { Connecting }       
