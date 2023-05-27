import DateTime from "../models/DateTimeModel.js";
import { Op } from "sequelize";

export const getDateTimes = async (req, res) => {
  try {
    let response;
    response = await DateTime.findAll({
      attributes: ["uuid", "date", "month", "year", "time"],
      order: [["createdAt", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getDateTimeById = async (req, res) => {
  try {
    const datetime = await DateTime.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!datetime) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;

    response = await DateTime.findOne({
      attributes: ["uuid", "date", "month", "year", "time"],
      where: {
        id: datetime.id,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createDateTime = async (req, res) => {
  const { date, month, year, time } = req.body;
  try {
    await DateTime.create({
      date: date,
      month: month,
      year: year,
      time: time,
    });
    res.status(201).json({ msg: "DateTime Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateDateTime = async (req, res) => {
  try {
    const datetime = await DateTime.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!datetime) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { date, month, year, time } = req.body;
    if (req.role === "admin") {
      await DateTime.update(
        { date, month, year, time },
        {
          where: {
            id: datetime.id,
          },
        }
      );
    } else {
      return res.status(403).json({ msg: "Akses terlarang" });
    }
    res.status(200).json({ msg: "DateTime updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteDateTime = async (req, res) => {
  try {
    const datetime = await DateTime.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!datetime) return res.status(404).json({ msg: "Data tidak ditemukan" });
    if (req.role === "admin") {
      await DateTime.destroy({
        where: {
          id: datetime.id,
        },
      });
    } else {
      return res
        .status(403)
        .json({ msg: "Hanya Admin yang boleh Menghapus Data" });
    }
    res.status(200).json({ msg: "DateTime deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
