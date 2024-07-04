const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const web3 = new Web3(ganache.provider());

const { abi, evm } = require("../bc-products/compile");

let products;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  products = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: accounts[0], gas: "3000000" });
});
describe("Products Contract", () => {
  it("deploys a contract", () => {
    assert.ok(products.options.address);
  });

  it("allows a user to CRUD products", async () => {
    await products.methods.createProduct(1, "Product 1", 1000, 2).send({
      from: accounts[0],
      gas: "1000000",
    });

    await products.methods.createProduct(2, "Product 2", 500, 10).send({
      from: accounts[0],
      gas: "1000000",
    });

    await products.methods.createProduct(3, "Product 3", 500, 10).send({
      from: accounts[0],
      gas: "1000000",
    });

    await products.methods.createProduct(5, "Product 5", 500, 10).send({
      from: accounts[0],
      gas: "1000000",
    });

    const productArray = await products.methods.getAllProducts().call();
    const productsCount = await products.methods.productsCount().call();

    assert.equal(productsCount, 4);
    assert.equal(productArray.length, 4);
    assert.equal(productArray[1].name, "Product 2");

    // console.log("productsCount:", productsCount);
    // console.log("productArray:", productArray); // result below
    /* [
      {
        0: 1n,
        1: "Product 1",
        2: 1000n,
        3: 2n,
        __length__: 4,
        id: 1n,
        name: "Product 1",
        price: 1000n,
        quantity: 2n,
      },
      {
        0: 2n,
        1: "Product 2",
        2: 500n,
        3: 10n,
        __length__: 4,
        id: 2n,
        name: "Product 2",
        price: 500n,
        quantity: 10n,
      },
      {
        0: 3n,
        1: "Product 3",
        2: 500n,
        3: 10n,
        __length__: 4,
        id: 3n,
        name: "Product 3",
        price: 500n,
        quantity: 10n,
      },
      {
        0: 5n,
        1: "Product 5",
        2: 500n,
        3: 10n,
        __length__: 4,
        id: 5n,
        name: "Product 5",
        price: 500n,
        quantity: 10n,
      },
    ]; */

    const aProduct = await products.methods.getProduct(5).call();
    assert.equal(aProduct[0], "Product 5");
    assert.equal(aProduct[1], 500);
    assert.equal(aProduct[2], 10);

    // console.log("product:", aProduct); // result below
    // [{ 0: "Product 5", 1: 500n, 2: 10n, __length__: 3 }];

    const deletedProduct = await products.methods.deleteProduct(5).send({
      from: accounts[0],
      gas: "1000000",
    });
    // console.log("deletedProduct:", deletedProduct);
    assert.equal(deletedProduct.status, 1);

    const productArrayAfterDelete = await products.methods
      .getAllProducts()
      .call();
    const productsCountAfterDelete = await products.methods
      .productsCount()
      .call();

    assert.equal(productsCountAfterDelete, 3);
    assert.equal(productArrayAfterDelete.length, 3);
    assert.equal(productArrayAfterDelete[3], undefined);

    await products.methods.updateProduct(2, "Product 2 Updated", 501, 15).send({
      from: accounts[0],
      gas: "1000000",
    });

    const updatedProduct = await products.methods.getProduct(2).call();
    // console.log("updatedProduct:", updatedProduct);
    assert.equal(updatedProduct[0], "Product 2 Updated");
    assert.equal(updatedProduct[1], 501);
    assert.equal(updatedProduct[2], 15);
  });
});
