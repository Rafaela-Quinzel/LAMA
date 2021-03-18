import express from "express"
import { ShowsController } from "../ShowsController"

export const showsRouter = express.Router()

const showsController = new ShowsController()

showsRouter.put("/create", showsController.createShow)
showsRouter.get("/get-by-week-day", showsController.getShowsByWeekDay)


