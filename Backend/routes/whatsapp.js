import express from "express";
import Review from "../models/Review.js";
import twilio from "twilio";
import { getState, setState, clearState } from "../utils/conversationState.js";

const router = express.Router();
const MessagingResponse = twilio.twiml.MessagingResponse;



router.post("/webhook/whatsapp", async (req, res) => {
  try {
    console.log("WEBHOOK HIT:", req.body);

    
    const incoming = (req.body.Body || "").trim();
    const from = req.body.From; 
    const profileName = req.body.ProfileName || "";

   
    let state = getState(from);

   
    const reply = (text) => {
      const twiml = new MessagingResponse();
      twiml.message(text);
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
    };

  
    const lc = incoming.toLowerCase();
    if (!state || lc === "hi" || lc === "hello" || lc === "start") {
      setState(from, { step: "ask_name" });
      return reply("Hi! Let's save your product review. What is your name?");
    }

   
    if (state.step === "ask_name") {
      const userName = incoming || profileName || "User";
      state.user_name = userName;
      state.step = "ask_product";
      setState(from, state);
      return reply(`Nice to meet you, ${userName}. Which product is this review for?`);
    }

    if (state.step === "ask_product") {
      const product = incoming || "Unknown Product";
      state.product_name = product;
      state.step = "ask_review";
      setState(from, state);
      return reply(`Got it — ${product}. Please type your review for ${product}.`);
    }

    if (state.step === "ask_review") {
      const reviewText = incoming || "";
     
      const payload = {
        contact_number: from,
        user_name: state.user_name || profileName || "User",
        product_name: state.product_name || "Unknown Product",
        product_review: reviewText,
      };

     
      try {
        await Review.create(payload);
      } catch (dbErr) {
        console.error("DB SAVE ERROR:", dbErr);
       
        const twiml = new MessagingResponse();
        twiml.message("Sorry, I couldn't save your review. Please try again later.");
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
        return;
      }

     
      clearState(from);
      const user = payload.user_name;
      const product = payload.product_name;
      const twiml = new MessagingResponse();
      twiml.message(`Thanks ${user}! Your review for ${product} is saved 👍`);
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
      return;
    }

   
    setState(from, { step: "ask_name" });
    return reply("Let's start again. What is your name?");
  } catch (err) {
    console.error("WEBHOOK ERROR:", err);
   
    const twiml = new MessagingResponse();
    twiml.message("Oops — something went wrong. Please try again in a moment.");
    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
  }
});

export default router;
