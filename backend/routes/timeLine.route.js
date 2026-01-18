import { Router } from "express";
import {
  addTimeLine,
  editTimeLine,
  deleteTimeLine,
  allTimeLine,
  getOne,
} from "../controllers/timeLine.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/add").post(verifyJWT,addTimeLine);
router.route("/one/:id").get(getOne);
router.route("/edit/:id").put(verifyJWT,editTimeLine);
router.route("/delete/:id").delete(verifyJWT,deleteTimeLine);
router.route("/all").get(verifyJWT,allTimeLine);

export default router;
