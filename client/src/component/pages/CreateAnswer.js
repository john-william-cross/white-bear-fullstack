import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { checkIsOver, MAX_CARD_CHARS } from "../../utils/helpers";
import { connect } from "react-redux";
import actions from "../../store/actions";

class CreateAnswer extends React.Component {
   constructor(props) {
      super(props);
      // console.log(`in the edit component`);
      this.state = {
         answerText: "",
      };
   }

   checkHasInvalidCharCount() {
      if (
         this.state.answerText.length > MAX_CARD_CHARS ||
         this.state.answerText.length === 0
      ) {
         return true;
      } else return false;
   }
   setAnswerText(e) {
      this.setState({ answerText: e.target.value });
      // console.log(e.target, e.target.value);
   }

   render() {
      return (
         <AppTemplate>
            <p className="text-center lead text-muted my-2">Add an answer</p>
            <div className="card">
               <div
                  className="card-body bg-primary lead"
                  id="create-answer-input"
               >
                  <textarea
                     rows="6"
                     id="create-answer-input"
                     autoFocus={true}
                     defaultValue={""}
                     onChange={(e) => this.setAnswerText(e)}
                  ></textarea>
               </div>
            </div>

            <p className="float-right mt-2 mb-5 text-muted">
               <span
                  className={classnames({
                     "text-danger": checkIsOver(
                        this.state.answerText,
                        MAX_CARD_CHARS
                     ),
                  })}
                  id="create-answer-char-count"
               >
                  {this.state.answerText.length}/{MAX_CARD_CHARS}
               </span>
            </p>
            <div className="clearfix"></div>

            <Link
               to="/create-imagery"
               id="click-next"
               className={classnames(
                  "btn btn-lg btn-outline-primary float-right",
                  { disabled: this.checkHasInvalidCharCount() }
               )}
            >
               Next
            </Link>
         </AppTemplate>
      );
   }
}

function mapStateToProps(state) {
   //Everything down here is global state
   return {};
}

export default connect(mapStateToProps)(CreateAnswer);
