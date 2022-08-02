const { Users } = require("../db");
const check = require("../middleware/utils");
//haciendo un cambio desde la laptop
//modificamos un archivo 
const login = async (req, res) => {
  try {
    const { email, password } = req.body; //llega info por formulario
    const user = await Users.findOne({ where: { email } }); //buscamos si existe en la db por el email
    if (!user) {
      res.status(404).send("Usuario no existe"); //si no existe  mandamos mensaje de no existe
    }
    const checkPassword = await check.compare(password, user.password); // si existe comparamos la password para que coincida
    const tokenSession = await check.tokenSign(user);
    if (checkPassword) {
      //si coincide mandamos el usuario
      return res.status(200).send({ user, tokenSession });
    } else {
      return res.status(409).send("Contraseña invalida"); //si no coincide mandamos mensaje de error
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json("Error desde el login");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    const findUser = await Users.findOne({ where: { username } });
    if (!findUser) {
      const update = await Users.update(
        {
          username,
        },
        {
          where: { id: id },
        }
      );
      return res.status(202).json("se actualizo");
    } else {
      return res.status(404).json("Ya existe ese username");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  updateUser,
};
