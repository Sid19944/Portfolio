import { Router } from "express";
import {
  addTimeLine,
  editTimeLine,
  deleteTimeLine,
  allTimeLine,
  getOne,
} from "../controllers/timeLine.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/add").post(addTimeLine);
router.route("/one/:id").get(getOne);
router.route("/edit/:id").put(editTimeLine);
router.route("/delete/:id").delete(deleteTimeLine);
router.route("/all").get(allTimeLine);

export default router;
