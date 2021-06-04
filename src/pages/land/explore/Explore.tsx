import {IonTabs,IonAvatar,IonIcon,IonModal,IonFab,IonTabBar,IonRippleEffect,IonFabButton, IonRouterOutlet,IonTabButton, IonContent,IonButton, IonHeader, IonSlides, IonSlide,IonRefresher, IonRefresherContent,IonPage, IonItem,IonLabel,IonImg,IonInput,IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { add,mic } from 'ionicons/icons';
import { RefresherEventDetail } from '@ionic/core';
import { chevronDownCircleOutline } from 'ionicons/icons';
import { Link, Redirect, Route } from 'react-router-dom';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import '../../../theme/styles/land.style.css';
import React,{CSSProperties, useState} from 'react';
import {CancelIco,profPlaceholder} from '../../../assets';
import ban1 from '../../../assets/placeholders/ban1.jpg'
import pep1 from '../../../assets/placeholders/pep1.jpg'
import pep2 from '../../../assets/placeholders/pep2.jpg'
import pep3 from '../../../assets/placeholders/pep3.jpg'
import pep4 from '../../../assets/placeholders/pep4.jpg'


import Profile from '../profileView';

import { Mic_UnSelec} from '../../../assets';

import {ExploreProps} from '../../../types/land/land.type';


import BackendHelper from '../../../api/backendHelper';
import { getUid } from '../../../api/firebaseHelper';
import User from '../../../components/user';
import history from '../../history';

let backendHelper:BackendHelper|null = null;
const user = new User();

interface spaceInter{
     name:string
     creator_name:string
     banner_art_src:any|null
     isLive:boolean
     suid:string|null
}    

class space implements spaceInter{
     name = "Placeholder name";
     creator_name = "Placeholder name";
     banner_art_src = null;
     isLive = false;
     suid;
     constructor(name:string,creator_name:string,isLive:boolean,uid:string|null,banner_art_src?:any,){
          this.name = name;
          this.creator_name = creator_name;
          this.banner_art_src = banner_art_src;
          this.isLive = isLive;
          this.suid = uid;
     }
}

let FeaturedSpace:React.FC<{data:spaceInter,setProfileModal:any}> =(props)=>{

     let router = useIonRouter();
     return(

          <div className=' app-feat-space-main-cont' >
                
               <IonImg src={props.data.banner_art_src} className='ion-activatable ripple-parent app-feat-space-ban-art' onClick={()=>{
                         router.push('/space','root','push');
                    }}/>
               
               <div className='app-feat-space-bottom-main-cont'>
                    <div className='app-feat-space-bottom-name-main-cont'>
                         <div className='app-feat-space-bottom-name-ava-main-cont'>
                              <IonImg src={profPlaceholder} className='ion-activatable ripple-parent app-feat-space-left-pro-ico' 
                              onClick={()=>{
                                   if(user.getUserUid() === props.data.suid){
                                        router.push('/land/profile','forward','push');
                                   }
                                   else{
                                        props.setProfileModal(true,props.data.suid);
                                   }                                   
                              }}></IonImg>
                         </div>
                         <div>
                              <div className='app-feat-space-bottom-name'>
                              {props.data.name}     
                              </div>
                              <div className='app-feat-space-bottom-crea-name'>
                              {props.data.creator_name}     
                              </div>
                         </div>
                    </div>
                    <div className='app-feat-space-bottom-pro-main-cont'>
                         <div  className='app-feat-space-bottom-pro-cont'>
                         <IonImg src={profPlaceholder} className='app-feat-space-bottom-pro-ico'></IonImg>
                         </div>
                         <div className='app-feat-space-bottom-pro-count-cont'>+0</div>
                    </div>
               </div>
               {props.data.isLive===true?<div className='app-feat-live-indi-main-cont'>
                         <div className='app-feat-live-indi-live-txt-cont'>
                              Live
                         </div>
                    </div>:null}
                    <IonRippleEffect className='app-feat-space-main-cont-ripp'> </IonRippleEffect>
          </div>
     )
}

let  FeaturedSpaceSlider:React.FC<{showModal:any}>=(props:any)=>{
     let data1 = new space("Placeholder Name","name",true,'CLvI6ewbCda1GbYBFpnjYG4clS03',ban1)
     return(
          <div>
                 <IonSlides pager={false} options={{initialSlide: 0,speed: 400}}>
                    <IonSlide>
                    <FeaturedSpace data={data1} setProfileModal={props.showModal}/>
                    </IonSlide>
               </IonSlides>
               
          </div>
     )
}

let WecomeHead:React.FC<{shown?:Boolean}> = (props)=>{
     const [visi, setVis] = useState(props.shown);
     return(
     <div className='app-welcom-head-main-cont'  style={{
               display:visi==true?'block':'none',
          }}>
               {/* <Link to="/land/space" replace >User 1</Link> */}
          Welcome to <br/> Seneca
          
          <IonImg className='app-welcom-head-close-butt' onClick={()=>{
               setVis(!visi);
          }}
          src={CancelIco}
          />
     </div>
     )
}

let DoubleHeader:React.FC<{priString:string,secString?:string,secStringVisi?:boolean,SenStyle?:CSSProperties}> =(props)=>{
     return(
          <div style={props.SenStyle} className='app-dhead-main-cont'>
                    <div className='app-dhead-sec-str-main-cont' style={{
                         display:props.secString && props.secStringVisi === true?'block':'none',
                    }}>
                    {props.secString}     
                    </div>
                    <div className='app-dhead-pri-str-main-cont'>
                    {props.priString}     
                    </div>
                    
          </div>
     )     
}

let PopularCreator:React.FC<{}>=(props)=>{
     return(
          <div className='app-pop-creat-main-outer-cont'>
          <div className='app-pop-creat-main-cont'>
                    <DoubleHeader 
                    priString="Popular Creators" 
                    secString="Top creators of our choice"  
                    secStringVisi
                    />
                    <div className='app-pop-creat-pic-holder-main-cont'>
                              <div className='app-pop-creat-pic-holder'>
                                   <IonImg src={profPlaceholder} className='app-pop-creat-pic'/>
                                   <div className='app-pop-creat-more-pic-cont'>+0</div>     
                                   
                              </div>
                    </div>
          </div>
          </div>
     )
}


let SpaceFeed:React.FC<{showModal:any}>=(props:any)=>{
     let data1 = new space("Placeholder Name","name",true,'CvTBt6cgZCOwtKhQFgC3BdoIanS2',ban1)
     return(
          <div className='app-space-feed-main-cont'>
                    <DoubleHeader 
                              priString="Spaces" 
                              secString="Popular Spaces currenly we hear"  
                              secStringVisi
                    />

                    <div className='app-space-feed-list-cont'>
                         <div className='app-list-space-cont'>
                                   <FeaturedSpace data={data1} setProfileModal={props.showModal}/>
                         </div>
                    </div>                         
          </div>
     )
}

let ProfileView : React.FC<{showModal:boolean,suid:string,setShowModal:any}> = (props)=>{
     return(
          <IonModal
          isOpen={props.showModal}
          cssClass='app-modal-main-cont'
          swipeToClose={true}
          onDidDismiss={() => props.setShowModal(false,'null')}>
          <Profile setModal={props.setShowModal} suid={props.suid} />
     </IonModal>
     )
}

export default class Explore<ExploreProps> extends React.Component<ExploreProps,{
     userDataLoaded:boolean
     profileModalShow:boolean
     profileModalUid:string
}>{
     constructor(props:ExploreProps){
          super(props);
          this.state={
               userDataLoaded:false,
               profileModalShow:false,
               profileModalUid:'null'
          }
          this.exploreClassInit = this.exploreClassInit.bind(this);
          this.setProfileModal = this.setProfileModal.bind(this);
     }

     setProfileModal(val:boolean,uid?:string){
          this.setState({profileModalShow:val ,profileModalUid:uid!})
     }

     doRefresh(event: CustomEvent<RefresherEventDetail>) {
          console.log('Begin async operation');
        
          setTimeout(() => {
            console.log('Async operation has ended');
            event.detail.complete();
          }, 2000);
     }

     async exploreInit(){
          let res = await getUid();
          console.log("GOT UID = "+res);

     } 
     exploreClassInit(reloadBool?:boolean){
          if(reloadBool!){
               console.log("Explore: reload uid"+user.getUserUid());          
          }
          if(user.getUserUid())backendHelper = new BackendHelper(user.getUserUid()!);
          if(backendHelper){
               backendHelper._getUserInfo().then((res:any)=>{
                    if(res.errBool!==true){
                         user.setUserData(res.data);
                         if(user.getUserData()?.init_bool===false){
                             history.replace('/editprofile');
                         }
                    }
               });
          }
     }
     componentDidMount(){
          console.log("Explore: explore init uid"+user.getUserUid());
          this.exploreClassInit(false);
     }
     render(){
          return(
                   <IonPage >
                    <IonContent fullscreen className='app-content-main-cont '>
                         <IonRefresher slot="fixed" onIonRefresh={this.doRefresh}>
                              <IonRefresherContent></IonRefresherContent>
                              </IonRefresher>
                              <div className='app-render-content'>
                                   <div className='app-start-spacer'/>
                                   
                                   <WecomeHead shown/>
                                   <DoubleHeader 
                                   priString="Featured" 
                                   secString="Best spaces curated  by us"  
                                   secStringVisi
                                   />
                                   <FeaturedSpaceSlider showModal={this.setProfileModal}/>
                                   <PopularCreator/>
                                   <SpaceFeed showModal={this.setProfileModal}/>
                              </div>
                              <div className='app-content-fader-main-cont'/>
                                   
                              
                              </IonContent>        
                              <IonFab vertical="bottom" horizontal="end" slot="fixed" className='app-fab-main-butt'>
                                   <IonFabButton className='app-fab-main-butt-butt'>
                                        <IonImg src={Mic_UnSelec}></IonImg>
                                   </IonFabButton>
                              </IonFab>
                              <ProfileView showModal={this.state.profileModalShow} suid={this.state.profileModalUid} setShowModal={this.setProfileModal}/>
                    </IonPage>
         );
     }
}