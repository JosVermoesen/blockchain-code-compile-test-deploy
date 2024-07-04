//SPDX-License-Identifier:MIT
pragma solidity ^0.7.6;
pragma abicoder v2; // Add this line to enable ABI coder v2

// https://github.com/syedmuhamaddanish
// https://www.youtube.com/watch?v=07V4cKv16iw

contract ProductsCrud {
    struct Product {
        uint id;
        string name;
        uint price;
        uint quantity;
    }
    address owner;

    Product public removeMe;

    mapping(uint => Product) public products;
    Product[] public productArray;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function createProduct(
        uint _id,
        string memory _name,
        uint _price,
        uint _quantity
    ) public onlyOwner() {
        Product memory product = Product(_id, _name, _price, _quantity);
        products[_id] = product;
        productArray.push(Product(_id, _name, _price, _quantity));
    }

    function getProduct(
        uint _id
    ) public view returns (string memory, uint, uint) {
        require(products[_id].id != 0, "Product is not available");
        Product memory product = products[_id];
        return (product.name, product.price, product.quantity);
    }

    function getAllProducts() public view returns (Product[] memory) {
        return productArray;
    }

    function productsCount() public view returns (uint) {
        return productArray.length;
    }

    function updateProduct(
        uint _id,
        string memory _name,
        uint _price,
        uint _quantity
    ) public onlyOwner {
        require(products[_id].id != 0, "Product is not available");
        deleteProduct(_id);
        products[_id] = Product(_id, _name, _price, _quantity);
        productArray.push(Product(_id, _name, _price, _quantity));
    }

    function deleteProduct(uint _id) public onlyOwner {
        require(products[_id].id != 0, "Product is not available");
        delete products[_id];
        for (uint i = 0; i < productArray.length; i++) {
            if (productArray[i].id == _id) {
                removeMe = productArray[i];
                productArray[i] = productArray[productArray.length - 1];
                productArray[productArray.length - 1] = removeMe;
            }
        }
        productArray.pop();
    }
}
