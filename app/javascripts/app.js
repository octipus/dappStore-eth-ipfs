// Import the page's CSS. Webpack will know what to do with it.
import '../stylesheets/styles.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
const contract = require('truffle-contract')
const json = require('../../build/contracts/EcommerceStore.json')

const EcommerceStore = contract(json)

const ipfsAPI = require('ipfs-api')

const ipfs = ipfsAPI('localhost', '5001', { protocol: 'http' })

// Application
window.App = {
  start: function () {
    EcommerceStore.setProvider(web3.currentProvider)
    renderStore()

    var reader

    $('#product-image').change(function (event) {
      const file = event.target.files[0]
      reader = new window.FileReader()
      reader.readAsArrayBuffer(file).toString
    })

    $('#add-item-to-store').submit(function (event) {
      const req = $('#add-item-to-store').serialize()
      let params = JSON.parse('{"' + req.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
      let decodedParams = {}
      Object.keys(params).forEach(function (v) {
        decodedParams[v] = decodeURIComponent(decodeURI(params[v]))
      })
      saveProduct(reader, decodedParams)
      event.preventDefault()
    })

    if ($('#product-details').length > 0) {
   // This is product details page
      let productId = new URLSearchParams(window.location.search).get('id')
      renderProductDetails(productId)
    }
  }
}

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(web3.currentProvider)
    $('#eth-address').append(web3.eth.accounts[0]) // display eth address in navbar
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3js = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  }

  // Now you can start your app & access web3 freely:
  App.start()
})

function renderStore () {
  EcommerceStore.deployed().then(function (i) {
    i.getProduct.call(1).then(function (p) {
      $('#product-list').append(buildProduct(p))
    })
    i.getProduct.call(2).then(function (p) {
      $('#product-list').append(buildProduct(p))
    })
    i.getProduct.call(3).then(function (p) {
      $('#product-list').append(buildProduct(p))
    })
    i.getProduct.call(4).then(function (p) {
      $('#product-list').append(buildProduct(p))
    })
    i.getProduct.call(5).then(function (p) {
      $('#product-list').append(buildProduct(p))
    })
    i.getProduct.call(7).then(function (p) {
      $('#product-list').append(buildProduct(p))
    })
    i.getProduct.call(1).then(function (p) {
      $('#product-list').append(buildProduct(p))
    })
    i.getProduct.call(5).then(function (p) {
      $('#product-list').append(buildProduct(p))
    })
    i.getProduct.call(2).then(function (p) {
      $('#product-list').append(buildProduct(p))
    })
    i.getProduct.call(3).then(function (p) {
      $('#product-list').append(buildProduct(p))
    })
    i.getProduct.call(4).then(function (p) {
      $('#product-list').append(buildProduct(p))
    })
  })
}

function renderProductDetails (productId) {
  EcommerceStore.deployed().then(function (i) {
    i.getProduct.call(productId).then(function (p) {
      console.log(p)
      let content = ''
      ipfs.cat(p[4]).then(function (file) {
        content = file.toString()
        $('#product-desc').append('<div>' + content + '</div>')
      })

      $('#product-image').append("<img src='https://ipfs.io/ipfs/" + p[3] + "' width='250px' />")
      $('#product-price').html(displayPrice(p[7]))
      $('#product-name').html(p[1].name)
      $('#product-id').val(p[0])
    })
  })
}

// products list
function buildProduct (product) {
  let node = $('<div/>')
  node.addClass('card product-card m-2')
  node.append('<div class="card-header">' + product[1] + '</div>')
  node.append('<div class="card-body"><img class="img-fluid d-block pi-draggable mx-auto py-2" src="https://ipfs.io/ipfs/' + product[3] + '" width="150px"/><h6 class="text-muted product-subtitle">' + product[2] + '</h6><div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Ether </span>' + '<p class="nav-link text-nowrap bg-secondary text-light" id="price">' + product[7] / 1e18 + '</p>') // eslint-disable-line
  node.append('<a href=product.html?id=' + product.blockchainId + ' class="btn btn-primary">View product</a>')
  return node
}

// save image on ipfs
function saveImageOnIpfs (reader) {
  return new Promise(function (resolve, reject) {
    const buffer = Buffer.from(reader.result)
    ipfs.add(buffer)
  .then((response) => {
    console.log(response)
    resolve(response[0].hash)
  }).catch((err) => {
    console.error(err)
    reject(err)
  })
  })
}

// save description on ipfs
function saveDescOnIpfs (blob) {
  return new Promise(function (resolve, reject) {
    const descBuffer = Buffer.from(blob, 'utf-8')
    ipfs.add(descBuffer)
  .then((response) => {
    console.log(response)
    resolve(response[0].hash)
  }).catch((err) => {
    console.error(err)
    reject(err)
  })
  })
}

// save product
function saveProduct (reader, decodedParams) {
  let imageId, descId
  saveImageOnIpfs(reader).then(function (id) {
    imageId = id
    saveDescOnIpfs(decodedParams['product-description']).then(function (id) {
      descId = id
      saveProductToBlockchain(decodedParams, imageId, descId)
    })
  })
}

// list product
function saveProductToBlockchain (params, imageId, descId) {
  console.log(params)
  EcommerceStore.deployed().then(function (i) {
    i.addProductToStore(params['product-name'], params['product-category'], imageId, descId, auctionStartTime, auctionEndTime, web3.toWei(params['product-price'], 'ether'), parseInt(params['product-condition']), { from: web3.eth.accounts[0], gas: 440000 }).then(function (f) { // eslint-disable-line
      console.log(f)
      $('#msgSuccess').show()
    })
  })
}

function displayPrice (amt) {
  return 'Ξ' + web3.fromWei(amt, 'ether')
}
