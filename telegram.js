const telegramBot = require('node-telegram-bot-api');
const token ="YOUR_BOT_TOKEN"
const bot = new telegramBot(token, {polling: true})
const fetch = require('isomorphic-unfetch')

bot.on('message', async(msg) =>{
    const chatId=msg.chat.id;
    const message = msg.text.trim().toLowerCase();
    switch(message){
        case 'haber':{
            bot.sendMessage(chatId,"yükleniyor...")
            const result= await getNews(1)
            Array.from(Array(5)).forEach((i,index)=>{
                bot.sendPhoto(chatId,result[index].urlToImage, {caption: `${result[index].title}\n${result[index].description}`})
            })
        }
        break;
        case 'photo':
            bot.sendPhoto(chatId,"https://ichef.bbci.co.uk/news/640/cpsprodpb/10189/production/_100092956_gettyimages-862701736.jpg")
            break;
        case 'video':
            bot.sendVideo(chatId,"https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4")
            break;
        case 'sticker':
            bot.sendSticker(chatId,"https://blog.jiayu.co/2019/07/telegram-animated-stickers/sticker.webp")
            break;
        default:
            bot.sendMessage(chatId,"Seçeneklerde yok")
            break;
    }
})

const getNews=(number)=>{
   return fetch("https://newsapi.org/v2/top-headlines?country=tr&apiKey=API_KEY")
    .then(response => response.json())
    .then(response=>{
       return response.articles
    })
}
