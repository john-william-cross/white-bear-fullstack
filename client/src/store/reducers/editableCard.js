import actions from "../actions";

export default function editableCard(editableCard = {}, action) {
   //action has two things associate with it: action.payload, action.type
   let newEditableCard = { ...editableCard };

   switch (action.type) {
      case actions.STORE_EDITABLE_CARD:
         newEditableCard.card = action.payload.card;
         newEditableCard.prevRoute = action.payload.prevRoute;
         return newEditableCard;
      default:
         return editableCard;
   }
}
