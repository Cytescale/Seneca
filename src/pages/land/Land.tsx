import {IonApp, IonRouterOutlet,IonTabs, IonTabBar,IonTab,IonTabButton,IonContent,IonButton, IonHeader, IonPage, IonItem,IonLabel,IonImg,IonInput,IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, withRouter } from 'react-router-dom';
import '../../theme/styles/land.style.css';
import { LandProps } from '../../types/land/land.type';

import Explore from './explore/Explore';
import LoginAct from '../login/Login';
import Search from './search/index';
import Profile from './profile';
import EditProfile from '../editProfile';
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
import SpaceCreate from './spaceCreate';


const TabCont:React.FC<{isAuth:boolean,setAuth:any}>=(props:{isAuth:boolean,setAuth:any})=>{
     

     return(
          <IonReactRouter history={history} >
            <IonRouterOutlet>
          <Route exact path="/home" component={Home}/>
          <Route path="/space/:sid" component={Space}/>
          <Route exact path="/editprofile" component={EditProfile}/>
          <Route exact path="/spacecreate" component={SpaceCreate}/>
          <Route exact path="/login" render={()=><Login setAuth={props.setAuth} /> }/>
          <Route path="/land/" render={()=>{
                    return(
                         <IonTabs >               
                         <IonRouterOutlet >
                              <Route  path='/land/:tab(home)'component={Home} exact/>
                              <Route  path='/land/:tab(search)'component={Search} exact/>
                              <Route  path='/land/explore' render={()=><Explore />} exact/>
                              <Route  path='/land/:tab(profile)' component={Profile} exact/>
                              <Route  path="/land/" render={() => <Redirect to="/land/explore" />} exact/>
                         </IonRouterOutlet>
                              <IonTabBar slot="bottom" className='app-bottombar-main-cont'>
                                   <IonTabButton tab="home"  href='/land/home'>
                                   <IonImg src={Home_UnSelec} className='app-bottombar-ico' />
                                   <IonLabel className='app-bottombar-lab-tit'>Home</IonLabel>
                                   </IonTabButton>
                                   <IonTabButton tab="explore" href='/land/explore' >
                                   <IonImg src={Expl_UnSelec} className='app-bottombar-ico'/>
                                   <IonLabel className='app-bottombar-lab-tit'>Explore</IonLabel>
                                   </IonTabButton> 
                                   <IonTabButton tab="search" href='/land/search'>
                                   <IonImg src={Search_UnSelec} className='app-bottombar-ico' />
                                   <IonLabel className='app-bottombar-lab-tit'>Search</IonLabel>
                                   </IonTabButton>
                                   <IonTabButton tab="profile"  href='/land/profile'>
                                   <IonImg src={Profile_UnSelec} className='app-bottombar-ico' />
                                   <IonLabel className='app-bottombar-lab-tit'>Profile</IonLabel>
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

const LandBase:React.FC<{isAuth:boolean,setAuth:any}> = (props)=>{
     return(
          <IonApp>
          <IonReactRouter>
         <IonPage id="main">
         <IonContent fullscreen className='app-content-main-cont'>
                     <TabCont isAuth={props.isAuth} setAuth={props.setAuth} />
          </IonContent>
          </IonPage>
          </IonReactRouter>
           </IonApp>
     )
}

export default LandBase