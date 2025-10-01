import { createContact } from "../controllers/contactController";
import express from "express";
const contactRouter = express();        

contactRouter.post("/createContact", createContact);

export default contactRouter;