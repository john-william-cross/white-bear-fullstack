import actions from "../actions";

export default function queue(queue = {}, action) {
   //action has two things associate with it: action.payload, action.type
   let newQueue = { ...queue };

   switch (action.type) {
      case actions.STORE_QUEUED_CARDS:
         newQueue.cards = action.payload;
         return newQueue; //what's the action payload in ReviewImagery.js? res.data, which is our array of data
      case actions.INCREMEMNT_QUEUE_INDEX:
         newQueue.index += 1;
         return newQueue;
      case actions.DECREMENT_QUEUE_INDEX:
         newQueue.index -= 1;
         return newQueue;
      case actions.RESET_QUEUE:
         newQueue.cards = [];
         newQueue.index = 0;
         return newQueue;
      case actions.UPDATE_QUEUED_CARD:

      default:
         return queue;
   }
}
