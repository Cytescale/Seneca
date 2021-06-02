import {IonTabs,IonAvatar,IonIcon,IonFab,IonTabBar,IonRippleEffect,IonFabButton, IonRouterOutlet,IonTabButton, IonContent,IonButton, IonHeader, IonSlides, IonSlide,IonRefresher, IonRefresherContent,IonPage, IonItem,IonLabel,IonImg,IonInput,IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
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
}    

class space implements spaceInter{
     name = "Placeholder name";
     creator_name = "Placeholder name";
     banner_art_src = null;
     isLive = false;
     constructor(name:string,creator_name:string,isLive:boolean,banner_art_src?:any,){
          this.name = name;
          this.creator_name = creator_name;
          this.banner_art_src = banner_art_src;
          this.isLive = isLive;
     }
}

let FeaturedSpace:React.FC<{data:spaceInter}> =(props)=>{

     let router = useIonRouter();
     return(

          <div className='ion-activatable ripple-parent app-feat-space-main-cont' 
                    onClick={()=>{
                         router.push('/space','root','push');
                    }}
               >
                
               <IonImg src={props.data.banner_art_src} className='app-feat-space-ban-art'/>
               
               <div className='app-feat-space-bottom-main-cont'>
                    <div className='app-feat-space-bottom-name-main-cont'>
                         <div className='app-feat-space-bottom-name-ava-main-cont'>
                              <IonImg src={profPlaceholder} className='app-feat-space-left-pro-ico'></IonImg>
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

let  FeaturedSpaceSlider:React.FC<{}>=(props)=>{
     let data1 = new space("Placeholder Name","name",true,ban1)
     return(
          <div>
                 <IonSlides pager={false} options={{initialSlide: 0,speed: 400}}>
                    <IonSlide>
                    <FeaturedSpace data={data1} />
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


let SpaceFeed:React.FC<{}>=(props)=>{
     let data1 = new space("Placeholder Name","name",true,ban1)
     return(
          <div className='app-space-feed-main-cont'>
                    <DoubleHeader 
                              priString="Spaces" 
                              secString="Popular Spaces currenly we hear"  
                              secStringVisi
                    />

                    <div className='app-space-feed-list-cont'>
                         <div className='app-list-space-cont'>
                                   <FeaturedSpace data={data1}/>
                         </div>
                    </div>                         
          </div>
     )
}

export default class Explore<ExploreProps> extends React.Component<ExploreProps,{
     userDataLoaded:boolean
}>{
     constructor(props:ExploreProps){
          super(props);
          this.state={
               userDataLoaded:false,

          }
          this.exploreClassInit = this.exploreClassInit.bind(this);
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
                             // history.replace('/editprofile');
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
                                   <FeaturedSpaceSlider/>
                                   <PopularCreator/>
                                   <SpaceFeed/>
                              </div>
                              </IonContent>        
                              <IonFab vertical="bottom" horizontal="end" slot="fixed" className='app-fab-main-butt'>
                                   <IonFabButton className='app-fab-main-butt-butt'>
                                        <IonImg src={Mic_UnSelec}></IonImg>
                                   </IonFabButton>
                              </IonFab>
                    </IonPage>
         );
     }
}