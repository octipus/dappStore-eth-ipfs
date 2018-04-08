// Import the page's CSS. Webpack will know what to do with it.
import '../stylesheets/styles.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
const contract = require('truffle-contract')
const json = require('../../build/contracts/EcommerceStore.json')

const EcommerceStore = contract(json)

const ipfsAPI = require('ipfs-api')
const ethUtil = require('ethereumjs-util')

const ipfs = ipfsAPI({ host: 'localhost', port: '5001', protocol: 'http' })

window.App = {
  start: function () {
    var self = this

    EcommerceStore.setProvider(web3.currentProvider)
    renderStore()
  }
}

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3 = new Web3(web3.currentProvider)
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
  })
}

function buildProduct (product) {
  let node = $('<div/>')
  node.addClass('card')
  node.append('<div class="card-header"><h4>' + product[1] + '</h4></div>')
  node.append("<div class='card-body'><img class='' src='https://ipfs.io/ipfs/" + product[3] + "' width='150px' />")
  node.append('<h6 class="text-muted">' + product[2] + '</h6>')
  node.append('<p>' + product[5] + '</p>')
  node.append('<p>' + product[6] + '</p>')
  node.append('<div class="input-group-prepend"><span class="input-group-text" id="basic-addon1">Ether </span>' + product[7] + '</p>')
  node.append('</div>')
  return node
}
