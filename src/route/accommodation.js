import express from "express";
import authTenant from "../middleware/authTenant.js";
import {
  CREATE_ACCOMMODATION,
  GET_ALL_ACCOMMODATION,
  GET_ACCOMMODATION_BY_ID,
  UPDATE_ACCOMMODATION_BY_ID,
  DELETE_ACCOMMODATION_BY_ID,
} from "../controller/accomodation.js";

const router = express.Router();

router.post("/tenant/accommodations", authTenant, CREATE_ACCOMMODATION);
router.get("/tenant/accommodations", authTenant, GET_ALL_ACCOMMODATION);
router.get("/tenant/accommodations/:id", authTenant, GET_ACCOMMODATION_BY_ID);
router.put(
  "/tenant/accommodations/:id",
  authTenant,
  UPDATE_ACCOMMODATION_BY_ID
);
router.delete(
  "/tenant/accommodations/:id",
  authTenant,
  DELETE_ACCOMMODATION_BY_ID
);

export default router;
