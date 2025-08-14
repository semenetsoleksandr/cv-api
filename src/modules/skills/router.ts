import { Router } from "express";
import { createSkillRoute } from "./createSkill/createSkill";
import { getSkillRoute } from "./getSkills/getSkills";
import { removeSkillRoute } from "./removeSkill/removeSkill";
import {
    validateCreateSkillRequest,
    validatePatchSkillIRequest,
    validateRemoveSkillIRequest,
} from "./validation";
import handleValidationErrors from "../../middlware/handleValidationErrors";
import { patchSkillRoute } from "./patchSkil/patchSkill";

export const skillsRouter = Router();

skillsRouter.get("/", getSkillRoute);
skillsRouter.post("/", validateCreateSkillRequest, handleValidationErrors, createSkillRoute);
skillsRouter.delete("/:id", validateRemoveSkillIRequest, handleValidationErrors, removeSkillRoute);
skillsRouter.patch("/:id", validatePatchSkillIRequest, handleValidationErrors, patchSkillRoute);
