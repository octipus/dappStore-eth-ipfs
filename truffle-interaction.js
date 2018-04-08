//initialize account with ether
  current_time = Math.round(new Date() / 1000);
  amt_1 = web3.toWei(1, 'ether');

// add product to stores
EcommerceStore.deployed().then(function(i) {i.addProductToStore('Leather Bracelet', 'Handmade', 'QmfZmV5TSTMfJLxkSAe5GSgycR66vnrVDY4buppadJ5qXW', 'QmfZmV5TSTMfJLxkSAe5GSgycR66vnrVDY4buppadJ5qXW', current_time, current_time + (4*86400), amt_1, 0, {gas: 1000000, from: web3.eth.accounts[1]}).then(function(f) {console.log(f)})});

// check product on blockchain
 EcommerceStore.deployed().then(function(f) {f.getProduct.call(1).then(function(f) {console.log(f)})})
