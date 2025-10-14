import { body, param } from "express-validator";

export const validateCreateSkillRequest = [
    body("skill").isString().notEmpty().withMessage("Name is required"),
];

export const validateRemoveSkillIRequest = [
    param("id").isInt().withMessage("ID must be an integer"),
];

export const validatePatchSkillIRequest = [
    ...validateCreateSkillRequest,
    ...validateRemoveSkillIRequest,
];
