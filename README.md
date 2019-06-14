Usage

node .\sauceBot.js {keystore_file} {password} {wallet address} {Market symbol} {price} {amount} loop (loop is optional. Without it it will buy once)

example(single buy)
node .\sauceBot.js keystore1.dex kasdh... bnb1ul9f2x5lruj53jl... LTO 0.0004 10

example(loop)
node .\sauceBot.js keystore1.dex kasdh... bnb1ul9f2x5lruj53jl... LTO 0.0004 10 loop
