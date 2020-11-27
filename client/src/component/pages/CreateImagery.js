import React from "react";
import saveIcon from "../../icons/save.svg";
import AppTemplate from "../ui/AppTemplate";
import memoryCards from "../../mock-data/memory-cards";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";

const memoryCard = memoryCards[3];

class CreateImagery extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         answerText: memoryCard.answer,
         imageryText: "",
      };
   }
   checkHasInvalidCharCount() {
      if (
         this.state.imageryText.length > MAX_CARD_CHARS ||
         this.state.imageryText.length === 0
      ) {
         return true;
      } else return false;
   }

   setImageryText(e) {
      this.setState({ imageryText: e.target.value });

      console.log(e.target, e.target.value);
   }

   async updateCreatableCard() {
      if (!this.checkHasInvalidCharCount()) {
         console.log("UPDATING CREATABLE CARD");
         const {
            id,
            answer,
            userId,
            createdAt,
            nextAttemptAt,
            lastAttemptAt,
            totalSuccessfulAttempts,
            level,
         } = this.props.creatableCard;
         await this.props.dispatch({
            type: actions.UPDATE_CREATABLE_CARD,
            payload: {
               // the card itself
               id,
               answer,
               imagery: this.state.imageryText,
               userId,
               createdAt,
               nextAttemptAt,
               lastAttemptAt,
               totalSuccessfulAttempts,
               level,
            },
         });
         // save to the database (make an API call)
         axios
            .post("/api/v1/memory-cards", this.props.creatableCard)
            .then(() => {
               console.log("Memory card created");
               // TODO: Display success overlay
               // Clear creatableCard from redux
               this.props.dispatch({
                  type: actions.UPDATE_CREATABLE_CARD,
                  payload: {
                     //blank object clears creatableCard
                  },
               });
               // route to "/create-answer"
               this.props.history.push("/create-answer");
            })
            .catch((err) => {
               const { data } = err.response;
               console.log(data);
               // TODO: Display error overlay, hide error overlay after 5 seconds
            });
      }
   }

   render() {
      return (
         <AppTemplate>
            <p className="text-center lead text-muted my-2">
               Add memorable imagery
            </p>
            <div className="card">
               <div className="card-body bg-primary lead">
                  <textarea
                     rows="6"
                     id="create-imagery-input"
                     autoFocus={true}
                     defaultValue={""} //should this be blank string or memoryCard.imagery??
                     onChange={(e) => this.setImageryText(e)}
                  ></textarea>
               </div>
            </div>
            <div className="card">
               <div className="card-body bg-secondary lead">
                  {this.props.creatableCard.answer}
               </div>
            </div>
            <p className="text-muted float-right mt-2 mb-5">
               <span
                  className={classnames({
                     "text-danger": checkIsOver(
                        this.state.imageryText,
                        MAX_CARD_CHARS
                     ),
                  })}
               >
                  {console.log(this.state.imageryText.length)}
                  {this.state.imageryText.length}/{MAX_CARD_CHARS}
               </span>
            </p>{" "}
            <div className="clearfix"></div>
            <Link
               to="create-answer"
               className="btn btn-link"
               id="back-to-answer-error"
            >
               Back to answer
            </Link>
            <button
               className={classnames("btn btn-primary btn-lg float-right", {
                  disabled: this.checkHasInvalidCharCount(),
               })}
               onClick={() => {
                  this.updateCreatableCard();
               }}
            >
               <img
                  src={saveIcon}
                  alt=""
                  width="20px"
                  style={{
                     marginBottom: "3px",
                     marginRight: "4px",
                     marginLeft: "-5px",
                  }}
               />
               Save
            </button>
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   //Everything down here is global state
   return { creatableCard: state.creatableCard }; // we need to get the state of creatableCard, so we can grab it from the redux store like so
}

export default connect(mapStateToProps)(CreateImagery);
