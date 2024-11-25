import { v4 as uuidv4 } from "uuid";
import accommodationModel from "../model/accommodation.js";
import tenantModel from "../model/tenant.js";

import { isValidCreateAccommodation } from "../utils/validations.js";

const CREATE_ACCOMMODATION = async (req, res) => {
  const tenant = await tenantModel.findOne({ id: req.body.tenantId });
  const errors = await isValidCreateAccommodation(req.body);

  if (errors.length > 0) {
    return res
      .status(400)
      .json({ message: "we have some problems", errors: errors });
  }

  const newAccommodation = {
    id: uuidv4(),

    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    address: {
      apartmentNo: req.body.address.apartmentNo,
      houseNo: req.body.address.houseNo,
      street: req.body.address.street,
      city: req.body.address.city,
      country: req.body.address.country,
    },
    price: req.body.price,
    area: req.body.area,
    roomsNo: req.body.roomsNo,
    floorNo: req.body.floorNo,
    isDeleted: false,
    tenant,
  };

  try {
    const accommodation = new accommodationModel(newAccommodation);
    const response = await accommodation.save();

    tenant.accommodations.push(accommodation);
    await tenant.save();
    return res.status(201).json({
      response: "Accommodation was created successfully",
      accomodation: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const GET_ALL_ACCOMMODATION = async (req, res) => {
  try {
    let options = {};
    let query = {};

    if (req.query.qty) {
      options.limit = Number(req.query.qty);
    } else {
      options.limit = 10;
    }

    const tenantAccommodations = await tenantModel.findOne(
      { id: req.body.tenantId },
      { accommodations: 1 }
    );

    query = {
      _id: { $in: tenantAccommodations.accommodations },
      isDeleted: false,
    };

    const results = await accommodationModel.find(query, {}, options);
    if (results.length === 0) {
      return res.status(200).json({ response: "Data not exist" });
    }

    return res.status(200).json({
      response: "success",
      accommodations: results,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const GET_ACCOMMODATION_BY_ID = async (req, res) => {
  try {
    const accommodation = await accommodationModel.findOne({
      id: req.params.id,
      isDeleted: false,
    });
    if (!accommodation) {
      return res.status(404).json({ response: "Data not exist" });
    }
    const tenant = await tenantModel.findOne({
      id: req.body.tenantId,
      deleted: false,
    });

    if (!accommodation.tenant.equals(tenant._id)) {
      return res.status(403).json({ response: "Forbidden" });
    }

    return res
      .status(200)
      .json({ responce: "Ok", accommodation: accommodation });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};
const UPDATE_ACCOMMODATION_BY_ID = async (req, res) => {
  try {
    const accommodation = await accommodationModel.findOne({
      id: req.params.id,
      isDeleted: false,
    });
    if (!accommodation) {
      return res.status(404).json({ responce: "Data not exist" });
    }
    const tenant = await tenantModel.findOne({ id: req.body.tenantId });

    if (!accommodation.tenant.equals(tenant._id)) {
      return res.status(403).json({ responce: "Forbidden" });
    }
    const updatedAccommodation = await accommodationModel.updateOne(
      {
        id: req.params.id,
      },
      { ...req.body }
    );
    if (!updatedAccommodation) {
      return res.status(404).json({ responce: "Data not exist" });
    }
    return res
      .status(200)
      .json({ responce: "Accommodation was updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const DELETE_ACCOMMODATION_BY_ID = async (req, res) => {
  try {
    const accommodation = await accommodationModel.findOne({
      id: req.params.id,
      isDeleted: false,
    });
    if (!accommodation) {
      return res.status(404).json({ responce: "Data not exist" });
    }
    const tenant = await tenantModel.findOne({ id: req.body.tenantId });

    if (!accommodation.tenant.equals(tenant._id)) {
      return res.status(403).json({ responce: "Forbidden" });
    }
    const response = await accommodationModel.findOneAndDelete({
      id: req.params.id,
    });
    if (!response) {
      return res.status(404).json({ responce: "Data not exist" });
    }
    return res.status(200).json({
      responce: "Accommodation was deleted successfully",
      accommodation: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

export {
  CREATE_ACCOMMODATION,
  GET_ALL_ACCOMMODATION,
  GET_ACCOMMODATION_BY_ID,
  UPDATE_ACCOMMODATION_BY_ID,
  DELETE_ACCOMMODATION_BY_ID,
};
