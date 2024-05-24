import express from "express";
const router = express.Router();
import {
  getBlock,
  getTransaction,
  getTxByAddress,
} from "../controllers/btcChainControllers";

router.route("/block/:hash").get(getBlock);
router.route("/tx/:hash").get(getTransaction);
router.route("/tx/address").post(getTxByAddress);
export default router;
