const sCRTZ = require('./contracts/sCRTZ')

const fn = async function (tokenId) {
    const owner = await sCRTZ.ownerOf(tokenId)
    process.send({
        tokenId: tokenId,
        owner: owner,
    })
}

process.on('message', fn)
