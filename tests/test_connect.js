const path = require('path');
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
// 1. 配置 provider
const web3 = new Web3(ganache.provider());
// 2. 拿到 abi 和 bytecode
const contractPath = path.resolve(__dirname,'../compiled/Connect.json');
const { abi, evm } = require(contractPath);
const interface = abi;
const bytecode = evm.bytecode.object;

let accounts;
let contract;
const initialBrand = 'Name';
const initialPrise = 0;
const newBrand = 'New';
const newPrise = 1;

describe('contract', () => {
    // 3. 每次跑单测时需要部署全新的合约实例，起到隔离的作用 
    beforeEach(async () => {
        accounts = await web3.eth.getAccounts(); 
        console.log('合约部署账户:', accounts[0]); 
        contract = await new web3.eth.Contract(interface)
        .deploy({ data: bytecode, arguments: [initialBrand,initialPrise] })
        .send({ from: accounts[0], gas: '1000000' }); 
        console.log('合约部署成功:',contract.options.address); 
    });

    // 4. 编写单元测试
    it('deployed contract', () => {
        assert.ok(contract.options.address);
    });

    it('should has initial brand', async () => {
        const brand = await contract.methods.getBrand().call(); 
        assert.equal(brand, initialBrand);
    });

    it('should has initial prise', async () => {
        const prise = await contract.methods.getPrice().call(); 
        assert.equal(prise, initialPrise);
    });

    it('should has new brand', async () => {
        await contract.methods.setBrand(newBrand).send({from: accounts[0]}); 
        const brand = await contract.methods.getBrand().call(); 
        assert.equal(brand, newBrand);
    });

    it('should has new prise', async () => {
        await contract.methods.setPrice(newPrise).send({from: accounts[0]}); 
        const prise = await contract.methods.getPrice().call();
        assert.equal(prise, newPrise);
    });
});