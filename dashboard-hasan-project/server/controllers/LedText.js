import LedText from "../models/LedTextModel.js";
import { Op } from "sequelize";

export const getLedTexts = async (req, res) => {
  try {
    let response;
    response = await LedText.findAll({
      attributes: ["uuid", "text"],
      order: [["createdAt", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getLedTextById = async (req, res) => {
  try {
    const ledtext = await LedText.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!ledtext) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;

    response = await LedText.findOne({
      attributes: ["uuid", "text"],
      where: {
        id: ledtext.id,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createLedText = async (req, res) => {
  const { text } = req.body;
  try {
    await LedText.create({
      text: text,
    });
    res.status(201).json({ msg: "LedText Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateLedText = async (req, res) => {
  try {
    const ledtext = await LedText.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!ledtext) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { text } = req.body;
    if (req.role === "admin") {
      await LedText.update(
        { text },
        {
          where: {
            id: ledtext.id,
          },
        }
      );
    } else {
      return res.status(403).json({ msg: "Akses terlarang" });
    }
    res.status(200).json({ msg: "LedText updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteLedText = async (req, res) => {
  try {
    const ledtext = await LedText.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!ledtext) return res.status(404).json({ msg: "Data tidak ditemukan" });
    if (req.role === "admin") {
      await LedText.destroy({
        where: {
          id: ledtext.id,
        },
      });
    } else {
      return res
        .status(403)
        .json({ msg: "Hanya Admin yang boleh Menghapus Data" });
    }
    res.status(200).json({ msg: "LedText deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
