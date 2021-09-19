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

let priceActionList = ["price-BTC", "price-ETH", "price-BCH", "price-LTC"];
bot.action(priceActionList, async ctx => {

    let symbol = ctx.match.input.split('-')[1];

    try {

        let res = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${apiKey} `)

        let data = res.data.DISPLAY[symbol].USD;
        console.log(data);

        let message = 
        `
Symbol:  ${symbol}
Price:  ${data.PRICE}
Open:  ${data.OPENDAY}
High:  ${data.HIGHDAY}
Low:  ${data.LOWDAY}
Supply:  ${data.SUPPLY}
Market Cap:  ${data.MKTCAP}
`;

        ctx.deleteMessage();
        bot.telegram.sendMessage(ctx.chat.id, message, 
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        {text: "Back to Prices", callback_data: "price"}
                    ]
                ]
    
            }
        });

    } catch (err) {
        ctx.reply("Error Encountered");
        console.log(err.message);
    }
    //https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=IND
});

bot.launch();