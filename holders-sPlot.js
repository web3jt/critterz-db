const cp = require('child_process')
const fs = require("fs");
const child = cp.spawn('node', ['./sPlot.js'], {stdio: [null, null, null, 'ipc']})

let tokenIds = []
let holders = {}

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
    // console.log(data.tokenId, data.owner)


    if (data.owner) {
        touch(data.owner)
        holders[data.owner]['sPlot'].push(data.tokenId)
    }

    // END
    if (tokenIds.length === 22500) {
        // console.log(holders)

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

for (let i = 12550; i <= 49800; i = i + 250) {
    for (let j = 0; j < 150; j++) {
        const tokenId = i + j
        console.log(i, j, tokenId)
        child.send(tokenId)
    }
}

// buJePqcqJPuzVpti