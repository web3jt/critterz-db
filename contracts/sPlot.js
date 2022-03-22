const Web3 = require('web3')
const web3 = new Web3(process.env['WEB3_PROVIDER'])
const Contract = web3.eth.Contract

const contract = new Contract(require('./sPlot.abi.json'), '0xB81Cf242671eDAE57754B1a061F62Af08B32926A')

const ownerOf = async function (tokenId) {
    console.log(tokenId)

    try {
        return await contract.methods.ownerOf(tokenId).call()
    } catch (e) {
        if (e.message === 'Returned error: execution reverted: ERC721: owner query for nonexistent token') {
            return undefined
        } else {
            console.log('[ERR] #' + tokenId + ':', e.message)
            return await ownerOf(tokenId)
        }

    }
}

module.exports = {
    ownerOf: ownerOf,
}

// 12550 12699
// 12800 12949
// 13050 13199
