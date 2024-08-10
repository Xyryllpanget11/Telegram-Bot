const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const simsimi = require('simsimi');
dotenv.config();

const openaiChat = require('./content/chat');
const openaiChat_GPT4 = require('./content/chat_GPT4');
const openaiChatJailBreak = require('./content/chatJB');
const openaiImage = require('./content/image');

// Replace YOUR_TELEGRAM_BOT_TOKEN with the token you received from BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

// Set bot commands
bot.setMyCommands([
    { command: 'imgsearch', description: 'Get a sample image' },
    { command: 'ai', description: 'Chat with the bot' },
    { command: 'ai2', description: 'Chat with the GPT-4 bot' },
    { command: 'mist', description: 'Enter chat jailbreak mode (GPT-3.5)' },
  { command: 'sim', description: 'simisimi coming soon' },
]);


// Listen for any message
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(chatId);

    // Check if the message is a command
    if (msg.text.startsWith('/')) {
        handleCommand(msg);
    } else {
        bot.sendMessage(chatId, 'Use the command available', { reply_to_message_id: msg.message_id });
        if (msg.reply_to_message) {
            // console.log(msg.reply_to_message)
            // console.log(msg)
        }
    }
});

// Handle commands
async function handleCommand(msg) {
    const chatId = msg.chat.id;
    const commandParts = msg.text.split(' ');
    const command = commandParts[0].toLowerCase();

    // Get the text after the command (if any)
    const commandText = commandParts.slice(1).join(' ').trim();
    console.log("[From] " + chatId)
    console.log("[CommandText] " + commandText)
    if (commandText === "") {
        bot.sendMessage(chatId, 'Usage: ' + command + ' <text>\n\navailable cmds:\n-mist\n-ai\n-ai2\n-sim\n-imgsearch\n\nTelegram Bot made by XyryllPanget');
        return;
    }
    let response = ""
    let quotedMsg = "";

    if (msg.reply_to_message) {
        console.log(msg.reply_to_message)
        quotedMsg = msg.reply_to_message.text
    }


    switch (command) {
        case '/imgsearch':
            response = await openaiImage(commandText);
            if (response.includes("https://")) {
                bot.sendPhoto(chatId, response, {
                    caption: commandText,
                    reply_to_message_id: msg.message_id
                });
            } else {
                bot.sendMessage(chatId, response, { reply_to_message_id: msg.message_id });
            }
            break;
        case '/ai':
            response = await openaiChat(commandText, quotedMsg);
            bot.sendMessage(chatId, response, { reply_to_message_id: msg.message_id });
            break;
        case '/ai2':
            response = await openaiChat_GPT4(commandText, quotedMsg);
            bot.sendMessage(chatId, response, { reply_to_message_id: msg.message_id });
            break;
        case '/mist':
            response = await openaiChatJailBreak(commandText, quotedMsg);
            bot.sendMessage(chatId, response, { reply_to_message_id: msg.message_id });
            break;
            default:
                bot.sendMessage(chatId, 'Unknown command:\n\nAvailable commands:\n-Mist\n-Ai\n-Sim(coming soon)\n-ai2\n\n--------\nbtw Dont Forget to support my developer:\n Jhon Xyryll Samoy\nhttps://www.facebook.com/profile.php?id=100075778393362&mibextid=ZbWKwL' + command, { reply_to_message_id: msg.message_id });
        }
    console.log('[response] ' + response + "\n")
}
const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running!');
});
              
