const { Products } = require("../db");

const createProduct = async (req, res) => {
  try {
    //llegan los datos por body
    const { name, category, price, image } = req.body;
    //creamos en la db
    const newProduct = await Products.create({
      name,
      category,
      price,
      image,
    });
    //devolvemos la informacion
    res.status(202).json(newProduct);
  } catch (error) {
    console.log(error);
    return res.status(404).send("error desde createProducts");
  }
};

const getProducts = async (req, res) => {
  try {
    //me devuelve un arreglo de objetos
    const products = await Products.findAll();
    //mando la informacion de la db
    return res.status(202).json(products);
  } catch (error) {
    console.log(error);
    return res.status(404).send("error desde getProducts");
  }
};

const getProductsById = async (req, res) => {
  try {
    //traemos el id por params
    const { id } = req.params;
    //traemos la informacion que coincida con el id
    const infoDb = await Products.findOne({ where: { id } });
    //mandamos la informacion que coincida
    return res.status(202).json(infoDb);
  } catch (error) {
    console.log(error);
    return res.status(404).json("No existe info en la db");
  }
};

const updateProductById = async (req, res) => {
  try {
    //llega lainformacion de la actualizacion por body
    const { name, category, price, image } = req.body;
    //usamos el id por params
    const { id } = req.params;
    //actualizamos a la informacion que necesitemos en la db
    const update = await Products.update(
      {
        name,
        category,
        price,
        image,
      },
      {
        where: { id: id },
      }
    );
    //respondemos 200 con mensaje
    return res.status(200).json("El producto se actualizo");
  } catch (error) {
    console.log(error);
    return res.status(404).send("Error desde updateProducts");
  }
};

const deleteProductsById = async (req, res) => {
  try {
    //usamos el id por params
    const { id } = req.params;
    //eliminamos con el metodo destroy donde coincida con el id
    const deleteProduct = await Products.destroy({ where: { id } });
    //mandamos la respuesta
    return res.status(200).send("Se elimino producto");
  } catch (error) {
    console.log(error);
    return res.status(404).send("Error desde deleteProducts");
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductsById,
  updateProductById,
  deleteProductsById,
};
