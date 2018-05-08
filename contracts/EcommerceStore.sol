pragma solidity ^0.4.21;

import "contracts/Escrow.sol"; // eslint-disable-line
contract EcommerceStore {
  enum ProductStatus { Open, Sold, Unsold }
  enum ProductCondition { New, Used }

  uint public productIndex;
  mapping (address => mapping(uint => Product)) stores;
  mapping (uint => address) productIdInStore;

  mapping (uint => address) productEscrow;
  address owner;

  struct Product { //product constructor
  uint id;
  string name;
  string category;
  string imageLink;
  string descLink;
  uint listingStartTime;
  uint listingEndTime;
  uint price;
  address buyer;
  ProductStatus status;
  ProductCondition condition;
 }

 function EcommerceStore() public {
    productIndex = 0;
    owner = msg.sender;
  }

//events
  event NewProduct(uint _productId, string _name, string _category, string _imageLink, string _descLink,
    uint _listingStartTime, uint _listingEndTime, uint _price, uint _productCondition);

  event ProductSold(uint _productId, address _buyer);

//add product to store
  function addProductToStore(string _name, string _category, string _imageLink, string _descLink, uint _listingStartTime,
    uint _listingEndTime, uint _price, uint _productCondition) public {
    require (_listingStartTime < _listingEndTime);
    productIndex += 1;
    Product memory product = Product(productIndex, _name, _category, _imageLink, _descLink, _listingStartTime, _listingEndTime,
                     _price, 0, ProductStatus.Open, ProductCondition(_productCondition));
    stores[msg.sender][productIndex] = product;
    productIdInStore[productIndex] = msg.sender;
  }

//get product
  function getProduct(uint _productId) view public returns (uint, string, string, string, string, uint, uint, uint, address, ProductStatus) {
   Product memory product = stores[productIdInStore[_productId]][_productId];
   return (product.id, product.name, product.category, product.imageLink, product.descLink, product.listingStartTime,
       product.listingEndTime, product.price, product.buyer, product.status);
  }

// buy product
  function buyProduct(uint _productId) payable public {
    Product memory product = stores[productIdInStore[_productId]][_productId];
    require(now < product.listingEndTime);
    require(product.status == ProductStatus.Open);
    require(msg.value >= product.price);

    Escrow escrow = (new Escrow).value(msg.value)(_productId, msg.sender, productIdInStore[_productId], owner);
    productEscrow[_productId] = address(escrow);
    product.status = ProductStatus.Sold;
    product.buyer = msg.sender;
    stores[productIdInStore[_productId]][_productId] = product;
  }

//escrow
  function escrowAddressForProduct(uint _productId) view public returns (address) {
    return productEscrow[_productId];
  }

  function escrowInfo(uint _productId) view public returns (address, address, address, bool, uint, uint) {
    return Escrow(productEscrow[_productId]).escrowInfo();
  }

  function releaseAmountToSeller(uint _productId) public {
    Escrow(productEscrow[_productId]).releaseAmountToSeller(msg.sender);
  }

  function refundAmountToBuyer(uint _productId) public {
    Escrow(productEscrow[_productId]).refundAmountToBuyer(msg.sender);
  }

}
