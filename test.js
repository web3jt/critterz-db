const sPlot = require('./contracts/sPlot')

const fn = async function (tokenId) {
    console.log(tokenId)

    return await sPlot.ownerOf(tokenId)
}

const main = async function () {
    console.log(await fn(1))
}

main()
