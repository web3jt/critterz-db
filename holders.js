const fs = require('fs')
const sCRTZ = require('./contracts/sCRTZ')


const TOTAL_SUPPLY = 4096

let holders = {}

const exist = function (account) {
    for (const key in holders) {
        if (account === key) {
            return true
        }
    }

    return false
}


const fetch = async function () {
    for (let i = 0; i < TOTAL_SUPPLY; i++) {
        const account = await sCRTZ.ownerOf(i)
        console.log(i, account)

        if (account) {
            if (exist(account)) {
                holders[account].push(i)
            } else {
                holders[account] = [i]
            }
        }
    }

    fs.writeFile('./dist/holders.json', JSON.stringify(holders), function (err) {
        if (err) {
            console.error(err)
        }

        console.log('saved.')
    })
}

fetch()
