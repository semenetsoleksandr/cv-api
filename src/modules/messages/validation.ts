import { body} from "express-validator";

export const validateCreateMessageRequest = [
    body("username").isString().notEmpty().withMessage("Name is required"),
    body("email").isEmail().notEmpty().withMessage("Email is required"),
    body("message").isString().notEmpty().withMessage("Message is required")
];
