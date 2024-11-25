import express from "express";

import authClient from "../middleware/authClient.js";

import {
  CREATE_BOOKING,
  GET_ALL_BOOKING,
  GET_BOOKING_BY_ID,
  DELETE_BOOKING_BY_ID,
  UPDATE_BOOKING_BY_ID,
} from "../controller/booking.js";
const router = express.Router();

router.post("/client/booking", authClient, CREATE_BOOKING);
router.get("/client/booking", authClient, GET_ALL_BOOKING);
router.get("/client/booking/:id", authClient, GET_BOOKING_BY_ID);
router.put("/client/booking/:id", authClient, UPDATE_BOOKING_BY_ID);
router.delete("/client/booking/:id", authClient, DELETE_BOOKING_BY_ID);

export default router;
