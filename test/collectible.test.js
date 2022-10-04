const Collectible = artifacts.require('./Collectible')
const { expectRevert } = require('@openzeppelin/test-helpers')

contract('Collectible', ([contractDeployer, minter1, minter2, minter3]) => {
    let collectible;

    before(async () => {
        collectible = await Collectible.new(
            'WolfOfAVAX',
            'WOA',
            'ipfs://QmW1kaEUyTMFArgS9ZrRFwR59mmnVX3deqs23yZFm9NPv4/',
            'ipfs://QmY1k4iWEkLMNequ1dzrxdnghPA2JTq4GLUNuerupwZH7a/hidden.json',
            { from: contractDeployer }
        )
    });

    describe('Collectible deployment', async () => {
        it('Deploys the Collectible SC successfully.', async () => {
            console.log('Address is ', collectible.address)
            console.log('Deployer is ', contractDeployer);
            assert.notEqual(collectible.address, '', 'should not be empty');
            assert.notEqual(collectible.address, 0x0, 'should not be the 0x0 address');
            assert.notEqual(collectible.address, null, 'should not be null');
            assert.notEqual(collectible.address, undefined, 'should not be undefined');
        })

        it('The collectible SC should have a name and a symbol.', async () => {
            const name = await collectible.name()
            assert.equal(name, 'WolfOfAVAX', 'The name should be WolfOfAVAX.')
            const symbol = await collectible.symbol()
            assert.equal(symbol, 'WOA', 'The symbol should be WOA.')
        })
    })

    describe('Mint an NFT.', async () => {
        it('Set pause status to false', async () => {
            await collectible.pause(false);
            const isPaused = await collectible.paused();
            assert.equal(isPaused, false, 'The pause status should be false.');
        })

        it('Set reveal status to true', async () => {
            await collectible.reveal(true);
            const isRevealed = await collectible.revealed();
            assert.equal(isRevealed, true, 'The reveal status should be true.');
        })

        it('Mint the first three NFTs', async () => {
            let balance = await web3.eth.getBalance(minter1);
            balance = web3.utils.fromWei(balance, 'ether');
            console.log('First Minter Address: ' + minter1 + ' Current Balance: ' + balance);
            await collectible.mint(3, { from: minter1, value: web3.utils.toWei("7.5", "ether") });
        })

        it('Check if the first minter has 3 NFTs', async () => {
            const nftCount = await collectible.walletOfOwner.call(minter1);
            assert.equal(nftCount.toString(), [1,2,3], 'NFTs should be [1,2,3] ids');
            let balance = await web3.eth.getBalance(minter1);
            balance = web3.utils.fromWei(balance, 'ether');
            console.log('First Minter Address: ' + minter1 + ' Current Balance: ' + balance);
        })

        it('Second minter mints 4 more NFTs', async () => {
            let balance = await web3.eth.getBalance(minter2);
            balance = web3.utils.fromWei(balance, 'ether');
            console.log('Second Minter Address: ' + minter2 + ' Current Balance: ' + balance);
            await collectible.mint(4, { from: minter2, value: web3.utils.toWei("10", "ether") });
        })

        it('Check if the second minter has 4 NFTs', async () => {
            const nftCount = await collectible.walletOfOwner.call(minter2);
            assert.equal(nftCount.toString(), [4,5,6,7], 'NFTs should be [4,5,6,7] ids');
            let balance = await web3.eth.getBalance(minter2);
            balance = web3.utils.fromWei(balance, 'ether');
            console.log('Second Minter Address: ' + minter2 + ' Current Balance: ' + balance);
        })

        it('Third minter mints 5 more NFTs', async () => {
            let balance = await web3.eth.getBalance(minter3);
            balance = web3.utils.fromWei(balance, 'ether');
            console.log('Third Minter Address: ' + minter3 + ' Current Balance: ' + balance);
            await collectible.mint(5, { from: minter3, value: web3.utils.toWei("12.5", "ether") });
        })

        it('Check if the third minter has 5 NFTs', async () => {
            const nftCount = await collectible.walletOfOwner.call(minter3);
            assert.equal(nftCount.toString(), [8,9,10,11,12], 'NFTs should be [8,9,10,11,12] ids');
            let balance = await web3.eth.getBalance(minter3);
            balance = web3.utils.fromWei(balance, 'ether');
            console.log('Second Minter Address: ' + minter3 + ' Current Balance: ' + balance);
        })

        it('Check the claimable rewards of the owner of the first 3 NFTs', async () => {
            const minterBalance = await web3.eth.getBalance(minter1);
            console.log('Total Balance: ' + web3.utils.fromWei(minterBalance, "ether"));
            const balance = await collectible.claimableRewards({ from: minter1 });
            console.log('Total claimable rewards: ' + web3.utils.fromWei(balance, 'ether'));
        })

        it('Check the claimable rewards of the second minter of the other 4 NFTs', async () => {
            const minterBalance = await web3.eth.getBalance(minter2);
            console.log('Total Balance: ' + web3.utils.fromWei(minterBalance, "ether"));
            const balance = await collectible.claimableRewards({ from: minter2 });
            console.log('Total claimable rewards: ' + web3.utils.fromWei(balance, 'ether'));
        })

        it('Check the claimable rewards of the third minter of the other 5 NFTs', async () => {
            const minterBalance = await web3.eth.getBalance(minter3);
            console.log('Total Balance: ' + web3.utils.fromWei(minterBalance, "ether"));
            const balance = await collectible.claimableRewards({ from: minter3 });
            console.log('Total claimable rewards: ' + web3.utils.fromWei(balance, 'ether'));
        })

        it('Claim rewards of first minter', async () => {
            console.log();
            const scBalance = await web3.eth.getBalance(collectible.address);
            console.log('Smart Contract Balance: ' + web3.utils.fromWei(scBalance, "ether"));
            const balance1 = await collectible.claimableRewards({ from: minter1 });
            console.log('First Minter Total Rewards Before: ' + web3.utils.fromWei(balance1, 'ether'));
            const minterBalance1 = await web3.eth.getBalance(minter1);
            console.log('First Minter Total Balance Before: ' + web3.utils.fromWei(minterBalance1, "ether"));
            await collectible.claimRewards({ from: minter1 });
            const balance2 = await collectible.claimableRewards({ from: minter1 });
            console.log('First Minter Total Rewards After: ' + web3.utils.fromWei(balance2, 'ether'));
            const minterBalance2 = await web3.eth.getBalance(minter1);
            console.log('First Minter Total Balance After: ' + web3.utils.fromWei(minterBalance2, "ether"));
        })

        it('Claim rewards of second minter', async () => {
            console.log();
            const scBalance = await web3.eth.getBalance(collectible.address);
            console.log('Smart Contract Balance: ' + web3.utils.fromWei(scBalance, "ether"));
            const balance1 = await collectible.claimableRewards({ from: minter2 });
            console.log('First Minter Total Rewards Before: ' + web3.utils.fromWei(balance1, 'ether'));
            const minterBalance1 = await web3.eth.getBalance(minter2);
            console.log('First Minter Total Balance Before: ' + web3.utils.fromWei(minterBalance1, "ether"));
            await collectible.claimRewards({ from: minter2 });
            const balance2 = await collectible.claimableRewards({ from: minter2 });
            console.log('First Minter Total Rewards After: ' + web3.utils.fromWei(balance2, 'ether'));
            const minterBalance2 = await web3.eth.getBalance(minter2);
            console.log('First Minter Total Balance After: ' + web3.utils.fromWei(minterBalance2, "ether"));
        })

        it('Withdraw 10 avax from the smart contract', async () => {
            console.log();
            const scBalance = await web3.eth.getBalance(collectible.address);
            console.log('Smart Contract Balance: ' + web3.utils.fromWei(scBalance, "ether"));
            const ownerBalance1 = await web3.eth.getBalance(contractDeployer);
            console.log('Owner Total Balance Before: ' + web3.utils.fromWei(ownerBalance1, "ether"));
            await collectible.withdraw(web3.utils.toWei("10", "ether"), { from: contractDeployer });
            const ownerBalance2 = await web3.eth.getBalance(contractDeployer);
            console.log('Owner Total Balance After: ' + web3.utils.fromWei(ownerBalance2, "ether"));
        })

        it('Claim rewards of third minter', async () => {
            console.log();
            const scBalance = await web3.eth.getBalance(collectible.address);
            console.log('Smart Contract Balance: ' + web3.utils.fromWei(scBalance, "ether"));
            const balance1 = await collectible.claimableRewards({ from: minter3 });
            console.log('First Minter Total Rewards Before: ' + web3.utils.fromWei(balance1, 'ether'));
            const minterBalance1 = await web3.eth.getBalance(minter3);
            console.log('First Minter Total Balance Before: ' + web3.utils.fromWei(minterBalance1, "ether"));
            await collectible.claimRewards({ from: minter3 });
            const balance2 = await collectible.claimableRewards({ from: minter3 });
            console.log('First Minter Total Rewards After: ' + web3.utils.fromWei(balance2, 'ether'));
            const minterBalance2 = await web3.eth.getBalance(minter3);
            console.log('First Minter Total Balance After: ' + web3.utils.fromWei(minterBalance2, "ether"));

            const scBalanceF = await web3.eth.getBalance(collectible.address);
            console.log('Smart Contract Balance: ' + web3.utils.fromWei(scBalanceF, "ether"));
        })
    })
});
