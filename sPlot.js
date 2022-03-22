const sPlot = require('./contracts/sPlot')

const fn = async function (tokenId) {
    console.log(tokenId)

    const owner = await sPlot.ownerOf(tokenId)
    process.send({
        tokenId: tokenId,
        owner: owner,
    })
}

process.on('message', fn)
