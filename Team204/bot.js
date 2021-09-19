const { Telegraf }  = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('2022897128:AAEt7h3d5aFPsxOFqngIHdu9s_XTJmBaUqc');

const apiKey = "23b257f41671a665998ba5b0113df7475c2af77db22d19f491311a2881c937c3"

bot.command('start', ctx => {
    sendStartMessage(ctx)
});

bot.action('start', ctx => {
    ctx.deleteMessage();
    sendStartMessage(ctx)
});

function sendStartMessage(ctx) {
    let startMessage = "Welcome, this bot gives you crypto currency information";
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
}

bot.action('price', ctx => {
    let priceMessage = "Get Price Information. Select one of the cryptocurrencies below";
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, priceMessage,
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: "BTC", callback_data: "price-BTC"},
                        {text: "ETH", callback_data: "price-ETH"},
                    ],
                    [
                        {text: "BCH", callback_data: "price-BCH"},
                        {text: "LTC", callback_data: "price-LTC"},
                    ],
                    [
                        {text: "Back to Menu", callback_data: "start"}
                    ]
                ]
            }
        });
});

bot.launch();