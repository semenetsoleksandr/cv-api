import {Router} from "express";
import {createSkillRoute} from "./createSkill";
import {getSkillRoute} from "./getSkills";
import {removeSkillRoute} from "./removeSkill";
import {
    validateCreateSkillRequest, validatePatchSkillIRequest,
    validateRemoveSkillIRequest
} from "./validation";
import handleValidationErrors from "../../middlware/handleValidationErrors";
import {patchSkillRoute} from "./patchskill";

export const skillsRouter = Router()

skillsRouter.get('/', getSkillRoute);
skillsRouter.post('/', validateCreateSkillRequest, handleValidationErrors, createSkillRoute)
skillsRouter.delete('/:id', validateRemoveSkillIRequest, handleValidationErrors, removeSkillRoute)
skillsRouter.patch('/:id', validatePatchSkillIRequest, handleValidationErrors, patchSkillRoute)
