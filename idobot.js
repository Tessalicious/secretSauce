const BnbApiClient = require('@binance-chain/javascript-sdk');
const api = 'https://dex.binance.org/'; /// api string
const bnbClient = new BnbApiClient(api);
var os = require('os');
var fs = require('fs');
var line;
var marketName;
var buyPrice;
var sellPrice;
var tradeAmt;
var delay;
var walletAddr;
bnbClient.chooseNetwork("mainnet"); // or this can be "mainnet"

fs.readFile('./idobot.cfg', "utf8", function (cfgErr, cfgData) {
    if (cfgErr) {
        throw cfgErr;
    }
    line = cfgData.toString().split(os.EOL);
    delay = line[15];
    marketName = line[7];
    buyPrice = line[9];
    sellPrice = line[13];
    tradeAmt = line[11];
    walletAddr = line[5];
    fs.readFile(line[1], "utf8", function (err, data) {
        if (err) {
            throw err;
        }
        const privateKey = BnbApiClient.crypto.getPrivateKeyFromKeyStore(data, line[3]);
        bnbClient.setPrivateKey(privateKey);
        bnbClient.initChain();
        bnbClient.getBalance().then(result => console.log(result));
        setTimeout(trade, delay);
    });
});


function trade() {
    bnbClient.placeOrder(walletAddr, marketName, 1, buyPrice, tradeAmt).then(output => {
        console.log('success');
        console.log(output);
        setTimeout(sellOrder, delay);
    }

    ).catch((err) => {
        console.log('error');
        console.log(err);
        setTimeout(trade, delay);
    });
}

function sellOrder() {
    bnbClient.placeOrder(walletAddr, marketName, 2, sellPrice, tradeAmt).then(output => {
        console.log(output);

    }).catch((err) => {
        console.log('error');
        console.log(err);
        setTimeout(sellOrder, delay);
    });;
}
