//initialize
  current_time = Math.round(new Date() / 1000);
  amt_1 = web3.toWei(1, 'ether');

// add products to store as account[1]
	//bracelet
	EcommerceStore.deployed().then(function(i) {i.addProductToStore('Leather Bracelet', 'Handmade', 'QmfZmV5TSTMfJLxkSAe5GSgycR66vnrVDY4buppadJ5qXW', 'QmSjx85cNuvmFMoQmSBQxa6dSnTLu1YQ3zSgXk5YebGHJd', current_time, current_time + (4*86400), amt_1, 0, {gas: 1000000, from: web3.eth.accounts[1]}).then(function(f) {console.log(f)})});

	//paint
	EcommerceStore.deployed().then(function(i) {i.addProductToStore('Painting', 'Art', 'QmfJKN63jJ1fZHnvhggntxRYo1JPdUHtzUTR1YqGCPBxM9', 'QmSjx85cNuvmFMoQmSBQxa6dSnTLu1YQ3zSgXk5YebGHJd', current_time, current_time + (4*86400), amt_1, 0, {gas: 1000000, from: web3.eth.accounts[1]}).then(function(f) {console.log(f)})});

	//bag
	EcommerceStore.deployed().then(function(i) {i.addProductToStore('Vintage Leather Bag', 'Fashion', 'QmZq7qTd2sq23PvgJb5Ao2SDo7gSLNovSZqt8vkPq1MJDD', 'QmSjx85cNuvmFMoQmSBQxa6dSnTLu1YQ3zSgXk5YebGHJd', current_time, current_time + (4*86400), amt_1, 0, {gas: 1000000, from: web3.eth.accounts[1]}).then(function(f) {console.log(f)})});

	//jeans
	EcommerceStore.deployed().then(function(i) {i.addProductToStore('Jeans', 'Fashion', 'Qmf1RjTBPWpx8p58zTe2bs1qpaDaBWi2YtfBgWr3iYaeYB', 'QmSjx85cNuvmFMoQmSBQxa6dSnTLu1YQ3zSgXk5YebGHJd', current_time, current_time + (4*86400), amt_1, 0, {gas: 1000000, from: web3.eth.accounts[1]}).then(function(f) {console.log(f)})});

	//clock
	EcommerceStore.deployed().then(function(i) {i.addProductToStore('Wall CLock', 'Handmade', 'QmceXc99T61rt59553EqHaaiZ2j63VxVCWuoDm58EJ4Wsm', 'QmSjx85cNuvmFMoQmSBQxa6dSnTLu1YQ3zSgXk5YebGHJd', current_time, current_time + (4*86400), amt_1, 0, {gas: 1000000, from: web3.eth.accounts[1]}).then(function(f) {console.log(f)})});

	//ring
	EcommerceStore.deployed().then(function(i) {i.addProductToStore('Silver Ring', 'Jewellery', 'Qme5un9Hst4qrhXADnbreF6oKHb3wNSXLgATTBv4aPs3tY', 'QmSjx85cNuvmFMoQmSBQxa6dSnTLu1YQ3zSgXk5YebGHJd', current_time, current_time + (4*86400), amt_1, 0, {gas: 1000000, from: web3.eth.accounts[1]}).then(function(f) {console.log(f)})});

// Check to make sure product is in the blockchain
  EcommerceStore.deployed().then(function(f) {f.getProduct.call(1).then(function(f) {console.log(f)})})

// Buy the product from account[2]
EcommerceStore.deployed().then(function(f) {f.buyProduct(1, {from: web3.eth.accounts[2], value: amt_1}).then(function(f) {console.log(f)})})

// Check to make sure account [2] is marked as buyer
EcommerceStore.deployed().then(function(f) {f.getProduct.call(1).then(function(f) {console.log(f)})})

// Get the escrow address and check the balance
EcommerceStore.deployed().then(function(f) {f.escrowAddressForProduct.call(1).then(function(f) {console.log(f);console.log(web3.eth.getBalance(f));})})

// Check the balance of seller
web3.eth.getBalance(web3.eth.accounts[1])

// Release the amount as arbiter/owner in our case account[0]
EcommerceStore.deployed().then(function(f) {f.releaseAmountToSeller(1, {from: web3.eth.accounts[0]}).then(function(f) {console.log(f)})})

// Release the amount as buyer in our case account[1]
EcommerceStore.deployed().then(function(f) {f.releaseAmountToSeller(1, {from: web3.eth.accounts[1]}).then(function(f) {console.log(f)})})

// Check the balance in seller again, should be 1 Ether more than previous step
web3.eth.getBalance(web3.eth.accounts[1])
}
