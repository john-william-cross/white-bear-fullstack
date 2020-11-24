import React from "react";
import "./style/master.scss"; // applies global scss styles
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./component/pages/Landing";
import CreateAnswer from "./component/pages/CreateAnswer";
import CreateImagery from "./component/pages/CreateImagery";
import ReviewImagery from "./component/pages/ReviewImagery";
import ReviewAnswer from "./component/pages/ReviewAnswer";
import ReviewEmpty from "./component/pages/ReviewEmpty";
import AllCards from "./component/pages/AllCards";
import Edit from "./component/pages/Edit";
import NotFound from "./component/pages/NotFound";
import jwtDecode from "jwt-decode";

const authToken = localStorage.authToken;
if (authToken) {
   // if the authToken is not expired
   const currentTimeInSec = Date.now() / 1000;
   if (currentTimeInSec > exp) {
   }
   // store the user in global state / redux store (currentUser)
   // set authorization headers
   // redirect to create-answers
} else {
   console.log("no authToken");
}
function App() {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/create-answer" component={CreateAnswer} />
            <Route exact path="/create-imagery" component={CreateImagery} />
            <Route exact path="/review-imagery" component={ReviewImagery} />
            <Route exact path="/review-answer" component={ReviewAnswer} />
            <Route exact path="/review-empty" component={ReviewEmpty} />
            <Route exact path="/all-cards" component={AllCards} />
            <Route exact path="/edit" component={Edit} />
            <Route component={NotFound} />
         </Switch>
      </Router>
   );
}

export default App;
