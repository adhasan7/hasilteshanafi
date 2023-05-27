import ApiSetting from "../models/ApiSettingModel.js";
import { Op } from "sequelize";

export const getApiSettings = async (req, res) => {
  try {
    let response;
    response = await ApiSetting.findAll({
      attributes: ["uuid", "http", "token"],
      order: [["createdAt", "ASC"]],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getApiSettingById = async (req, res) => {
  try {
    const apisetting = await ApiSetting.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!apisetting)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;

    response = await ApiSetting.findOne({
      attributes: ["uuid", "http", "token"],
      where: {
        id: apisetting.id,
      },
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createApiSetting = async (req, res) => {
  const { http, token } = req.body;
  try {
    await ApiSetting.create({
      http: http,
      token: token,
    });
    res.status(201).json({ msg: "ApiSetting Created Successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateApiSetting = async (req, res) => {
  try {
    const apisetting = await ApiSetting.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!apisetting)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { http, token } = req.body;
    if (req.role === "admin") {
      await ApiSetting.update(
        { http, token },
        {
          where: {
            id: apisetting.id,
          },
        }
      );
    } else {
      return res.status(403).json({ msg: "Akses terlarang" });
    }
    res.status(200).json({ msg: "ApiSetting updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteApiSetting = async (req, res) => {
  try {
    const apisetting = await ApiSetting.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!apisetting)
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    if (req.role === "admin") {
      await ApiSetting.destroy({
        where: {
          id: apisetting.id,
        },
      });
    } else {
      return res
        .status(403)
        .json({ msg: "Hanya Admin yang boleh Menghapus Data" });
    }
    res.status(200).json({ msg: "ApiSetting deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
