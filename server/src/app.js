const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const brandsRoutes = require("./routes/brands/brands");
const staticRoutes = require("./routes/static/static");
const itemsRoutes = require("./routes/items/items");
const collectionsRoutes = require("./routes/collections/collections");
const paymentRoutes = require("./routes/Payments/payments");
const firebaseAdminRoutes = require("./routes/firebaseAdmin/firebaseAdmin");
const contactUsRoutes = require("./routes/contactus/contactus");

app.use(brandsRoutes);
app.use(staticRoutes);
app.use(itemsRoutes);
app.use(collectionsRoutes);
app.use(paymentRoutes);
app.use(firebaseAdminRoutes);
app.use(contactUsRoutes);

module.exports = app;
