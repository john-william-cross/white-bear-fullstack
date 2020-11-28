// This file represents the memory-cards resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllCards = require("../../queries/selectAllCards");
const insertMemoryCard = require("../../queries/insertMemoryCards");
const validateJwt = require("../../utils/validateJwt");
const updateMemoryCard = require("../../queries/updateMemoryCard");

// @route       GET api/v1/memory_cards
// @desc        Get all memory cards for a user by search term and order
// @access      Private
router.get("/", validateJwt, (req, res) => {
   // get request, post  requests.... this is where all the business logic happens in an application.
   console.log(req.query);
   const { searchTerm, order } = req.query;
   const userId = req.user.id;
   let constructedSearchTerm;
   if (searchTerm === "" || searchTerm === undefined) {
      constructedSearchTerm = "%%";
   } else {
      constructedSearchTerm = `%${searchTerm}%`;
   }
   /* https://www.npmjs.com/package/mysql#escaping-query-values */
   db.query(selectAllCards, [
      userId,
      constructedSearchTerm,
      constructedSearchTerm,
      { toSqlString: () => order },
   ])
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
         return res.status(200).json(camelCasedMemoryCards);
      })
      .catch((err) => {
         console.log(err);
         return res.status(400).json(err);
      });
});

// @route       POST api/v1/memory_cards
// @desc        POST a memory card to the memory cards resource
// @access      Private
router.post("/", validateJwt, (req, res) => {
   const user = req.user;
   console.log(user);
   const {
      id,
      imagery,
      answer,
      createdAt,
      nextAttemptAt,
      lastAttemptAt,
      totalSuccessfulAttempts,
      level,
   } = req.body;
   const memoryCard = {
      id,
      imagery,
      answer,
      user_id: user.id,
      created_at: createdAt,
      next_attempt_at: nextAttemptAt,
      last_attempt_at: lastAttemptAt,
      total_successful_attempts: totalSuccessfulAttempts,
      level,
   };
   console.log(memoryCard);
   db.query(insertMemoryCard, memoryCard)
      .then((dbRes) => {
         // success
         console.log("created memory card in the db", dbRes);
         // return with a status response
         return res.status(200).json({ success: "card created." });
      })
      .catch((err) => {
         console.log(err);
         const dbError = `${err.code} ${err.sqlMessage}`;
         return res.status(400).json({ dbError });
      });
});

// @route       PUT api/v1/memory_cards/:id
// @desc        Update a memory card in the memory cards resource
// @access      Private
router.put("/:id", validateJwt, (req, res) => {
   const id = req.params.id;
   const user = req.user;
   const {
      imagery,
      answer,
      createdAt,
      nextAttemptAt,
      lastAttemptAt,
      totalSuccessfulAttempts,
      level,
   } = req.body;
   const memoryCard = {
      id,
      imagery,
      answer,
      user_id: user.id,
      created_at: createdAt,
      next_attempt_at: nextAttemptAt,
      last_attempt_at: lastAttemptAt,
      total_successful_attempts: totalSuccessfulAttempts,
      level,
   };
   console.log(memoryCard);

   db.query(updateMemoryCard, [memoryCard, id])
      .then((dbRes) => {
         // success
         console.log("updated memory card in the db", dbRes);
         // return with a status response
         return res.status(200).json({ success: "card updated." });
      })
      .catch((err) => {
         console.log(err);
         const dbError = `${err.code} ${err.sqlMessage}`;
         return res.status(400).json({ dbError });
      });
});

// @route       DELETE api/v1/memory_cards/:id
// @desc        Delete a memory card from the memory cards resource by id
// @access      Private
router.delete("/:id", validateJwt, (req, res) => {
   const id = req.params.id;
   db.query(deleteMemoryCardById, id)
      .then(() => {
         return res.status(200).json({ success: "card deleted" });
      })
      .catch(() => {
         console.log(err);
         const dbError = `${err.code} ${err.sqlMessage}`;
         return res.status(500).json({ dbError });
      });
});
module.exports = router;
