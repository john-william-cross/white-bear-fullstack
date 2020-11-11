import React from "react";
import { connect } from "react-redux";
import actions from "../../store/actions";

import AppTemplate from "../ui/AppTemplate";

class ReviewEmpty extends React.Component {
   goToPrevCard() {
      this.props.dispatch({ type: actions.DECREMENT_QUEUE_INDEX });
      this.props.history.push("/review-answer");
   }

   getMoreCards() {
      this.props.dispatch({ type: actions.RESET_QUEUE });
      this.props.history.push("/review-imagery");
   }

   render() {
      return (
         <AppTemplate>
            <p className="text-center lead text-muted my-2">Out of cards</p>

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
               <button
                  to="/review-imagery"
                  className="btn btn-outline-primary"
                  onClick={() => {
                     this.getMoreCards();
                  }}
               >
                  Get more cards
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

export default connect(mapStateToProps)(ReviewEmpty);
