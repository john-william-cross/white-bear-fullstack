// This file represents the queue resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectQueue = require("../../queries/selectQueue");
const validateJwt = require("../../utils/validateJwt");

// @route       GET api/v1/queue
// @desc        Get all memory cards for a user that are queued to occur next
// @access      Private
router.get("/", validateJwt, (req, res) => {
   // get request, post  requests.... this is where all the business logic happens in an application.

   const userId = req.user.id;

   db.query(selectQueue, userId)
      .then((memoryCards) => {
         const camelCasedMemoryCards = memoryCards.map((memoryCard) => {
            return {
               id: memoryCard.id,
               imagery: memoryCard.imagery,
               answer: memoryCard.answer,
               userId: memoryCard.user_id,
               createdAt: memoryCard.created_at,
               nextAttemptAt: memoryCard.next_attempt_at,
               lastAttemptAt: memoryCard.last_attempt_at,
               totalSuccessfulAttempts: memoryCard.total_successful_attempts,
               level: memoryCard.level,
            };
         });
         res.status(200).json(camelCasedMemoryCards);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
