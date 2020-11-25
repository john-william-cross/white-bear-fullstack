import actions from "../actions";

export default function creatableCard(creatableCard = {}, action) {
   //action has two things associate with it: action.payload, action.type
   let newCreatableCard = { ...creatableCard };

   switch (action.type) {
      case actions.STORE_CREATABLE_CARD:
         return action.payload;
      default:
         return newCreatableCard;
   }
}
