import {IonTabs,IonAvatar,IonButtons,IonFooter,IonMenuButton,IonSearchbar,IonIcon,IonModal,IonFab,IonTabBar,IonRippleEffect,IonFabButton,withIonLifeCycle , IonRouterOutlet,IonTabButton, IonContent,IonButton, IonHeader, IonSlides, IonSlide,IonRefresher, IonRefresherContent,IonPage, IonItem,IonLabel,IonImg,IonInput,IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { add,mic } from 'ionicons/icons';
import { RefresherEventDetail } from '@ionic/core';
import { chevronDownCircleOutline } from 'ionicons/icons';
import { Link, Redirect, Route } from 'react-router-dom';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import '../../../theme/styles/land.style.css';
import React,{CSSProperties, useState,useEffect} from 'react';
import {CancelIco,profPlaceholder,headphones, Search_Selec, Search_UnSelec} from '../../../assets';
import ban1 from '../../../assets/placeholders/ban1.jpg'
import ban2 from '../../../assets/placeholders/ban2.jpg'
import pep1 from '../../../assets/placeholders/pep1.jpg'
import pep2 from '../../../assets/placeholders/pep2.jpg'
import pep3 from '../../../assets/placeholders/pep3.jpg'
import pep4 from '../../../assets/placeholders/pep4.jpg'
import nexusResponse from '../../../api/nexusResponse';

import { personCircle, search, helpCircle, star, create, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';

import Profile from '../profileView';

import { Mic_UnSelec,Menu,Profile_UnSelec} from '../../../assets';

import {ExploreProps} from '../../../types/land/land.type';


import BackendHelper from '../../../api/backendHelper';
import firebaseHelper, { getUid } from '../../../api/firebaseHelper';
import User, { userData } from '../../../components/user';
import history from '../../history';
import agoraHelper from '../../../api/agoraHelper';
import userTmpDb from '../../../components/userTempDb';

var UserTmpDb = new userTmpDb(); 
var backendHelper:BackendHelper|null = null;
var feedBackEndHelper:BackendHelper|null = new BackendHelper("string");
var FirebaseHelper:firebaseHelper|null = new firebaseHelper();
const user = new User();
let AgoraHelper:agoraHelper =  new agoraHelper(user.getUserUid());
AgoraHelper.getJoiningId();


export declare interface spaceInter{
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



async function getDataByJid(jid:number):Promise<userData|null>{
     let uData = await UserTmpDb.getUserByJid(jid!)
     let res = null;
     if(!uData){
          let tres:any = await backendHelper!._getUserJoiningId(jid!.toString());
          if(tres?.errBool===false){
               res = tres.data;
          }
     }
     else{
          console.log("global: user found by jid");
          res = uData;
     }
     return res;
}



function getDataByJoiningId(jid:number) {
     return new Promise((resolve) => {
       setTimeout(() => {
         resolve(getDataByJid(jid))
       }, 2000)
     })
   }

   

async function getData(uid:string):Promise<userData|null>{
     let uData = await UserTmpDb.getUserByUid(uid!)
     let res = null;
     if(!uData){
          let tres:nexusResponse = await feedBackEndHelper!._getUserInfo(uid!);
          if(tres?.errBool===false){
               res = tres.responseData;
          }
     }
     else{
          console.log("global: user foun by id");
          res = uData;
     }
     return res;
}

function getDataByUid(uid:string) {
     return new Promise((resolve) => {
       setTimeout(() => {
         resolve(getData(uid))
       }, 2000)
     })
   }

const  RenderAttnds:React.FC<any> = (props)=>{
     let [pd,setPd] = useState<any>(<div className='app-atnd-ico-cont'></div>);
     useEffect(() => {
          getDataByJoiningId(props.jid)
          .then((data:any) =>{
          setPd(
               <div className='app-atnd-ico-cont'>
                               <IonImg src={profPlaceholder} className='app-feat-space-left-pro-ico atnd-pro-pic' />
               </div>
          )
          });
     }, [props.jid])
     return(pd)         
}    


const  RenderName:React.FC<any> = (props)=>{
     let [pd,setPd] = useState<any>(  <div className='app-feat-space-top-name-main-cont-name'></div>);
     useEffect(() => {
          getDataByUid(props.data.suid!)
          .then((data:any) =>{
               
               setPd(
               <div className='app-feat-space-top-name-main-cont-name'>
                     {data?data.dname:'null'}
               </div>
          )
          });
     }, [props.data.suid!]);
     return(pd)                      
}    



export let FeaturedSpace:React.FC<{
     data?:spaceFeedInter,
     setProfileModal?:any,
     setSpaceModal?:any
     setSid?:any,
     sid?:any
     }> =(props)=>{
     let router = useIonRouter();
   
     return(

          <div className='app-feat-space-main-cont' onClick={()=>{
                    props.setSpaceModal(true);
          }}>
                
               <div className='app-feat-space-top-name-main-cont'>
                              <div className='app-feat-space-top-name-main-inner-cont'>
                                   <IonImg src={profPlaceholder} className='ion-activatable ripple-parent app-feat-space-left-pro-ico' 
                                   onClick={()=>{
                                        if(user.getUserUid() === props.data?.suid){
                                             router.push('/land/profile','forward','push');
                                        }
                                        else{
                                             props.setProfileModal(true,props.data?.suid);
                                        }                                   
                                   }}></IonImg>
                                    <div className='app-feat-space-top-name-main-cont-name'>
                                        Nikhil
                                   </div>
                                   <div className='app-feat-space-bottom-pro-count-cont'> <IonImg src={headphones} className='app-feat-space-head-pro-ico' /> 0</div>
                              </div>

                              <div className='app-feat-space-atnd-main-cont'>
                                 {/* {
                                      props.data.broadcaster?.map((e:any)=>{
                                             return(
                                             <RenderAttnds jid={e} />
                                             )
                                      })
                                 } */}
                                 
                              </div>

               </div>
                                 
                {/* <IonImg src={profPlaceholder} className='ion-activatable ripple-parent app-feat-space-ban-art'/> */}
               <div className='app-feat-space-bottom-main-cont'>
                   
                    <div className='app-feat-space-bottom-name-main-cont'>
                         <div>
                              <div className='app-feat-space-bottom-name'>
                                   Placeholder Name     
                              </div>
                              <div className='app-feat-space-bottom-des'>
                                   Sample Description
                              </div>
                         </div>
                    </div>                    
               </div>
                    <IonRippleEffect className='app-feat-space-main-cont-ripp'> </IonRippleEffect>
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
          <div style={props.SenStyle!} className='app-dhead-main-cont'>
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





export declare interface spaceFeedInter{
     name?:string
     des?:string
     creator_name?:string
     profile_pic_src?:string|null
     banner_art_src?:string|null
     isLive?:boolean
     cuid?:string|null 
     suid?:string|null
     listners?:number
     broadcaster?:Array<any>|null
}    


class Explore extends React.Component<any,{
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
          this.doRefresh  = this.doRefresh.bind(this);
     }

     setProfileModal(val:boolean,uid?:string){
          this.setState({profileModalShow:val ,profileModalUid:uid!})
     }

     doRefresh(event: CustomEvent<RefresherEventDetail>) {
          console.log('Begin async operation');
          this.exploreClassInit(true);
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
               backendHelper._getUserInfo(user.getUserUid()).then((res:nexusResponse)=>{
                    if(res){
                         if(res.errBool!==true){
                              user.setUserData(res.responseData);
                                   AgoraHelper.setJoiningId(user.getUserData()!.joining_id);
                                   if(user.getUserData()?.init_bool===false){
                                   history.replace('/editprofile');
                              }
                         }
               }
               });
          }
     }
     


     componentDidMount() {
          console.log("Explore: explore init uid"+user.getUserUid());
         // this.exploreClassInit(false);
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
                                   {/* <div className='app-intro-main-cont'>
                                   </div> */}
                                   <DoubleHeader priString="Recommendation" secString="Spaces you may be interested in" secStringVisi={true}/>
                                   <div className='app-render-region-cont'>
                                   <FeaturedSpace setSpaceModal={this.props.setSpaceModal}/>
                                   <FeaturedSpace setSpaceModal={this.props.setSpaceModal}/>
                                   <FeaturedSpace setSpaceModal={this.props.setSpaceModal}/>
                                   <FeaturedSpace setSpaceModal={this.props.setSpaceModal}/>
                                   </div>
                                   
                              </div>                             
                              </IonContent>        
                    </IonPage>
         );
     }
}



export default withIonLifeCycle(Explore);
