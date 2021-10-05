const TelegramApi = require('node-telegram-bot-api')
const { gameOptions, againOptions } = require('./options.js')
const token = '2041756917:AAGiqdoQtcp13QU-41rnWSIExKNsBCol1lg'

const bot = new TelegramApi(token, { polling: true })
bot.setMyCommands([
    { command: '/start', description: "Начальное приветсвие" },
    { command: '/info', description: "Получить инфлрмацию" },
    { command: '/help', description: "Помощь" },
    { command: '/game', description: 'Game in ugavaidddd' }
])

const chats = {}


const startGame = async(chatId) => {
    bot.sendMessage(chatId, "Я загадаю число 0-9, а ті угадай")
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Ugadai', gameOptions)


}
const start = () => {
    bot.on('message', msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/d06/e20/d06e2057-5c13-324d-b94f-9b5a0e64f2da/11.webp')
            return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот  `)

        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
        }


        if (text === '/help') {
            return bot.sendMessage(chatId, 'Это бот показывает начальние умения написаный на JS')
        }

        if (text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, "I not undestood")



    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `You enter number ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `You NOT enter number, bot number zagala ${chats[chatId]}`, againOptions)
        }

    })

}

start()