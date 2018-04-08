pragma solidity ^0.4.13;

contract EcommerceStore {
  enum ProductStatus { Open, Sold, Unsold }
  enum ProductCondition { New, Used }

  uint public productIndex;
  mapping (address => mapping(uint => Product)) stores;
  mapping (uint => address) productIdInStore;

  address owner;

  struct Product { //initialize product constructor
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
}
