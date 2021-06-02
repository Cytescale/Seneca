import { BrowserRouter,Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSpinner, useIonRouter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';



import Home from './pages/Home';
import Login from './pages/login/Login';
import Explore from './pages/land/explore/Explore';
import Land from './pages/land/Land';
import Space from './pages/land/space';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/global_style.css';
import firebaseHelper, {firebaseHelperInter} from './api/firebaseHelper';
import React, { useState } from 'react';
import history from './pages/history';



console.log("🚀 appEntry | init");
const FirebaseHelper:firebaseHelperInter  = new firebaseHelper();
FirebaseHelper.initFirebaseApp();



interface appInter {
    setConnection(val:boolean):void
}

interface appProps  {
 
};
interface appstate {
  isConnected:boolean
  isAuth:boolean|null
};


export default class App extends React.Component<appProps,appstate> implements appInter{
  constructor(props:appProps){
      super(props);
      this.state = {
        isConnected:false,
        isAuth:null
      }
      this.setConnection = this.setConnection.bind(this);
      this.setAuth = this.setAuth.bind(this);
    }

  setConnection(val: boolean): void {
    this.setState({isConnected:val});
  }
  setAuth(val:boolean):void{
    this.setState({isAuth:val});
  }

  componentDidMount(){
    FirebaseHelper.checkInitUser().then((res:any)=>{
      console.log("PRE AUTHs CHECK"+res!);
      if(!res){this.setAuth(false);  return;}
      this.setAuth(res!)
    });
    FirebaseHelper.initFirebaseBackend().then((res:any)=>{
      this.setConnection(res); 
    });
  }

  render(){
    return(
      <IonApp>
        {this.state.isConnected===false?<div className='app-disco-main-cont'>Server not connected</div>:null}
        {
          this.state.isAuth!==null?<Land isAuth={this.state.isAuth} setAuth={this.setAuth} />:<div className='app-content-loading-main-cont'><div className='app-content-loading-main-cont-tit'>Loading</div><IonSpinner name="dots" /></div>
        }
        
      </IonApp>
    )
  }
}