const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()
require('dotenv').config();
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  app.get('/', (req, res) => {
  res.send('Spicy Script Recipe App Server')
})
}

main().then(() => console.log("MongoDB connected successfully")).catch(err => console.log(err))

//routes

const ItemRoute = require("./src/routes/itemRoute");
const CategoryRoutes = require("./src/routes/categoryRoute");

app.use('/api', ItemRoute)
app.use('/api', CategoryRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})