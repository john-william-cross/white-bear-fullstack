import React from "react";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import { withRouter } from "react-router-dom";
import { EMAIL_REGEX } from "../../utils/helpers";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";

class LogIn extends React.Component {
   //we can set the state in constructor
   constructor(props) {
      super(props);
      // console.log("In a new class component!");
      this.state = {
         isDisplayingInputs: false,
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   async setEmailState(emailInput) {
      const lowerCasedEmailInput = emailInput.toLowerCase();
      console.log(lowerCasedEmailInput);

      if (emailInput === "")
         this.setState({
            emailError: "Please enter your email address.",
            hasEmailError: true,
         });
      else if (EMAIL_REGEX.test(lowerCasedEmailInput) === false) {
         console.log("not a valid email");
         this.setState({
            emailError: "Please enter a valid email address.",
            hasEmailError: true,
         });
      } else {
         this.setState({ emailError: "", hasEmailError: false });
      }
   }
   async setPasswordState(passwordInput) {
      console.log(passwordInput);

      if (passwordInput === "") {
         this.setState({
            passwordError: "Please enter your password.",
            hasPasswordError: true,
         });
      } else {
         this.setState({ passwordError: "", hasPasswordError: false });
      }
   }

   async validateAndLogInUser() {
      const emailInput = document.getElementById("signup-email-input").value;
      const passwordInput = document.getElementById("signup-password-input")
         .value;
      console.log({ emailInput, passwordInput });
      await this.setEmailState(emailInput);
      await this.setPasswordState(passwordInput, emailInput);
      if (this.state.hasEmailError === false && passwordInput.length > 0) {
         const user = {
            //creating that user here
            id: getUuid(),
            email: emailInput,
            createdAt: Date.now(),
            password: passwordInput,
         };
         console.log("Created user object for POST: ", user);
         // Mimic API response:
         axios
            .get(
               "https://raw.githubusercontent.com/john-william-cross/white-bear-mpa/910aac8722e9f00ab98100e2eb50d90943f533f3/src/mock-data/user.json"
            )
            .then((res) => {
               // handle success
               const currentUser = res.data;
               console.log(currentUser);
               this.props.dispatch({
                  type: actions.UPDATE_CURRENT_USER,
                  payload: res.data,
               });
            })
            .catch((error) => {
               // handle error
               console.log(error);
            });
         //redirect the user
         this.props.history.push("/create-answer");
      }
   }

   render() {
      return (
         <div className="col-12 col-md-6">
            <div className="card ml-md-8">
               <div className="card-body text-dark font-sans-serif">
                  <h2 className="font-serif">Welcome Back</h2>
                  <p>Log in with your email address and password.</p>
                  <p className="lead text-muted mt-2">Email address</p>
                  <input
                     id="signup-email-input"
                     className={classnames({
                        "form-control": true,
                        "mb-2": true,
                        lead: true,
                        "is-invalid": this.state.emailError,
                     })}
                     type="email"
                  />
                  {this.state.hasEmailError && (
                     <p className="text-danger">{this.state.emailError}</p>
                  )}
                  <p className="lead text-muted mt-2">Password</p>

                  <input
                     id="signup-password-input"
                     className={classnames({
                        "form-control": true,
                        "text-muted": true,
                        "mt-2": true,
                        lead: true,
                        "is-invalid": this.state.hasPasswordError,
                     })}
                     type="password"
                  />
                  {this.state.hasPasswordError && (
                     <p className="text-danger">{this.state.passwordError}</p>
                  )}
                  <button
                     to="create-answer"
                     className="float-right btn btn-success btn-sm mt-2"
                     id="login-button"
                     onClick={() => {
                        this.validateAndLogInUser();
                     }}
                  >
                     Log in
                  </button>
               </div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   //Everything down here is global state
   //return whatever we want to pass from the global state into the properties
   return {}; //we don't need any redux global state, but if we do we can grab it from redux global state and map it to this props for this component. Until then we'll return a blank object.
}

export default withRouter(connect(mapStateToProps)(LogIn));
