import {IonApp, IonRouterOutlet,IonTabs, IonTabBar,IonTab,IonTabButton,IonContent,IonButton, IonHeader, IonPage, IonItem,IonLabel,IonImg,IonInput,IonTitle, IonToolbar } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import '../../theme/styles/land.style.css';
import { LandProps } from '../../types/land/land.type';

import Explore from './explore/Explore';
import LoginAct from '../login/Login';
import Search from './search/index';
import Profile from './profile';
import Space from './space';

import React from 'react';
import { Home_UnSelec,
     Search_UnSelec,
     Expl_UnSelec,
     Profile_UnSelec,
     Home_Selec,
     Search_Selec,
     Expl_Selec,
     Profile_Selec} from '../../assets/'

const TabCont:React.FC<{}>=(props)=>{
     return(
          <IonReactRouter>
          <IonTabs >
       
          <IonRouterOutlet >
               <Route  path='/land/:tab(home)'component={LoginAct} exact/>
               <Route  path='/land/:tab(search)'component={Search} exact/>
               <Route  path='/land/:tab(explore)' component={Explore} exact/>
               <Route  path='/land/:tab(profile)' component={Profile} exact/>
               <Route  path='/land/space' render={() =>  <Redirect to="/space" />}  exact/>
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
     </IonReactRouter>
     )
}


export default class LandAct<LandProps> extends React.Component{
     constructor(props:LandProps){
          super(props);
     
     }
     
     render(){
          let selecTab = 2;
          return(
               <IonApp>
                    <IonReactRouter>
                   <IonPage id="main">
                   <IonContent fullscreen className='app-content-main-cont'>
                    <TabCont/>
                    </IonContent>
                    </IonPage>
                    </IonReactRouter>
               </IonApp>
          )
     }
}