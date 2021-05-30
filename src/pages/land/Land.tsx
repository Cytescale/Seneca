import {IonApp, IonRouterOutlet,IonTabs, IonTabBar,IonTab,IonTabButton,IonContent,IonButton, IonHeader, IonPage, IonItem,IonLabel,IonImg,IonInput,IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, withRouter } from 'react-router-dom';
import '../../theme/styles/land.style.css';
import { LandProps } from '../../types/land/land.type';

import Explore from './explore/Explore';
import LoginAct from '../login/Login';
import Search from './search/index';
import Profile from './profile';
import Space from './space';

import React from 'react';

import Land from './Land';

import Login from '../login/Login';

import { Home_UnSelec,
     Search_UnSelec,
     Expl_UnSelec,
     Profile_UnSelec,
     Home_Selec,
     Search_Selec,
     Expl_Selec,
     Profile_Selec} from '../../assets/'
import history from '../history';
import Home from '../Home';

const TabCont:React.FC<{isAuth:boolean}>=(props:{isAuth:boolean})=>{
     return(
          <IonReactRouter history={history} >
            <IonRouterOutlet>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/space" component={Space}/>
          <Route exact path="/login" component={Login}/>
          <Route path="/land/" render={()=>{
                    return(
                         <IonTabs >               
                         <IonRouterOutlet >
                              <Route  path='/land/:tab(home)'component={LoginAct} exact/>
                              <Route  path='/land/:tab(search)'component={Search} exact/>
                              <Route  path='/land/explore' component={Explore} exact/>
                              <Route  path='/land/:tab(profile)' component={Profile} exact/>
                              <Route  path="/land/" render={() => <Redirect to="/land/explore" />} exact/>
                         </IonRouterOutlet>
                              <IonTabBar slot="bottom" className='app-bottombar-main-cont'>
                                   <IonTabButton tab="home"  href='/land/home'>
                                   <IonImg src={Home_UnSelec} className='app-bottombar-ico' />
                                   </IonTabButton>
                                   <IonTabButton tab="explore" href='/land/explore' >
                                   <IonImg src={Expl_UnSelec} className='app-bottombar-ico'/>
                                   </IonTabButton> 
                                   <IonTabButton tab="search" href='/land/search'>
                                   <IonImg src={Search_UnSelec} className='app-bottombar-ico' />
                                   </IonTabButton>
                                   <IonTabButton tab="profile"  href='/land/profile'>
                                   <IonImg src={Profile_UnSelec} className='app-bottombar-ico' />
                                   </IonTabButton>
                              </IonTabBar>     
                         </IonTabs>
                    )
               }}/>
          <Route exact path="/">{props.isAuth===true?<Redirect to="/land"/>:<Redirect to="/login"/>}</Route>
          </IonRouterOutlet>
     </IonReactRouter>
     )
}

const LandBase:React.FC<{isAuth:boolean}> = (props)=>{
     return(
          <IonApp>
          <IonReactRouter>
         <IonPage id="main">
         <IonContent fullscreen className='app-content-main-cont'>
                     <TabCont isAuth={props.isAuth}/>
          </IonContent>
          </IonPage>
          </IonReactRouter>
           </IonApp>
     )
}

export default LandBase