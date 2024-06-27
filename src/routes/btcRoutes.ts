import express from "express";
const router = express.Router();
import {
  createWalletBTC,
  getTxByAddress,
  getTxFiltered,
  getWalletsBTC,
} from "../controllers/btcChainControllers";

router.route("/block/tx/:address").post(getTxByAddress);
router.route("/wallet").post(createWalletBTC);
router.route("/wallet").get(getWalletsBTC);
router.route("/block/wallet").get(getTxFiltered);

export default router;
