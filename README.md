install these first

npm install request

npm i @binance-chain/javascript-sdk


Usage

node .\dexBuyBot.js {keystore_file} {password} {wallet address} {Market symbol} {price} {amount} {sell price} loop (loop is optional. Without it it will buy once)

example(single buy)

node .\dexBuyBot.js keystore1.dex kasdh... bnb1ul9f2x5lruj53jl... LTO 0.0004 10 0.004

example(loop)

node .\dexBuyBot.js keystore1.dex kasdh... bnb1ul9f2x5lruj53jl... LTO 0.0004 10 0.004 loop
