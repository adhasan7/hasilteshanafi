import DayOff from "../models/DayOffModel.js";
import { Op } from "sequelize";
import Workday from "../models/WorkdayModel.js";
import moment from "moment";

export const getDayOffs = async (req, res) => {
  try {
    let response;
    response = await DayOff.findAll({
      attributes: ["uuid", "workdayId", "date"],
      order: [["createdAt", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getDayOffByDate = async (req, res) => {
  try {
    const { id, date } = req.params;

    const dayoff = await DayOff.findOne({
      where: {
        workdayId: id,
        date: new Date(date).toISOString(),
      },
    });

    if (!dayoff)
      return res
        .status(200)
        .json({ msg: "Data tidak ditemukan", status: false });
    if (dayoff)
      return res
        .status(200)
        .json({ msg: "Data tidak ditemukan", status: true });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getDayOffById = async (req, res) => {
  try {
    const dayoff = await DayOff.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!dayoff) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;

    response = await DayOff.findOne({
      attributes: ["uuid", "workdayId", "date"],
      where: {
        id: dayoff.id,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createDayOff = async (req, res) => {
  const { workdayId, date } = req.body;
  try {
    const workday = await Workday.findOne({
      attributes: ["startDate", "endDate"],
      where: {
        id: req.body.workdayId,
      },
    });

    if (!workday) {
      return res.status(404).json({ msg: "Workday tidak ditemukan" });
    }

    var start = moment(workday.startDate).format("YYYY-MM-DD");
    var end = moment(workday.endDate).format("YYYY-MM-DD");

    if (req.body.date < start || req.body.date > end) {
      return res.status(404).json({ msg: "Tanggal tidak dalam jangkauan" });
    }

    await DayOff.create({
      workdayId: workdayId,
      date: date,
    });
    res.status(201).json({ msg: "DayOff Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateDayOff = async (req, res) => {
  try {
    const dayoff = await DayOff.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!dayoff) return res.status(404).json({ msg: "Data tidak ditemukan" });
    // TODO:
    const { workdayId, date } = req.body;
    if (req.role === "admin") {
      await DayOff.update(
        { workdayId: workdayId, date: date },
        {
          where: {
            id: dayoff.id,
          },
        }
      );
    } else {
      return res.status(403).json({ msg: "Akses terlarang" });
    }
    res.status(200).json({ msg: "DayOff updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteDayOff = async (req, res) => {
  try {
    const dayoff = await DayOff.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!dayoff) return res.status(404).json({ msg: "Data tidak ditemukan" });
    if (req.role === "admin") {
      await DayOff.destroy({
        where: {
          id: dayoff.id,
        },
      });
    } else {
      return res
        .status(403)
        .json({ msg: "Hanya Admin yang boleh Menghapus Data" });
    }
    res.status(200).json({ msg: "DayOff deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
