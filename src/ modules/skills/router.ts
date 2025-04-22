import express, {Router} from "express";
import {createSkillRoute} from "./createSkill";
import {getSkillRoute} from "./getSkills";
import {removeSkillRoute} from "./removeSkill";

export const skillsRouter = Router()

skillsRouter.get('/',getSkillRoute)
skillsRouter.post('/',createSkillRoute)
skillsRouter.delete('/:id',removeSkillRoute)
