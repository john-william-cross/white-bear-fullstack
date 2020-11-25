import React from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";
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

   async validateAndLogInUser() {
      const emailInput = document.getElementById("signup-email-input").value;
      const passwordInput = document.getElementById("signup-password-input")
         .value;

      const user = {
         email: emailInput,
         password: passwordInput,
      };

      axios
         .post("/api/v1/users/auth", user)
         .then((res) => {
            // set token in localStorage
            const authToken = res.data;
            localStorage.setItem("authToken", authToken);
            const user = jwtDecode(authToken);
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: user,
            });
            axios.defaults.headers.common["x-auth-token"] = authToken;
            this.props.history.push("/create-answer");
         })
         .catch((err) => {
            const { data } = err.response;
            console.log(data);
            const { emailError, passwordError } = data; // use error responses to trigger our state
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
