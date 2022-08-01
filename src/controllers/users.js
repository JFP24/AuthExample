const { Users } = require("../db");
//creando un comentario en la segunda
const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const userFound = await Users.findOne({ where: { email } });
    console.log(userFound);
    if (!userFound) {
      const createUser = await Users.create({
        username,
        email,
        password,
        role,
      });

      res.status(202).json({ createUser });
    } else {
      res.status(404).json("ya exite email ");
    }
  } catch (error) {
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const allUsers = await Users.findAll();
    res.status(202).json(allUsers);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await Users.destroy({ where: { id } });
    res.status(200).send("Se elimino usuario");
  } catch (error) {
    res.status(404).json("Error desde deleteUser");
  }
};

module.exports = {
  createUser,

  deleteUser,
  getUsers,
};
