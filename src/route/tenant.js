import express from "express";

import { SIGNIN, LOGIN } from "../controller/tenant.js";

const router = express.Router();

router.post("/tenant/signin", SIGNIN);
router.post("/tenant/login", LOGIN);

export default router;
