import express from "express";

import { SIGNIN, LOGIN } from "../controller/client.js";

const router = express.Router();

router.post("/client/signin", SIGNIN);
router.post("/client/login", LOGIN);

export default router;
