import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Workday from "./WorkdayModel.js";

const { DataTypes } = Sequelize;

const DayOff = db.define(
  "dayoffs",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    workdayId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Workday.hasMany(DayOff);
DayOff.belongsTo(Workday, { foreignKey: "workdayId" });

export default DayOff;
