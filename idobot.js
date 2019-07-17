const BnbApiClient = require('@binance-chain/javascript-sdk');
const api = 'https://dex.binance.org/'; /// api string
const bnbClient = new BnbApiClient(api);
var os = require('os');
var fs = require('fs');
var line;

bnbClient.chooseNetwork("mainnet"); // or this can be "mainnet"

fs.readFile('./idobot.cfg', "utf8", function (cfgErr, cfgData) {
    if (cfgErr) {
        throw cfgErr;
    }
    line = cfgData.toString().split(os.EOL);

    fs.readFile(line[1], "utf8", function (err, data) {
        if (err) {
            throw err;
        }
        const privateKey = BnbApiClient.crypto.getPrivateKeyFromKeyStore(data, line[3]);
        bnbClient.setPrivateKey(privateKey);
        bnbClient.initChain();
        bnbClient.getBalance().then(result => console.log(result));
        setTimeout(trade, line[15], line[7], line[9],  line[11]);
    });
});


function trade(market, price, amt) {
    bnbClient.placeOrder(line[5], market, 1, price, amt).then(output => {
        console.log('success');
        console.log(output);
        setTimeout(sellOrder, line[15], market, price, amt);
    }

    ).catch((err) => {
        console.log('error');
        console.log(err);
        setTimeout(trade, line[15], market, price, amt);
    });
}

function sellOrder(market, price, amt) {
    bnbClient.placeOrder(line[5], market, 2, line[11], amt).then(output => {
        console.log(output);

    }).catch((err) => {
        console.log('error');
        console.log(err);
        setTimeout(sellOrder, line[15]);
    });;
}
