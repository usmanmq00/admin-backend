const express = require("express");
const { PORT } = require("./config");
const dbConnect = require("./database/index");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const productsRoutes = require("./routes/productsRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const responseInterceptor = require("./middleware/responseInterceptor");
const bodyParser = require("body-parser");

// express app
const app = express();

// middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Response Interceptor
app.use(responseInterceptor);

// routes
app.use("/auth/admin", adminRoutes);
app.use("/auth/user", userRoutes);
app.use("/api/", productsRoutes);
app.use("/api/", categoriesRoutes);
app.use('/api/customers', require('./routes/customer'))

// inside public directory.
app.use(express.static("public"));
app.use("/images", express.static("Images"));

// connect to db
dbConnect();

// listen for requests
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});