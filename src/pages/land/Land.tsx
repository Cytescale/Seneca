import {IonApp, IonRouterOutlet,IonTabs,IonModal,IonTabBar,IonTab,IonTabButton,IonContent,IonButton, IonHeader, IonPage, IonItem,IonLabel,IonImg,IonInput,IonTitle, IonToolbar } from '@ionic/react';
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

import React, { useState } from 'react';

import Land from './Land';

import Login from '../login/Login';

import { Home_UnSelec,
     Search_UnSelec,
     Expl_UnSelec,
     Profile_UnSelec,
     Home_Selec,
     Search_Selec,
     Expl_Selec,
     stream,
     Call_end,
     Profile_Selec} from '../../assets/'
import history from '../history';
import Home from '../Home';
import SpaceCreate from './spaceCreate';


declare interface TabInterface {
     isAuth:boolean,
     setAuth:any,
     setSpaceModal:any
     setSid:any
     sid:string
}


const TabCont:React.FC<TabInterface>=(props:TabInterface)=>{
     return(
          <IonReactRouter history={history} >
            <IonRouterOutlet>
          <Route exact path="/home" component={Home}/>
          <Route path="/space/:sid" render={()=><Space setSpaceModal={props.setSpaceModal} />}/>
          <Route exact path="/editprofile" component={EditProfile}/>
          <Route exact path="/spacecreate" component={SpaceCreate}/>
          <Route exact path="/login" render={()=><Login setAuth={props.setAuth} /> }/>
          <Route path="/land/" render={()=>{
                    return(
                         <IonTabs >               
                         <IonRouterOutlet >
                              <Route  path='/land/:tab(home)'component={Home} exact/>
                              <Route  path='/land/:tab(search)'component={Search} exact/>
                              <Route  path='/land/explore' render={()=><Explore setSpaceModal={props.setSpaceModal} setSid={props.setSid} sid={props.sid} />} exact/>
                              <Route  path='/land/:tab(profile)' render={()=><Profile setSpaceModal={props.setSpaceModal} />} exact/>
                              <Route  path="/land/" render={() => <Redirect to="/land/explore" />} exact/>
                         </IonRouterOutlet>
                              <IonTabBar slot="bottom" className='app-bottombar-main-cont'>
                                   {/* <IonTabButton tab="home"  href='/land/home'>
                                   <IonImg src={Home_UnSelec} className='app-bottombar-ico' />
                                   <IonLabel className='app-bottombar-lab-tit'>Home</IonLabel>
                                   </IonTabButton> */}
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


const CurrentPlayingSpace:React.FC<any> = (props:any)=>{
     return(
          <div className='app-curr-play-main-cont' onClick={()=>{
               props.setModal(true);
          }}>
                    <IonImg src={stream } className='app-curr-play-main-cont-ico' />  
                    <div className='app-curr-play-main-cont-tit'>Placeholder space name</div>
                 {/* <button className='app-curr-play-main-cont-but-end'>
                    <IonImg src={Call_end} className='app-curr-play-main-cont-but-end-ico'></IonImg>
                 </button> */}
          </div>
     )
}

const LandBase:React.FC<{isAuth:boolean,setAuth:any}> = (props)=>{
     let [showSpaceModal , setSpaceModal] = useState<boolean>(false);
     let [sid,setSid] = useState<string|null>(null);
     let [joined,setJoined] = useState<boolean>(false);
     let [joinedName,setJoinedName] = useState<string|null>(null);

      return(
          <IonApp>
          <IonReactRouter>
         <IonPage id="main">
         {joined?<CurrentPlayingSpace setModal={setSpaceModal} />:null}             
         <IonContent fullscreen className='app-content-main-cont'>
                     <TabCont 
                     isAuth={props.isAuth} 
                     setAuth={props.setAuth} 
                      setSpaceModal={setSpaceModal} 
                      setSid={setSid} 
                  
                      sid={sid!} />
                     <IonModal
                         isOpen={showSpaceModal}
                         cssClass='app-modal-main-cont'
                         onDidDismiss={() => setSpaceModal(false)}>
                         <Space 
                             setModal={setSpaceModal} 
                             setSid={setSid} 
                             sid={sid}
                             joined={joined}
                             setJoined={setJoined}
                             joinedName={joinedName}
                             setJoinedName={setJoinedName}
                         />
                    </IonModal>
          </IonContent>
          </IonPage>
          </IonReactRouter>
           </IonApp>
     )
}

export default LandBase