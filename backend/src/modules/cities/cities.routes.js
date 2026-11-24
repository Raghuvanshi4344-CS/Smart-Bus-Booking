import { Router } from "express";
import { addCityController, addStateController, getAllStatesController, getCitiesController, removeCityController, uploadCityImageController } from "./cities.controller.js";
import { authorizeRoles } from "../../middleware/roleMiddleware.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import upload from "../../middleware/multer.js";

const router = Router();

router.get("/", getCitiesController);
router.get("/states", getAllStatesController);

router.post("/states/add", authMiddleware, authorizeRoles("ADMIN","OPERATOR"), addStateController);
router.post("/add", authMiddleware, authorizeRoles("ADMIN","OPERATOR"), upload.single("image"), addCityController);
router.delete("/remove/:id", authMiddleware, authorizeRoles("ADMIN","OPERATOR"), removeCityController);
router.patch("/:id/image", authMiddleware, authorizeRoles("ADMIN"), upload.single("image"), uploadCityImageController);

export default router;