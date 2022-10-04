const Collectible = artifacts.require('Collectible')

module.exports = async (deployer, network, [owner]) => {
    await deployer.deploy(
        Collectible,
        'WolfOfAVAX',
        'WOA',
        'ipfs://QmQMvv1h4QBv9DNydgmGG8BRiej79Xo2ACURVj62sQUUYf/',
        'ipfs://QmY1k4iWEkLMNequ1dzrxdnghPA2JTq4GLUNuerupwZH7a/hidden.json'
    )
}