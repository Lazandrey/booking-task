import express from "express";

import { GET_ALL_OFFERLIST } from "../controller/offerlist.js";

const router = express.Router();

router.get("/offerlist", GET_ALL_OFFERLIST);

export default router;
