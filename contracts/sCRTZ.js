const Web3 = require('web3')
const web3 = new Web3('https://eth.people.art/')
const Contract = web3.eth.Contract

const contract = new Contract(require('./sCRTZ.abi.json'), '0x47f75E8dD28dF8d6E7c39ccda47026b0DCa99043')

const ownerOf = async function (id) {
    try {
        return await contract.methods.ownerOf(id).call()
    } catch (e) {
        if (e.message === 'Returned error: execution reverted: ERC721: owner query for nonexistent token') {
            return undefined
        }
        console.log(e.message)
    }
}

module.exports = {
    ownerOf: ownerOf,
}
