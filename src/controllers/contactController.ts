import { Contact } from "../models/contactModel";
import { Request, Response } from "express";
import mailerSender from "../utils/sendEmail";
import dotenv from "dotenv";
dotenv.config();

// Create a new contact message
export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, message } = req.body 

    if (!name || !email || !message) {
      res.status(400).json({ message: "Name, email, and message are required." });
      return;
    }

    // Save contact in DB
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    // 1. Notify admin
    const adminEmail = process.env.ADMIN_EMAIL ;
    if (adminEmail) {
      await mailerSender(
        adminEmail,
        "New Contact Message Received",
        `
          <h3>New Contact Message</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      );
    }

    // 2. Auto-reply to user
    await mailerSender(
      email,
      "Thank you for contacting us",
      `
        <h3>Hello ${name},</h3>
        <p>Thank you for reaching out! We’ve received your message:</p>
       
        <p>Our team will get back to you shortly.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>kLab Team</strong></p>
      `
    );

    res.status(201).json({
      message: "Contact message created successfully, confirmation email sent.",
      contact: newContact,
    });
  } catch (error) {
  
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Server Error"});
  }
};
