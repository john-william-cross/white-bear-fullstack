import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";

//comment for commit

class ReviewImagery extends React.Component {
   constructor(props) {
      super(props);
      if (props.queue.cards.length === 0) {
         console.log("Empty array of queue cards");
         axios
            .get(`/api/v1/queue`)

            .then((res) => {
               // handle success
               const cards = res.data;
               console.log(res);
               props.dispatch({
                  type: actions.UPDATE_QUEUED_CARDS,
                  payload: cards,
               });
            })
            .catch((error) => {
               // handle error
               console.log(error);
            });
      }
      //commit comment
      if (props.queue.index > props.queue.cards.length) {
         this.props.history.push("/review-empty");
      }
   }

   goToPrevCard() {
      this.props.dispatch({
         type: actions.DECREMENT_QUEUE_INDEX,
      });
      this.props.history.push("/review-answer");
   }

   render() {
      const memoryCard = this.props.queue.cards[this.props.queue.index];
      return (
         <AppTemplate>
            <div className="mb-5"></div>

            {memoryCard && ( //ONLY IF THERE"S A MEMORY CARD, DO ALL THIS OTHER STUFF... DO THIS FOR ASK A TEACHER QUESTIONS PAGE?
               <>
                  <div className="card mb-5">
                     <div className="card-body bg-primary lead">
                        {memoryCard && memoryCard.imagery}
                        {/* if this evaluates to true, do the second thing. if false, done. */}
                     </div>
                  </div>
                  {this.props.queue.index > 0 && (
                     <button
                        className="btn btn-link"
                        onClick={() => {
                           this.goToPrevCard();
                        }}
                     >
                        Previous card
                     </button>
                  )}

                  <div className="float-right">
                     <Link
                        to="review-answer"
                        type="button"
                        className="btn btn-outline-primary"
                     >
                        Show Answer
                     </Link>
                  </div>
               </>
            )}
            {!memoryCard && (
               <p className="lead text-muted text-center">
                  You have 0 cards. Please create a card before reviewing.
               </p>
            )}
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

export default connect(mapStateToProps)(ReviewImagery);
