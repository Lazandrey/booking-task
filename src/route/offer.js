import express from "express";
import authTenant from "../middleware/authTenant.js";
import {
  CREATE_OFFER,
  GET_OFFER_BY_ID,
  GET_ALL_OFFER,
  DELETE_OFFER_BY_ID,
} from "../controller/offer.js";

const router = express.Router();

router.post("/tenant/offers", authTenant, CREATE_OFFER);
router.get("/tenant/offers/:id", authTenant, GET_OFFER_BY_ID);
router.get("/tenant/offers", authTenant, GET_ALL_OFFER);
router.delete("/tenant/offers/:id", authTenant, DELETE_OFFER_BY_ID);

export default router;
