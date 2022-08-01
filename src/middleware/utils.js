const { Users } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const checkRoleAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop(); //Accedemos a el token del user
    const tokenData = jwt.verify(token, "autho"); //Verificamos que sea un token valido
    const userData = await Users.findByPk(tokenData.id); //Traemos la informacion del usuario por id
    //validamos si el usuario en la propiedad role es admin
    if (userData.role === "admin") {
      next(); //si es admin pasamos la siguiente funcion
    } else {
      //SI no, mandamos un mensaje de error
      res
        .status(409)
        .send({ error: "No tienes permisos para generar esta accion" });
    }
  } catch (error) {
    console.log(error);
    res.status(409).send({ error: "Hubo un problema con tu token" });
  }
};

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop(); //Accedemos a el token del user
    const tokenData = jwt.verify(token, "autho"); //Verificamos que sea un token valido
    if (tokenData.id) {
      //Si es valido pasamos a la siguiente funcion
      next();
    } else {
      //si no es valido mandamos mensaje de error
      res
        .status(409)
        .send({ error: "Debes estar logueado para realizar esta accion" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(409)
      .send({ error: "Debes estar logueado para realizar esta accion" });
  }
};

//funcion para comparar la password encriptada con la que me llegua en el form
const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

//funcion para generar un token a un usuario cada vez que se loguea
const tokenSign = async (user) => {
  //TODO: Genera Token
  return jwt.sign(
    {
      id: user.id, //TODO: <---
      role: user.role,
    }, //TODO: Payload ! Carga útil
    "autho",
    {
      expiresIn: 9999,
    }
  );
};

module.exports = {
  checkRoleAuth,
  compare,
  tokenSign,
  checkAuth,
};
