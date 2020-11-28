import React from "react";
import AppTemplate from "../ui/AppTemplate";
import saveIcon from "../../icons/save.svg";
import { Link } from "react-router-dom";
import toDisplayDate from "date-fns/format";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";
import { safelyParseJson } from "../../utils/helpers";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import without from "lodash/without";
import actions from "../../store/actions";
import axios from "axios";

class Edit extends React.Component {
   constructor(props) {
      super(props);

      console.log(`in the edit component`);
      this.state = {
         answerText: this.props.editableCard.card.answer,
         imageryText: this.props.editableCard.card.imagery,
         isShowingDeleteButton: false,
      };
   }

   updateState(e) {
      let value = e.target.value;
      if (value === "true" || value === "false") {
         value = safelyParseJson(value);
      }
      this.setState({ [e.target.name]: value });
   }

   checkHasInvalidCharCount() {
      if (
         this.state.imageryText.length > MAX_CARD_CHARS ||
         this.state.answerText.length > MAX_CARD_CHARS ||
         this.state.imageryText.length === 0 ||
         this.state.answerText.length === 0
      ) {
         return true;
      } else return false;
   }

   setImageryText(e) {
      this.setState({ imageryText: e.target.value });
      console.log(e.target, e.target.value);
   }

   setAnswerText(e) {
      this.setState({ answerText: e.target.value });
      console.log(e.target.value);
   }

   saveCard() {
      if (!this.checkHasInvalidCharCount()) {
         const memoryCard = { ...this.props.editableCard.card };
         memoryCard.answer = this.state.answerText;
         memoryCard.imagery = this.state.imageryText;

         // db PUT this card in our axios request
         axios
            .put(`/api/v1/memory-cards/${memoryCard.id}`, memoryCard)
            .then(() => {
               console.log("Memory card updated");

               // update redux queue
               const cards = [...this.props.queue.cards];
               cards[this.props.queue.index] = memoryCard;
               this.props.dispatch({
                  type: actions.UPDATE_QUEUED_CARDS,
                  payload: cards,
               });

               // TODO: on success, fire success overlay

               this.props.history.push(this.props.editableCard.prevRoute);
            })
            .catch((err) => {
               const { data } = err.response;
               console.log(data);
               // TODO: Display error overlay, hide error overlay after 5 seconds
            });
      } else {
         console.log("INVALID");
      }
   }

   deleteCard() {
      // TODO: delete from database
      if (this.props.editableCard.prevRoute === "/review-answer") {
         this.deleteCardFromStore();
      }
      if (this.props.editableCard.prevRoute === "/all-cards") {
         this.props.history.push("/all-cards");
      }
   }

   deleteCardFromStore() {
      const deletedCard = this.props.editableCard.card;
      const cards = this.props.queue.cards;
      const filteredCards = without(cards, deletedCard);
      console.log(filteredCards);
      this.props.dispatch({
         type: actions.UPDATE_QUEUED_CARDS,
         payload: filteredCards,
      });
      if (filteredCards[this.props.queue.index] === undefined) {
         this.props.history.push("/review-empty");
      } else {
         this.props.history.push("/review-imagery");
      }
   }

   render() {
      return (
         <AppTemplate>
            <p className="text-center lead text-muted my-2">Edit card</p>
            {isEmpty(this.props.editableCard) === false && (
               <>
                  <div className="align-items-start mb-5">
                     <div className="app-card">
                        <div className="card">
                           <div className="card-body bg-primary">
                              <textarea
                                 rows="6"
                                 defaultValue={
                                    this.props.editableCard.card.imagery
                                 }
                                 onChange={(e) => this.setImageryText(e)} //remember, "this" gives us access to the entire class
                              ></textarea>
                           </div>
                        </div>

                        <div className="card">
                           <div className="card-body bg-secondary">
                              <textarea
                                 rows="6"
                                 defaultValue={
                                    this.props.editableCard.card.answer
                                 }
                                 onChange={(e) => this.setAnswerText(e)}
                              ></textarea>
                           </div>
                        </div>

                        <p className="float-right mt-2 mb-5 text-muted">
                           {" "}
                           <span
                              className={classnames({
                                 "text-danger": checkIsOver(
                                    this.state.imageryText,
                                    MAX_CARD_CHARS
                                 ),
                              })}
                           >
                              Top: &nbsp;
                              {this.state.imageryText.length}/{MAX_CARD_CHARS}
                           </span>{" "}
                           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                           <span
                              className={classnames({
                                 "text-danger": checkIsOver(
                                    this.state.answerText,
                                    MAX_CARD_CHARS
                                 ),
                              })}
                           >
                              Bottom:&nbsp;
                              {this.state.answerText.length}/{MAX_CARD_CHARS}
                           </span>
                        </p>

                        <div className="clearfix"></div>
                     </div>
                  </div>
                  <div className="mt-n5">
                     <Link
                        to={this.props.editableCard.prevRoute}
                        className="btn btn-link mb-5"
                     >
                        Discard changes
                     </Link>
                     <button
                        className={classnames(
                           "btn btn-primary btn-lg float-right",
                           {
                              disabled: this.checkHasInvalidCharCount(),
                           }
                        )}
                        id="save-card"
                        onClick={() => {
                           this.saveCard();
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
                  </div>
                  <p className="text-center lead text-muted my-2 mb-4">
                     Card properties
                  </p>
                  <div className="row mb-1">
                     <div className="col-4">
                        <p className="text-muted">Created on:</p>
                     </div>
                     <div className="col-4">
                        <p>
                           {toDisplayDate(
                              this.props.editableCard.card.createdAt,
                              "MMM. d, y"
                           )}
                        </p>
                     </div>
                  </div>
                  <div className="row mb-1">
                     <div className="col-4">
                        <p className="text-muted">Last attempt:</p>
                     </div>
                     <div className="col-4">
                        <p>
                           {toDisplayDate(
                              this.props.editableCard.card.lastAttemptAt,
                              "MMM. d, y"
                           )}
                        </p>
                     </div>
                  </div>
                  <div className="row mb-1">
                     <div className="col-4">
                        <p className="text-muted">Next attempt:</p>
                     </div>
                     <div className="col-4">
                        <p>
                           {toDisplayDate(
                              this.props.editableCard.card.nextAttemptAt,
                              "MMM. d, y"
                           )}
                        </p>
                     </div>
                  </div>
                  <div className="row mb-1">
                     <div className="col-4">
                        <p className="text-muted">Consecutives:</p>
                     </div>
                     <div className="col-4">
                        <p>
                           {
                              this.props.editableCard.card
                                 .totalSuccessfulAttempts
                           }
                        </p>
                     </div>
                  </div>

                  <div className="custom-control custom-checkbox custom-control-inline float-left mr-0 mt-2">
                     <input
                        type="checkbox"
                        className="custom-control-input"
                        id="isShowingDeleteButton"
                        checked={this.state.isShowingDeleteButton} //we are accessing the whole class of Home, then accessing the state of it,
                        //then accessing the isAdvanced property from the state object
                        name="isShowingDeleteButton"
                        value={!this.state.isShowingDeleteButton}
                        onChange={(e) => {
                           this.updateState(e);
                           //again, this refers to the whole component
                        }}
                     />
                     <label
                        className="custom-control-label mb-2 text-muted"
                        htmlFor="isShowingDeleteButton"
                     >
                        Show delete button
                     </label>
                  </div>
                  <div className="clearfix"></div>
                  <div className="mb-4">
                     {this.state.isShowingDeleteButton && (
                        <button
                           className="btn btn-outline-danger"
                           onClick={() => {
                              this.deleteCard();
                           }}
                        >
                           Delete this card
                        </button>
                     )}
                  </div>
               </>
            )}
         </AppTemplate>
      );
   }
}

//comment
function mapStateToProps(state) {
   //Everything down here is global state
   return {
      //if you need to access something, put it here
      editableCard: state.editableCard,
      queue: state.queue,
   };
}

export default connect(mapStateToProps)(Edit);
