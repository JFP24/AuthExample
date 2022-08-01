const { Router } = require("express");
const users = require("../controllers/users.js");
const check = require("../middleware/utils");
const router = Router();
//Rutas de usuarios

//Para traer todos los usuarios
router.get("/", check.checkRoleAuth, users.getUsers);
//Para crear un usuario
router.post("/createUser", users.createUser);
//Para Eliminar un usuario
router.delete("/delete/:id", check.checkRoleAuth, users.deleteUser);

module.exports = router;
