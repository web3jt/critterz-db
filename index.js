const fs = require('fs')
const sCRTZ = require('./contracts/sCRTZ')


const TOTAL_SUPPLY = 4096

let index = {}

const exist = function (account) {
    for (const key in index) {
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
                index[account].push(i)
            } else {
                index[account] = [i]
            }
        }
    }

    fs.writeFile('./dist/data.json', JSON.stringify(index), function (err) {
        if (err) {
            console.error(err)
        }

        console.log('saved.')
    })
}

fetch()
