
### Decentralized Web Store Built With IPFS and Blockchain
#### Oconti01 - Birkbeck university of London 2018



Install dependecncies
```sh
$ cd dappStore-eth-ipfs
$ npm install
```

Run TestRPC
```sh
$ ganache-cli
```

Initialize IPFS node
```sh
$ ipfs-daemon
```
Deploy contract 
```sh
$ truffle migrate
```
Start truffle console
```sh
$ truffle console
```


---

##### Truffle console interaction


Initialize variables
```language-javascript
  current_time = Math.round(new Date() / 1000);
  amt_1 = web3.toWei(1, 'ether');
```

Add products to store (an extendd list of products is available in file truffle-interaction.js)
```language-javascript
EcommerceStore.deployed().then(function(i) {i.addProductToStore('Leather Bracelet', 'Handmade', 'QmfZmV5TSTMfJLxkSAe5GSgycR66vnrVDY4buppadJ5qXW', 'QmfZmV5TSTMfJLxkSAe5GSgycR66vnrVDY4buppadJ5qXW', current_time, current_time + (4*86400), amt_1, 0, {gas: 1000000, from: web3.eth.accounts[1]}).then(function(f) {console.log(f)})});
```

Check for item on blockchain
```language-javascript
	EcommerceStore.deployed().then(function(f) {f.getProduct.call(1).then(function(f) {console.log(f)})})
```
---
Run application
```sh
$ npm run dev
```

