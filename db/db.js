const mongojs = require("mongojs");

const databaseUrl = "project3";
const collections = ["images"];
const db = mongojs(databaseUrl, collections);