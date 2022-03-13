const path = require('path');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// 1. 拿到 bytecode
const contractPath = path.resolve(__dirname, '../compiled/Connect.json');
const { abi, evm } = require(contractPath);
//console.log(abi);
//console.log(evm.bytecode.object);
(async () => {
    // 2. 获取钱包里面的账户
    const accounts = await web3.eth.getAccounts(); 
    console.log('部署合约账户:', accounts[0]);
    // 3. 创建合约实例并且部署
    console.time('合约部署耗时'); 
    //var result = await new web3.eth.Contract(JSON.parse(interface))
    var result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ['Name',0]})
        .send({ from: accounts[0], gas: '1000000' }); 
        console.timeEnd('合约部署耗时');
        console.log('合约部署成功:', result.options.address);
    }
)();