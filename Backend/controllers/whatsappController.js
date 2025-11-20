import Review from "../models/Review.js";
import { getState, setState, clearState } from "../utils/conversationState.js";

export const whatsappWebhook = async (req, res) => {
  const from = req.body.From; 
  const message = req.body.Body?.trim();

  let state = getState(from);


  if (!state) {
    setState(from, { step: "ask_product" });
    return res.send(
      `<Response><Message>Which product is this review for?</Message></Response>`
    );
  }

  
  if (state.step === "ask_product") {
    state.product_name = message;
    state.step = "ask_name";
    setState(from, state);

    return res.send(
      `<Response><Message>What's your name?</Message></Response>`
    );
  }

  
  if (state.step === "ask_name") {
    state.user_name = message;
    state.step = "ask_review";
    setState(from, state);

    return res.send(
      `<Response><Message>Please send your review for ${state.product_name}.</Message></Response>`
    );
  }

  
  if (state.step === "ask_review") {
    const reviewText = message;

    await Review.create({
      contact_number: from,
      user_name: state.user_name,
      product_name: state.product_name,
      product_review: reviewText,
    });

    clearState(from);

    return res.send(
      `<Response><Message>Thanks ${state.user_name}! Your review for ${state.product_name} is recorded.</Message></Response>`
    );
  }

 
  clearState(from);
  return res.send(
    `<Response><Message>Let's start again. Which product is this review for?</Message></Response>`
  );
};
