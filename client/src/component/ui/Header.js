import React from "react";
import appLogo from "../../icons/logo-app.svg";
import { Link } from "react-router-dom";
import actions from "../../store/actions";
import { connect } from "react-redux";

class Header extends React.Component {
   logOutOutCurrentUser() {
      this.props.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: {}, //payload is empty object
      });
   }

   render() {
      return (
         <>
            <img src={appLogo} width="32px" alt="White Bear logo" />
            <h3 className="d-inline text-brand text-dark ml-1">White Bear</h3>
            <Link
               to="/"
               className="btn btn-link float-right"
               onClick={() => {
                  this.logOutOutCurrentUser(); //running this function updates the redux store, which is our global state
               }}
            >
               Log out
            </Link>
            <div className="clearfix"></div>
         </>
      );
   }
}

function mapStateToProps(state) {
   //Everything down here is global state
   return {};
}

export default connect(mapStateToProps)(Header);
