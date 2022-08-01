const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  //Modelo para registrarse en la base de datos
  const User = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: true,
        set(value) {
          //encriptamos la password que entre
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hash);
        },
      },
      //arrelgo de roles -  multiples roles,
      //para decir a el usuario que tiene permitido hacer en la aplicacion , administrador , usuario
      role: {
        type: DataTypes.STRING,
        defaultValue: "Client",
        validate: {
          isString(value) {
            if (value && typeof value !== "string")
              throw new Error("Rol must be a string!!!!");
          },
        },
      },
    },
    { timestamps: true, createdAt: false, updatedAt: false }
  );

  module.exports = User;
};
