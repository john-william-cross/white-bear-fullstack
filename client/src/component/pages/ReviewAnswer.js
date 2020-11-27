import React from "react";
import thumbsUpIcon from "../../icons/thumbs-up.svg";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
// import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";

class ReviewAnswer extends React.Component {
   constructor(props) {
      super(props);
      if (this.props.queue.cards.length === 0) {
         this.props.history.push("/review-empty");
      }
   }

   updateCardWithNeedsWork() {
      this.goToNextCard();
   }

   updateCardWithGotIt() {
      // db PUT
      this.goToNextCard();
   }

   goToNextCard() {
      if (this.props.queue.index === this.props.queue.cards.length - 1) {
         // you're on the last card
         this.props.dispatch({ type: actions.INCREMEMNT_QUEUE_INDEX });
         this.props.history.push("/review-empty");
      } else {
         this.props.dispatch({ type: actions.INCREMEMNT_QUEUE_INDEX });
         this.props.history.push("/review-imagery");
      }
   }

   storeEditableCard() {
      console.log("STORING EDITABLE CARD");
      const memoryCard = this.props.queue.cards[this.props.queue.index];
      console.log("HERE's THE MEMORY CARD WE STORED", memoryCard);
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: { card: memoryCard, prevRoute: "/review-answer" },
      });
   }

   render() {
      const memoryCard = this.props.queue.cards[this.props.queue.index];

      return (
         <AppTemplate>
            <div className="mb-5"></div>
            <div className="card">
               <div className="card-body bg-primary lead">
                  {memoryCard && memoryCard.imagery}
               </div>
            </div>

            <div className="card mb-5">
               <div className="card-body bg-secondary lead">
                  {memoryCard && memoryCard.answer}
               </div>
            </div>

            <Link
               to="/edit"
               className="btn btn-link"
               onClick={() => {
                  this.storeEditableCard();
               }}
            >
               Edit
            </Link>
            <div className="float-right">
               <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                     this.updateCardWithNeedsWork();
                  }}
               >
                  Needs work
               </button>
               <button
                  className="btn btn-primary ml-4"
                  onClick={() => {
                     this.updateCardWithNeedsWork();
                  }}
               >
                  <img
                     src={thumbsUpIcon}
                     width="20px"
                     style={{ marginBottom: "5px", marginRight: "8px" }}
                     alt=""
                  />
                  Got it
               </button>
            </div>
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   //Everything down here is global state
   return {
      queue: state.queue,
   };
}

export default connect(mapStateToProps)(ReviewAnswer);
