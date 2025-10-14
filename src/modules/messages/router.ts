import {Router} from "express";
import {getMessagesRoute} from "./getMessage/getMessage";
import {createMessageRoute} from "./createMessage/createMessage";
import handleValidationErrors from "../../middlware/handleValidationErrors";
import {validateCreateMessageRequest} from "./validation";
import {validateRemoveSkillIRequest} from "../skills/validation";
import {removeMessageRoute} from "./removeMessage/removeMessage";


export const messagesRouter = Router();

messagesRouter.get("/", getMessagesRoute);
messagesRouter.post("/", validateCreateMessageRequest, handleValidationErrors, createMessageRoute);
messagesRouter.delete("/:id", validateRemoveSkillIRequest, handleValidationErrors, removeMessageRoute);
