// This file represents the memory-cards resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllCards = require("../../queries/selectAllCards");

// @route       GET api/v1/memory_cards
//@desc         Get all memory cards for a user by search term and order
//@access       PUBLIC
router.get("/", (req, res) => {
   db.query(
      selectAllCards(
         "f79eddaf-f93d-4e49-8977-24a0681932b0",
         "to",
         "`memory_cards`.`created_at` DESC"
      )
   )
      .then((dbRes) => {
         console.log(dbRes);
         res.json(dbRes);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
