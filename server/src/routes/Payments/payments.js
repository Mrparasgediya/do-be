const express = require("express");
const router = express.Router();
const { stripe_key } = require("../../config");

const stripe = require("stripe")(stripe_key);

router.post("/payments/charge", async (req, res) => {
  const { amount, tokenId, orderId, customerId } = req.body;

  const options = {
    amount: parseInt(amount * 100),
    source: tokenId,
    metadata: { orderId, customerId },
    currency: "inr",
  };

  try {
    const charge = await stripe.charges.create(options);
    if (charge.status === "succeeded") {
      res.send({ paymentId: charge.id });
    } else {
      throw new Error("Payment Failed");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/payments/refund", async (req, res) => {
  const { amount, paymentId } = req.body;
  const options = {
    amount: parseInt(amount * 100),
    charge: paymentId,
  };

  try {
    const refund = await stripe.refunds.create(options);
    if (refund.status === "succeeded") {
      res.send({ status: "success" });
    } else {
      throw new Error("Payment Failed");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
