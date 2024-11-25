import express from "express";
import authTenant from "../middleware/authTenant.js";
import {
  CREATE_OFFER,
  GET_OFFER_BY_ID,
  GET_ALL_OFFER,
} from "../controller/offer.js";

const router = express.Router();

router.post("/tenant/offers", authTenant, CREATE_OFFER);
router.get("/tenant/offers/:id", authTenant, GET_OFFER_BY_ID);
router.get("/tenant/offers", authTenant, GET_ALL_OFFER);

export default router;
