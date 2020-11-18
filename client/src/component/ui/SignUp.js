import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import actions from "../../store/actions";

//functions go in react classes
class SignUp extends React.Component {
   //we can set the state in constructor
   constructor(props) {
      super(props);
      this.state = {
         isDisplayingInputs: false,
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   showInputs() {
      this.setState({
         isDisplayingInputs: true,
      });
   }

   async validateAndCreateUser() {
      const emailInput = document.getElementById("signup-email-input").value;
      const passwordInput = document.getElementById("signup-password-input")
         .value;

      // create user obj
      const user = {
         id: getUuid(),
         email: emailInput,
         password: passwordInput,
         createdAt: Date.now(),
      };
      console.log("Created user object for POST: ", user);

      // post to API
      axios
         .post("/api/v1/users", user)
         .then((res) => {
            console.log(res.data);
            // Update currentUser in global state w/ API response
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: res.data,
            });
            this.props.history.push("/create-answer");
         })
         .catch((err) => {
            const { data } = err.response;
            console.log(data);
            const { emailError, passwordError } = data;
            if (emailError !== "") {
               this.setState({ hasEmailError: true, emailError });
            } else {
               this.setState({ hasEmailError: false, emailError });
            }
            if (passwordError !== "") {
               this.setState({ hasPasswordError: true, passwordError });
            } else {
               this.setState({ hasPasswordError: false, passwordError });
            }
         });
   }

   render() {
      return (
         <div className="col-12 col-md-6 mb-8">
            <div className="card">
               <div className="card-body text-dark font-sans-serif">
                  <div className="landing-page">
                     <div className="show-sign-up-info">
                        <h2 className="font-serif">Nice to meet you</h2>
                        <p className="mt-2 mb-2">
                           Sign up for White Bear. Free forever.
                        </p>

                        {!this.state.isDisplayingInputs && (
                           <Link
                              to=""
                              className="sign-up-prompt btn btn-block btn-success btn-sm mt-4"
                              onClick={() => {
                                 this.showInputs();
                              }}
                           >
                              Sign up
                           </Link>
                        )}
                     </div>
                     <div className="email-and-create-password ">
                        {this.state.isDisplayingInputs && (
                           <>
                              <p className="sign-up mt-1 mb-3">
                                 Let's get you signed up.
                              </p>
                              <p className="lead mt-2">Email address</p>

                              <input
                                 id="signup-email-input"
                                 className={classnames({
                                    "form-control": true,
                                    "mb-2": true,
                                    "is-invalid": this.state.emailError,
                                 })}
                                 type="email"
                              />
                              {this.state.hasEmailError && (
                                 <p className="text-danger">
                                    {this.state.emailError}
                                 </p>
                              )}
                              <p
                                 className="text-danger mb-4"
                                 id="sign-up-email-error"
                              ></p>
                              <p className="lead">
                                 Create a password
                                 <br />
                                 <span className="text-muted">
                                    Must be at least 9 characters
                                 </span>
                              </p>

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
                                 <p className="text-danger">
                                    {this.state.passwordError}
                                 </p>
                              )}

                              <button
                                 to="create-answer"
                                 className="btn btn-block btn-success btn-lg mt-4"
                                 onClick={() => {
                                    this.validateAndCreateUser();
                                 }}
                                 id="lets-go-button"
                              >
                                 Let's go!
                              </button>
                           </>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
function mapStateToProps(state) {
   //Everything down here is global state
   return {};
}

export default withRouter(connect(mapStateToProps)(SignUp));
