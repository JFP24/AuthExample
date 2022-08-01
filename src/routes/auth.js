const { Router } = require("express");
const auth = require("../controllers/auth");
const check = require("../middleware/utils");
const router = Router();

//Rutas para la autenticacion de los usuarios

//Ruta para autenticar el login
router.post("/login", auth.login);
//Ruta para autenticar que esta logueado para modificar los datos
router.put("/update/:id", check.checkAuth, auth.updateUser);

module.exports = router;
