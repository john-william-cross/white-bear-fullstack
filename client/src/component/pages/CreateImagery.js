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
      axios
         .get(
            "https://raw.githubusercontent.com/john-william-cross/white-bear-mpa/b54bf16d605e58a8e356a74f939fc17e46537480/src/mock-data/memory-cards.json"
         )
         .then(function (response) {
            // handle success
            console.log(response);
         })
         .catch(function (error) {
            // handle error
            console.log(error);
         });
      console.log(`in the edit component`);
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

   updateCreatableCard() {}

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
                  One morning, when Gregor Samsa woke from troubled dreams, he
                  found himself transformed in his bed into a horrible vermin.
                  He lay on his armour-like back, and if he lifted his head a
                  little he could se
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
   return {}; // we need to get the userId, so we can grab it from the redux store like so
}

export default connect(mapStateToProps)(CreateImagery);
