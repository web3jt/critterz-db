const cp = require('child_process')
const fs = require("fs");
const child = cp.spawn('node', ['./child.js'], {stdio: [null, null, null, 'ipc']})
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



const fn = function (data) {
    tokenIds.push(data.tokenId)
    // console.log(data.tokenId, data.owner)

    if (data.owner) {
        if (exist(data.owner)) {
            holders[data.owner].push(data.tokenId)
        } else {
            holders[data.owner] = [data.tokenId]
        }
    }

    // END
    if (tokenIds.length === TOTAL_SUPPLY) {
        // console.log(holders)

        fs.writeFile('./dist/data.json', JSON.stringify(holders), function (err) {
            if (err) {
                console.error(err)
            }

            console.log('saved.')
            process.exit()
        })
    }
}

child.on('message', fn)

for (let i = 0; i < TOTAL_SUPPLY; i++) {
    child.send(i)
}
