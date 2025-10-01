"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContact = void 0;
const contactModel_1 = require("../models/contactModel");
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create a new contact message
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !message) {
            res.status(400).json({ message: "Name, email, and message are required." });
            return;
        }
        // Save contact in DB
        const newContact = new contactModel_1.Contact({ name, email, phone, message });
        yield newContact.save();
        // 1. Notify admin
        const adminEmail = process.env.ADMIN_EMAIL;
        if (adminEmail) {
            yield (0, sendEmail_1.default)(adminEmail, "New Contact Message Received", `
          <h3>New Contact Message</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `);
        }
        // 2. Auto-reply to user
        yield (0, sendEmail_1.default)(email, "Thank you for contacting us", `
        <h3>Hello ${name},</h3>
        <p>Thank you for reaching out! We’ve received your message:</p>
       
        <p>Our team will get back to you shortly.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>kLab Team</strong></p>
      `);
        res.status(201).json({
            message: "Contact message created successfully, confirmation email sent.",
            contact: newContact,
        });
    }
    catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.createContact = createContact;
