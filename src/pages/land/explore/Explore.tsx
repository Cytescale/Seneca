import {IonTabs,IonAvatar,IonIcon,IonModal,IonFab,IonTabBar,IonRippleEffect,IonFabButton,withIonLifeCycle , IonRouterOutlet,IonTabButton, IonContent,IonButton, IonHeader, IonSlides, IonSlide,IonRefresher, IonRefresherContent,IonPage, IonItem,IonLabel,IonImg,IonInput,IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import { add,mic } from 'ionicons/icons';
import { RefresherEventDetail } from '@ionic/core';
import { chevronDownCircleOutline } from 'ionicons/icons';
import { Link, Redirect, Route } from 'react-router-dom';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import '../../../theme/styles/land.style.css';
import React,{CSSProperties, useState,useEffect} from 'react';
import {CancelIco,profPlaceholder,headphones} from '../../../assets';
import ban1 from '../../../assets/placeholders/ban1.jpg'
import ban2 from '../../../assets/placeholders/ban2.jpg'
import pep1 from '../../../assets/placeholders/pep1.jpg'
import pep2 from '../../../assets/placeholders/pep2.jpg'
import pep3 from '../../../assets/placeholders/pep3.jpg'
import pep4 from '../../../assets/placeholders/pep4.jpg'


import Profile from '../profileView';

import { Mic_UnSelec} from '../../../assets';

import {ExploreProps} from '../../../types/land/land.type';


import BackendHelper from '../../../api/backendHelper';
import firebaseHelper, { getUid } from '../../../api/firebaseHelper';
import User, { userData } from '../../../components/user';
import history from '../../history';
import agoraHelper from '../../../api/agoraHelper';
import userTmpDb from '../../../components/userTempDb';

var UserTmpDb = new userTmpDb(); 
var backendHelper:BackendHelper|null = null;
var feedBackEndHelper:BackendHelper|null = new BackendHelper("strinf");
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
          let tres = await feedBackEndHelper!._getOtherUserInfo(uid!);
          if(tres?.errBool===false){
               res = tres.data;
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
     data:spaceFeedInter,
     setProfileModal:any,
     setSpaceModal:any
     setSid?:any,
     sid?:any
     }> =(props)=>{
     let router = useIonRouter();
   
     return(

          <div className='app-feat-space-main-cont' onClick={()=>{
               //router.push(`/space/${props.data.cuid}`,'root','push');
               props.setSid(props.data.cuid);
               props.setSpaceModal(true);
          }}>
                <div  className='ion-activatable ripple-parent'  >
               <IonImg className='ion-activatable ripple-parent app-feat-space-ban-art'/>
               </div>
               <div className='app-feat-space-top-name-main-cont'>
                              <div className='app-feat-space-top-name-main-inner-cont'>
                                   <IonImg src={profPlaceholder} className='ion-activatable ripple-parent app-feat-space-left-pro-ico' 
                                   onClick={()=>{
                                        if(user.getUserUid() === props.data.suid){
                                             router.push('/land/profile','forward','push');
                                        }
                                        else{
                                             props.setProfileModal(true,props.data.suid);
                                        }                                   
                                   }}></IonImg>
                                   <RenderName {...props}/>
                                   <div className='app-feat-space-bottom-pro-count-cont'> <IonImg src={headphones} className='app-feat-space-head-pro-ico' /> {props.data.listners}</div>
                              </div>

                              <div className='app-feat-space-atnd-main-cont'>
                                 {
                                      props.data.broadcaster?.map((e:any)=>{
                                             return(
                                             <RenderAttnds jid={e} />
                                             )
                                      })
                                 }
                                 
                              </div>

               </div>
               <div className='app-feat-space-bottom-main-cont'>
                   
                    <div className='app-feat-space-bottom-name-main-cont'>
                         <div>
                              <div className='app-feat-space-bottom-name'>
                              {props.data.name}     
                              </div>
                              <div className='app-feat-space-bottom-des'>
                              {props.data.des}     
                              </div>
                         </div>
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

let  FeaturedSpaceSlider:React.FC<{showModal:any,setSpaceModal:any}>=(props:any)=>{
     let data1 = new space("Placeholder Name","name",true,'CLvI6ewbCda1GbYBFpnjYG4clS03',ban2)
     return(
          <div>
                 <IonSlides pager={false} options={{initialSlide: 0,speed: 400}}>
                    <IonSlide>
                    <FeaturedSpace data={data1} setProfileModal={props.showModal} setSpaceModal={props.setSpaceModal} />
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


declare interface SacFeedInter {
     showModal:any

}

declare interface SacFeedStat {
     feedData:any
     feedParseData:Array<spaceFeedInter>|null
     feedDataLoaded:boolean,
}


class SacFeed extends React.Component<any,SacFeedStat>{
     constructor(props:SacFeedInter){
          super(props);
          this.state={
               feedData:null,
               feedParseData:null,
               feedDataLoaded:false,

          }
          this.intiSacFeed= this.intiSacFeed.bind(this);
          this.setInitSacfeed = this.setInitSacfeed.bind(this);
          this.renderSacFeed = this.renderSacFeed.bind(this);
          this.setParseData = this.setParseData.bind(this);
          this.renderSacDataFeed = this.renderSacDataFeed.bind(this);
     }

     setParseData(val:any){
          this.setState({
               feedParseData:val
          })
     }

     setInitSacfeed(val:any){
          this.setState({feedData:val})
     }

     //2984534994
   
     
     renderSacDataFeed(){
          let resa:any = [];
          this.state.feedParseData?.forEach((e,ind)=>{
               resa.push(<FeaturedSpace 
                    data={e} 
                    setProfileModal={this.props.showModal}
                     setSpaceModal={this.props.setSpaceModal}
                     setSid={this.props.setSid} 
                     sid={this.props.sid}
                     />);
          })
          return resa;
     }

     async renderSacFeed(){
          let res:any = [];
          if(this.state.feedData){
               for (const data in this.state.feedData) {
                    let obj =  this.state.feedData[data];
                    if(obj.agora_channel_token){
                    let resData:spaceFeedInter = {
                         name:obj.name,
                         des:obj.des,
                         creator_name:'Holder',
                         profile_pic_src:null,
                         banner_art_src:obj.image_url?obj.image_url:ban2,
                         isLive:obj.isLive!,
                         cuid:data!,
                         suid:obj.uid!,
                         broadcaster:obj.broadcaster!,
                         listners:obj.listner?obj.listner:0,
                    } 
                    res.push(resData);
                    }
               }
          }
          this.setParseData(res); 
     }


    
     async getSpaceDetails(){
          if(FirebaseHelper?.getFirebase()){
               var database = FirebaseHelper?.getFirebase()!.database();
               var spaceRef = database.ref('user_space_det');
               let resdata  = null;
               spaceRef.on('value', (snapshot:any) => {
               const data = snapshot.val();
               this.setInitSacfeed(data);
               this.renderSacFeed();
               });
          }
          else{
               return null;
          }
         
     }

     async intiSacFeed(){
          console.log("Sacfeed: inti");
          this.getSpaceDetails();
     }


     componentDidMount(){
          if(user.getUserUid()){
               this.intiSacFeed();
          }else{
               console.log("Sacfeed: User not inti");
          }
     }

     ionViewDidEnter() {
          // if(user.getUserUid()){
          //      this.intiSacFeed();
          // }else{
          //      console.log("Sacfeed: User not inti");
          // }
     }

     ionViewWillEnter() {
          
     }
      
        ionViewWillLeave() {
     
     }
     
        ionViewDidLeave() {
         
     }

     render(){
          return(
          <div>
                 <div className='app-space-feed-main-cont'>
                    <DoubleHeader 
                              priString="Spaces" 
                              secString="Popular Spaces currenly we hear"  
                              secStringVisi
                    />

                    <div className='app-space-feed-list-cont'>
                         <div className='app-list-space-cont'>
                         {this.renderSacDataFeed()}                 
                         </div>
                    </div>                         
          </div>
               
          </div>    
          )
     }

}

const Sacfeeder = withIonLifeCycle(SacFeed)


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
               backendHelper._getUserInfo().then((res:any)=>{
                    if(res){
                         
                         if(res.errBool!==true){
                              user.setUserData(res.data);
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
                                   {/* <DoubleHeader 
                                   priString="Featured" 
                                   secString="Best spaces curated  by us"  
                                   secStringVisi
                                   />
                                   <FeaturedSpaceSlider 
                                        showModal={this.setProfileModal}
                                         setSpaceModal={this.props.setSpaceModal}
                                   /> */}
                                   {/* <PopularCreator/> */}
                                   <Sacfeeder 
                                   showModal={this.setProfileModal} 
                                   setSpaceModal={this.props.setSpaceModal}
                                   setSid={this.props.setSid} 
                                   sid={this.props.sid}
                                   />
                              </div>
                              <div className='app-content-fader-main-cont'/>
                                   
                              
                              </IonContent>        
                              <IonFab vertical="bottom" horizontal="end" slot="fixed" className='app-fab-main-butt'>
                                   <IonFabButton className='app-fab-main-butt-butt' onClick={()=>{
                                             history.push('/spacecreate');
                                   }}>
                                        <IonImg src={Mic_UnSelec}></IonImg>
                                   </IonFabButton>
                              </IonFab>
                              <ProfileView showModal={this.state.profileModalShow} suid={this.state.profileModalUid} setShowModal={this.setProfileModal}/>
                    </IonPage>
         );
     }
}



export default withIonLifeCycle(Explore);
