//initialize account with ether
  current_time = Math.round(new Date() / 1000);
  amt_1 = web3.toWei(1, 'ether');

// add product to stores
EcommerceStore.deployed().then(function(i) {i.addProductToStore('iPhone 6', 'Cell Phones & Accessories', 'QmStqeYPDCTbgKGUwns2nZixC5dBDactoCe1FB8htpmrt1', 'QmbLRFj5U6UGTy3o9Zt8jEnVDuAw2GKzvrrv3RED9wyGRk', current_time, current_time + (4*86400), amt_1, 0, {gas: 1000000, from: web3.eth.accounts[1]}).then(function(f) {console.log(f)})});

// check product on blockchain
 EcommerceStore.deployed().then(function(f) {f.getProduct.call(1).then(function(f) {console.log(f)})})
