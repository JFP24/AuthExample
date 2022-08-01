const { Router } = require("express");
const router = Router();
const products = require("../controllers/products.js");
const check = require("../middleware/utils");
//Rutas que van a ser utilizadas dentro de mi api products

//Para crear un producto
router.post("/", check.checkRoleAuth, products.createProduct);
//Para traer todos los productos
router.get("/", products.getProducts);
//Para traer un solo producto por id
router.get("/:id", products.getProductsById);
//Para actualizar un producto
router.put("/:id", check.checkRoleAuth, products.updateProductById);
//Para eliminar un producto
router.delete("/:id", check.checkRoleAuth, products.deleteProductsById);

module.exports = router;
