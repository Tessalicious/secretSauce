const BnbApiClient = require('@binance-chain/javascript-sdk');
const api = 'https://dex.binance.org/'; /// api string
const bnbClient = new BnbApiClient(api);
var os = require('os');
var fs = require('fs');
var request = require('request');

bnbClient.chooseNetwork("mainnet"); // or this can be "mainnet"

var args = process.argv.slice(2);
var bnbDexMarkets = new Map();

function initDexMarkets() {
    request.get('https://dex.binance.org/api/v1/markets', function (err, res, body) {
        if (err) {
            throw err;
        }
        if (body) {
            var parsed = JSON.parse(body);

            for (var i = 0; i < parsed.length; i++) {
                console.log(parsed[i].base_asset_symbol + ' ' + parsed[i].list_price);
                let symbols = parsed[i].base_asset_symbol.toString().split('-');
                bnbDexMarkets.set(symbols[0], parsed[i].base_asset_symbol);

            }
            console.log(bnbDexMarkets);
        }
    });
}

initDexMarkets();

fs.readFile(args[0], "utf8", function (err, data) {
    if (err) {
        throw err;
    }
    const privateKey = BnbApiClient.crypto.getPrivateKeyFromKeyStore(data, args[1]);
    bnbClient.setPrivateKey(privateKey);
    bnbClient.initChain();
    setTimeout(trade, 1000);

});

function trade() {
    bnbClient.getBalance().then(result => console.log(result));
    if (args[6] == 'loop') {
        setInterval(placeBuyOrder, 201);
    }
    else {
        placeBuyOrder();
    }
}

function placeBuyOrder() {
    bnbClient.placeOrder(args[2], bnbDexMarkets.get(args[3]) + '_BNB', 1, args[4], args[5]).then(result => {
        setTimeout(sellOrder,1100);
        console.log(result);
    });
}

function sellOrder(){
    bnbClient.placeOrder(args[2], bnbDexMarkets.get(args[3]) + '_BNB', 2, 10*args[4], args[5]).then(result => console.log(result));
    setTimeout(sellOrder,1000);
}
