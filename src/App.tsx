import React from "react";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import "./App.css";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import AddItem from "./components/Add";
import ListItems from "./components/List";
//import { Auth } from "aws-amplify";
//import { CognitoUser } from "@aws-amplify/auth";

Amplify.configure(awsExports);

function App() {
  const [authState, setAuthState] = React.useState("signedout");
  //const [user, setUser] = React.useState<CognitoUser | null>(null);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
	  
    //if(authState === undefined) {
    //  Auth.currentAuthenticatedUser().then(authData => {
    //    setAuthState(AuthState.SignedIn);
    //    setUser(authData);
    //  });
    //}
    return onAuthUIStateChange((nextAuthState, authData) => {

	  if(nextAuthState !== undefined) {
        setAuthState(nextAuthState);
	  }
	  else {
        console.log("nextAuthState ", nextAuthState);
        setAuthState("signedout");
	  }
	  

	  if(authData !== undefined) {
	    setUser(authData);
	  }
	  else {
        console.log("authData ", authData);
	  }
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <AddItem />
      <ListItems />
    </div>
  ) : (
    <div className="container">
      <div className="signIn">
        <AmplifyAuthenticator />
      </div>
    </div>
  );
}

export default App;