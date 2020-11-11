import React from "react";
import appLogo from "../../img/logo-landing.png";
import SignUp from "../ui/SignUp";
import LogIn from "../ui/LogIn";

export default function Landing() {
   return (
      <>
         <div className="background-image">
            <div className="container">
               <div className="row">
                  <div className="col-12 col-xl-6 col-lg-8 col-md-10 mt-7 mb-7">
                     <img
                        className="landing-page-logo mt-n6"
                        src={appLogo}
                        alt="White Bear Logo"
                     />
                     <h1 className="landing-page-title d-inline">White Bear</h1>
                  </div>

                  <div className="row mx-auto">
                     <SignUp />
                     <LogIn />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
