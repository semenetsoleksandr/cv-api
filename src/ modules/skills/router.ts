import express, {Router} from "express";
import {createSkillRoute} from "./createSkill";
import {getSkillRoute} from "./getSkills";
import {removeSkillRoute} from "./removeSkill";
import {
    validateCreateSkillRequest,
    validateRemoveSkillIRequest
} from "./validation";
import handleValidationErrors from "../middlware/handleValidationErrors";

export const skillsRouter = Router()

skillsRouter.get('/',getSkillRoute);
skillsRouter.post('/',validateCreateSkillRequest,handleValidationErrors, createSkillRoute)
skillsRouter.delete('/:id',validateRemoveSkillIRequest,handleValidationErrors,removeSkillRoute)
