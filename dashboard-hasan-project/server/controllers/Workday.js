import Workday from "../models/WorkdayModel.js";
import DayOff from "../models/DayOffModel.js";
import { Op } from "sequelize";

export const getWorkdays = async (req, res) => {
  try {
    let response;
    response = await Workday.findAll({
      attributes: ["uuid", "startDate", "endDate", "count", "type"],
      order: [["createdAt", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getWorkdayById = async (req, res) => {
  try {
    const workday = await Workday.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!workday) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;

    response = await Workday.findOne({
      attributes: ["uuid", "startDate", "endDate", "count", "type"],
      where: {
        id: workday.id,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createWorkday = async (req, res) => {
  const { startDate, endDate, count, type } = req.body;
  try {
    await Workday.create({
      startDate: startDate,
      endDate: endDate,
      count: count,
      type: type,
    });
    res.status(201).json({ msg: "Workday Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateWorkday = async (req, res) => {
  try {
    const workday = await Workday.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!workday) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { startDate, endDate, count, type } = req.body;
    await Workday.update(
      { startDate: startDate, endDate: endDate, count: count, type: type },
      {
        where: {
          id: workday.id,
        },
      }
    );
    await DayOff.destroy({
      where: {
        workdayId: workday.id,
        date: {
          [Op.notBetween]: [startDate, endDate],
        },
      },
    });
    res.status(200).json({ msg: "Workday updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteWorkday = async (req, res) => {
  try {
    const workday = await Workday.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!workday) return res.status(404).json({ msg: "Data tidak ditemukan" });
    if (req.role === "admin") {
      await Workday.destroy({
        where: {
          id: workday.id,
        },
      });
      await DayOff.destroy({
        where: {
          workdayId: workday.id,
        },
      });
    } else {
      return res
        .status(403)
        .json({ msg: "Hanya Admin yang boleh Menghapus Data" });
    }
    res.status(200).json({ msg: "Workday deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
