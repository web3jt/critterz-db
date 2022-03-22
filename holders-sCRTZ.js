const cp = require('child_process')
const fs = require("fs");
const child = cp.spawn('node', ['./sCRTZ.js'], {stdio: [null, null, null, 'ipc']})
const TOTAL_SUPPLY = 4096

let tokenIds = []
let holders = {}

const exist = function (account) {
    for (const key in holders) {
        if (account === key) {
            return true
        }
    }

    return false
}

const touch = function (account) {
    for (const key in holders) {
        if (account === key) {
            return
        }
    }

    holders[account] = {
        sCRTZ: [],
        sPlot: [],
    }
}



const fn = function (data) {
    tokenIds.push(data.tokenId)
    console.log(tokenIds.length, data.tokenId, data.owner)

    if (data.owner) {
        touch(data.owner)
        holders[data.owner]['sCRTZ'].push(data.tokenId)
    }

    // END
    if (tokenIds.length === TOTAL_SUPPLY) {
        console.log(holders)

        fs.writeFile('./dist/holders.json', JSON.stringify(holders), function (err) {
            if (err) {
                console.error(err)
            }

            console.log('saved.')
            process.exit()
        })
    }
}

child.on('message', fn)

for (let i = 1; i <= TOTAL_SUPPLY; i++) {
    child.send(i)
}
