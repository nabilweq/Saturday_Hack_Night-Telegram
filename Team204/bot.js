const { Telegraf }  = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('2022897128:AAEt7h3d5aFPsxOFqngIHdu9s_XTJmBaUqc');

const apiKey = "23b257f41671a665998ba5b0113df7475c2af77db22d19f491311a2881c937c3"

bot.command('start', ctx => {
    var startMessage = "Welcome, this bot gives you crypto currency information";
    bot.telegram.sendMessage(ctx.chat.id, startMessage,
    {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Crypto Prices", callback_data: "price"}
                ],
                [
                    {text: "CoinMarketcap", url: "https://www.cryptocompare.com/"}
                ]
            ]
        }
    });
});

bot.launch();