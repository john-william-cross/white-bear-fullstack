import actions from "../actions";

export default function currentUser(currentUser = {}, action) {
   //every action has an action.type and action.payload

   switch (action.type) {
      case actions.UPDATE_CURRENT_USER:
         return action.payload;
      default:
         return currentUser;
   }
}

///awefawefasefasdfasdfwe
