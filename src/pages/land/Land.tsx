import {IonApp, IonRouterOutlet,IonSplitPane,IonMenu,IonList,IonTabs,IonModal,IonTabBar,IonTab,IonTabButton,IonContent,IonButton, IonHeader, IonPage, IonItem,IonLabel,IonImg,IonInput,IonTitle, IonToolbar } from '@ionic/react';
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
import SecSpace from './space/secSpace';
import React, { useState } from 'react';
import ProfileList from './profile/profileList';
import Land from './Land';

import Login from '../login/Login';

import { 
     Add,
     Search_UnSelec,
     Expl_UnSelec,
     Profile_UnSelec,
     stream,
     } from '../../assets/'
import history from '../history';
import Home from '../Home';
import SpaceCreate from './spaceCreate';
import { menuController } from '@ionic/core';
import spaceInter from '../../components/spaceInter';
import landInter from '../../components/landInter';


declare interface TabInterface extends landInter{
     
}


const TabCont:React.FC<TabInterface>=(props:TabInterface)=>{
//     menuController.enable(true, 'first');
//     menuController.open('first');

     return(
          <IonReactRouter history={history} >
            <IonRouterOutlet>
          <Route exact path="/home" component={Home}/>
          <Route path="/land/space" render={()=><SecSpace />} exact/>
          <Route exact path="/editprofile" component={EditProfile}/>
          <Route exact path="/spacecreate" component={SpaceCreate}/>
          <Route exact path="/login" render={()=><Login setAuth={props.setAuth} /> }/>
          <Route path="/land/" render={()=>{
                    return(
                         <IonTabs >               
                         <IonRouterOutlet >
                              <Route  path='/land/:tab(search)'component={Search} exact/>
                              <Route  path='/land/space' render={()=><SecSpace/>} exact/>
                              <Route  path='/land/explore' render={()=><Explore {...props} />} exact/>
                              <Route  path='/land/:tab(profile)' render={()=><Profile setSpaceModal={props.setSpaceModal} />} exact/>
                              <Route  path="/land/" render={() => <Redirect to="/land/explore" />} exact/>
                         </IonRouterOutlet>
                              <IonTabBar slot="bottom" className='app-bottombar-main-cont'>
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
                    <div className='app-curr-play-main-cont-tit'>Joined {props.name}</div>
          </div>
     )
}

const LandBase:React.FC<{isAuth:boolean,setAuth:any}> = (props)=>{
     let [showSpaceModal , setSpaceModal] = useState<boolean>(false);
     let [sid,setSid] = useState<string|null>(null);

     let [joined,setJoined] = useState<boolean>(false);
     let [joinedName,setJoinedName] = useState<string|null>(null);
     
     let [showProfileListModal,setProfileListModal] = useState<boolean>(false);
     let [profileModalUid,setProfileModalUid] = useState<string|null>(null);

     let [mic,setMic] = useState<boolean>(false);
     let [spaceData,setSpaceData] = useState<spaceInter|null>(null);

      return(
          <IonApp>
          <IonReactRouter>
         <IonPage>
         {joined?<CurrentPlayingSpace setModal={setSpaceModal} name={joinedName}/>:null}             
         <IonContent fullscreen className='app-content-main-cont' id="appContentId">
                         <TabCont 
                         setSpaceModal={setSpaceModal} 
                         setSid={setSid} 
                         sid={sid!} 
                         setSpaceData={setSpaceData} 
                         spaceData={spaceData!} 
                         setProfileModalUid={setProfileModalUid}
                         setProfileListModal={setProfileListModal}     
                         />
                         <IonModal
                              isOpen={showSpaceModal}
                              cssClass='app-modal-main-cont'
                              onDidDismiss={() => setSpaceModal(false)}
                              swipeToClose={true}
                              showBackdrop={true}
                              mode="ios"
                              >
                                   <SecSpace 
                                   setProfileListModal={setProfileListModal}
                                   setProfileModalUid={profileModalUid}
                                   
                                   setSpaceModal={setSpaceModal} 
                                   setSid={setSid} 
                                   sid={sid}

                                   joined={joined}
                                   setJoined={setJoined}
                                   joinedName={joinedName}
                                   setJoinedName={setJoinedName}

                                   spaceData={spaceData}
                                   setSpaceData={setSpaceData}

                                   mic={mic}
                                   setMic={setMic}

                                   />
                         </IonModal>     
                         <IonModal
                              isOpen={showProfileListModal}
                              cssClass='app-profile-list-modal-main-cont'
                              onDidDismiss={() => setProfileListModal(false)}
                              swipeToClose={true}
                              showBackdrop={true}
                              mode="ios"
                              >
                              <div>
                                   <div id='app-profile-list-modal-puller'/>
                                   <ProfileList 
                                        setProfileListModal={setProfileListModal}
                                   />
                              </div>
                         </IonModal>    
                         <IonModal
                              isOpen={false}
                              cssClass='app-modal-main-cont'
                              swipeToClose={true}
                              >
                              <Profile />
                         </IonModal>
                         </IonContent>                              
          </IonPage>
          </IonReactRouter>
           </IonApp>
     )
     
}

export default LandBase