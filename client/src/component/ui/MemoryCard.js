import React from "react";
import { Link } from "react-router-dom";
import editIcon from "../../icons/edit.svg";
import { connect } from "react-redux";
import actions from "../../store/actions";

class MemoryCard extends React.Component {
   storeEditableCard() {
      console.log("STORING EDITABLE CARD");
      this.props.dispatch({
         type: actions.STORE_EDITABLE_CARD,
         payload: { card: this.props.card, prevRoute: "/all-cards" },
      });
   }

   render() {
      return (
         <div className="d-flex align-items-start mb-5">
            <div className="app-card flex-fill">
               <div className="card">
                  <div className="card-body bg-primary">
                     {this.props.card.imagery}
                  </div>
               </div>

               <div className="card">
                  <div className="card-body bg-secondary">
                     {this.props.card.answer}
                  </div>
               </div>
            </div>

            <Link
               to="/edit"
               className="btn btn-link ml-4 d-flex mt-n2"
               onClick={() => {
                  this.storeEditableCard();
               }}
            >
               <img
                  src={editIcon}
                  className="d-inline"
                  alt=""
                  style={{
                     marginTop: "2px",
                     marginRight: "8px",
                  }}
                  width="20px"
               />
               Edit
            </Link>
         </div>
      );
   }
}

function mapStateToProps(state) {
   //Everything down here is global state
   return {};
}

export default connect(mapStateToProps)(MemoryCard);
