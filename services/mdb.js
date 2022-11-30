const { MongoClient } = require("mongodb");
require('dotenv').config()

const uri = process.env.ATLAS_URI;
const pool = new MongoClient(uri)

module.exports = pool;
