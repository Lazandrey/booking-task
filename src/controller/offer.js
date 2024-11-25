import { v4 as uuidv4 } from "uuid";
import accommodationModel from "../model/accommodation.js";
import tenantModel from "../model/tenant.js";
import offerModel from "../model/offer.js";
import offerListModel from "../model/offerlist.js";
import { isValidCreateOffer } from "../utils/validations.js";

const CREATE_OFFER = async (req, res) => {
  try {
    const accommodation = await accommodationModel.findOne({
      _id: req.body.accommodation,
      isDeleted: false,
    });

    if (!accommodation) {
      return res.status(404).json({ responce: "Data not exist" });
    }
    const tenant = await tenantModel.findOne({ id: req.body.tenantId });
    if (!accommodation.tenant.equals(tenant._id)) {
      return res.status(403).json({ responce: "Forbidden" });
    }
    const errors = await isValidCreateOffer(req.body);

    if (errors.length > 0) {
      return res
        .status(400)
        .json({ message: "we have some problems", errors: errors });
    }
    const newOffer = {
      id: uuidv4(),
      price: req.body.price,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      tenant,
      accommodation,
    };

    const offer = new offerModel(newOffer);
    const response = await offer.save();

    const newofferList = {
      id: uuidv4(),
      price: offer.price * process.env.SERVICE_FEE,
      startDate: offer.startDate,
      endDate: offer.endDate,
      offer,
      isDeleted: false,
    };

    const offerList = new offerListModel(newofferList);
    await offerList.save();

    return res
      .status(201)
      .json({ responce: "Offer was created successfully", offer: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};
const GET_OFFER_BY_ID = async (req, res) => {
  try {
    const offer = await offerModel.findOne({
      id: req.params.id,
      isDeleted: false,
    });
    if (!offer) {
      return res.status(404).json({ responce: "Data not exist" });
    }
    const tenant = await tenantModel.findOne({ id: req.body.tenantId });
    if (!offer.tenant.equals(tenant._id)) {
      return res.status(403).json({ responce: "Forbidden" });
    }
    return res.status(200).json({ responce: "Ok", offer: offer });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};
const GET_ALL_OFFER = async (req, res) => {
  try {
    const tenant = await tenantModel.findOne({ id: req.body.tenantId });

    const offers = await offerModel.find({
      tenant: tenant._id,
      isDeleted: false,
    });
    return res.status(200).json({ responce: "Ok", offers: offers });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

const DELETE_OFFER_BY_ID = async (req, res) => {
  const offer = await offerModel.findOne({
    id: req.params.id,
    isDeleted: false,
  });
  if (!offer) {
    return res.status(404).json({ responce: "Data not exist" });
  }
  const tenant = await tenantModel.findOne({ id: req.body.tenantId });
  if (!offer.tenant.equals(tenant._id)) {
    return res.status(403).json({ responce: "Forbidden" });
  }
  try {
    offer.isDeleted = true;
    await offer.save();
    return res.status(200).json({ responce: "Offer was deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

export { CREATE_OFFER, GET_OFFER_BY_ID, GET_ALL_OFFER, DELETE_OFFER_BY_ID };
