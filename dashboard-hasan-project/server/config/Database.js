import { Sequelize } from "sequelize";

const db = new Sequelize("mowilex_led", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
