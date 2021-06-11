import React,{useState} from 'react';
import {IonSearchbar,IonContent, IonToast,IonLoading,IonModal,IonHeader,withIonLifeCycle,IonPage,IonToolbar,IonTitle,IonButtons,IonIcon,IonButton,IonBackButton,IonRouterOutlet,IonTabBar,IonTabButton,IonImg,IonTabs } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import '../../../theme/styles/land.style.css';
import { SpaceProps } from '../../../types/land/land.type';
import firebaseHelper, { getUid } from '../../../api/firebaseHelper';
import {
     Call_end,
     Person_add,
     Share,
     Mic_UnSelec,
     Fronthand,
     Send,
     Mic_Mute_UnSelec,
     profPlaceholder,
     downArrow,
     Group,
     headphones,
} from '../../../assets/';
import AgoraPlayer from '../../../components/mediaPlayer';
import ban1 from '../../../assets/placeholders/ban1.jpg'
import ban2 from '../../../assets/placeholders/ban2.jpg'
import pep2 from '../../../assets/placeholders/pep2.jpg'
import pep1 from '../../../assets/placeholders/pep1.jpg'
import pep3 from '../../../assets/placeholders/pep3.jpg'
import pep4 from '../../../assets/placeholders/pep4.jpg'
import history from '../../history';
import User from '../../../components/user';
import BackendHelper from '../../../api/backendHelper';

let backendHelper:BackendHelper|null = new BackendHelper(null);

let user  =  new User();
let FirebaseHelper:firebaseHelper|null = new firebaseHelper();

const SpeakersCont:React.FC<{name:string,proPic:string,isLive?:boolean}> = (props)=>{
     return(
          <div className='app-space-banner-pic-cont'>
               <div className='app-space-banner-pic'>
                    <IonImg src={props.proPic} className='app-space-banner-pic-img' style={{
                         border:props.isLive?props.isLive===true?'2px solid #82FF70':null:null
                    }}/>
               </div>
               <div className='app-space-banner-name'>
                         {props.name}
               </div>
          </div>
     )
}

function isLive(uid:any,attndData:Array<any>):boolean{
     let res = false;
     if(attndData){
     attndData.forEach((e)=>{
          console.log(`space: speaking${e.speaking} uid${e.uid}`)
          if(e.speaking===true && e.uid===uid){
               res = true;
               return;
          }
     })
     }
     return res;
}


const BannerCont:React.FC<any> = (props:any)=>{
     let usrRender:any = [];
     if(props.attndUserData){
          props.attndUserData.forEach((e:any)=> {
               usrRender.push(
                    <SpeakersCont name={e.dname} proPic={profPlaceholder} isLive={isLive(e.UID,props.attndData)} />
               )
          });
     }
     return(
          <div className='app-space-banner-main-cont'>
               <IonImg className='app-space-banner-img'/>
               <div className='app-space-banner-bottom-main-cont'>
                   {usrRender}
               </div>
          </div>
     )
}
const TotalListners:React.FC<{count:number}> = (props) =>{
     return(
          <div className='app-total-listners-main-cont' id='listnr-cont'> 
               <div className='app-total-listners-count'>
               <div className='app-feat-space-bottom-pro-count-cont space-list-cont'> <IonImg src={headphones} className='app-feat-space-head-pro-ico' /> {props.count} Joined</div>
               </div>
          </div>
     )
}
const SelfChatCont:React.FC<{}> = (props) =>{
     return(
          <div className='app-space-chat-self-main-cont'>
                  <div className='app-space-chat-other-chat-main-cont'>
                         <div className='app-space-chat-other-chat-main-data-cont'>
                         <div className='app-space-chat-name-cont self-name'>You</div>
                         <div className='app-space-chat-data-cont self-chat'>placeholder chat</div>                        
                         </div>
                         <div className='app-space-chat-time-cont self-time'>69:00 am</div>
                  </div>
          </div>
     )     
}
const OtherChatCont:React.FC<{}> = (props) =>{
     return(
          <div className='app-space-chat-other-main-cont'>
                  <div className='app-space-chat-other-pic-main-cont'>
                    <IonImg src={pep1} className='app-space-chat-other-pic-img' />
                  </div>  
                  <div className='app-space-chat-other-chat-main-cont'>
                         <div className='app-space-chat-other-chat-main-data-cont'>
                         <div className='app-space-chat-name-cont'>Alvin  <div className='app-space-chat-ecp' /> </div>
                         <div className='app-space-chat-data-cont'>placeholder chat</div>                        
                         </div>
                         <div className='app-space-chat-time-cont'>69:00 am</div>
                  </div>
          </div>
     )     
}



const ChatInpCont:React.FC<{mic_mute:boolean,setMicState:any,setToast:any}> = (props:any) => {
     return(
          <div className='app-chat-inp-main-cont' >
                    <div className='app-chat-inp-butt-cont'>
                    {props.mic_mute===true?
                    <button className='app-chat-inp-butt' onClick={()=>{
                         props.setMicState(false);
                         props.setToast(true,"Mic Unmuted")
                    }}>
                         <IonImg src={Mic_Mute_UnSelec} className='app-chat-inp-butt-ico'></IonImg>
                    </button>:
                    <button className='app-chat-inp-butt' onClick={()=>{
                         props.setMicState(true);
                         props.setToast(true,"Mic muted");
                    }}>
                    <IonImg src={Mic_UnSelec} className='app-chat-inp-butt-ico'></IonImg>
                    </button>
                    }
                    
                    </div>
                    <input type='text' placeholder='Whats on mind?'  className='app-chat-inp-fld'/>
                    
                    <div className='app-chat-inp-butt-cont send-butt-cont'>
                    <button className='app-chat-inp-butt'>
                         <IonImg src={Send} className='app-chat-inp-butt-ico'></IonImg>
                    </button>
                    </div>
                    <div className='app-chat-inp-butt-cont'>
                    <button className='app-chat-inp-butt'>
                         <IonImg src={Fronthand} className='app-chat-inp-butt-ico'></IonImg>
                    </button>
                    </div>
          </div>
     )
}
const ChatCont:React.FC<{}> = (props) =>{
     const ele = document.getElementById('listnr-cont');
     const rect = ele?ele.getBoundingClientRect():null;
     

     return(
         <div className='app-space-chat-main-cont' >
               <OtherChatCont/>
               <OtherChatCont/>
               <OtherChatCont/>
               <SelfChatCont/>   
         </div>
     )
}

 class Space extends React.Component<any,any>{
     userDataArray:Array<any> = [];
     constructor(props:SpaceProps){
          super(props);
          this.state={
               mic_mute:true,
               toastBool:false,
               spaceDataLoading:true,
               spaceDataLoaded:false,
               spaceAttndData:null,
               spaceAttndUserData:null,
               toastStr:"null",
               spaceData:null,
            
          }
          this.setMicState = this.setMicState.bind(this);
          this.setToast = this.setToast.bind(this);
          this.setspaceDataLoaded = this.setspaceDataLoaded.bind(this);
          this.setspaceDataLoading = this.setspaceDataLoading.bind(this);
          this.setSpaceData = this.setSpaceData.bind(this);
          this.initSpaceData = this.initSpaceData.bind(this);
          this.setExtractedData = this.setExtractedData.bind(this);
          this.initSpaceUserData  = this.initSpaceUserData.bind(this);
          this.setspaceAttndData = this.setspaceAttndData.bind(this);
          //this.props.match.params.sid)
     }    

     getUserDataArray(){
          this.userDataArray  = [];
          

     }


  setToast(bool:boolean,str:string){
     this.setState({
          toastBool:bool,
          toastStr:str
     })
 }

     setspaceAttndUserData(data:any){
          this.setState({spaceAttndUserData:data});
     }

     setspaceAttndData(data:any){
          this.setState({spaceAttndData:data})
     }

     setSpaceData(data:any){
          this.setState({spaceData:data});
     }

     setspaceDataLoaded(v:boolean){
          this.setState({spaceDataLoaded:v});
     }

      setspaceDataLoading(v:boolean){
           this.setState({spaceDataLoading:v})
      }

     
     async setExtractedData(data:any){
          this.setSpaceData(data); 
          this.setspaceDataLoading(false);
          this.setspaceDataLoaded(true);
          console.log(data);
          console.log("DATA LOADED BOOl"+this.state.spaceDataLoaded);    
         
     }
     async setListnerData(data:any){
          let fd:Array<any> = [];
          let userData:Array<any>=[];
          for (const gd in data) {
               let op = data[gd];
               if(op){
                    if(op.currentListing){
                         if(op.currentListing ===this.props.sid){
                              op.uid = gd;
                              fd.push(op);
                              let res:any = await backendHelper!._getOtherUserInfo(gd);
                              if(res.errBool===false){
                                   userData.push(res.data);
                              }
                         }         
                    }
               }
          }
          return ({fd,userData});
     }


     async initSpaceUserData(){
          if(FirebaseHelper?.getFirebase()){
               console.log("INITs");
               var database = FirebaseHelper?.getFirebase()!.database();
               var spaceRef = database.ref('user_curr_stat');
               spaceRef.on('value', (snapshot:any) => {
               const data = snapshot.val();
                    if(data){this.setListnerData(data).then(res=>{
                         this.setspaceAttndData(res.fd);
                         this.setspaceAttndUserData(res.userData);
                    })}  
               });
             
          }
          else{
               return null;
          }
     }


     async initSpaceData(){
          if(FirebaseHelper?.getFirebase()){
               console.log("INITs");
               var database = FirebaseHelper?.getFirebase()!.database();
               var spaceRef = database.ref('user_space_det').child(this.props.sid);
               let resdata  = null;
               spaceRef.on('value', (snapshot:any) => {
               const data = snapshot.val();
                    if(data){this.setExtractedData(data);}  
               });
             
          }
          else{
               return null;
          }
     }


     componentDidUpdate(){
       
     }

     setMicState(v:boolean){
          this.setState({mic_mute:v});
     }
  
     componentDidMount(){
          console.log("Space: init ");
          console.log(this.props.sid);
          if(this.props.sid){
               this.initSpaceData().then(()=>{
                    this.initSpaceUserData();
               });
          }
        
     }



     ionViewWillEnter() {
          
          if(this.props.sid==='undefined' || !user.getUserUid()){
            
               history.replace('/land');
          }
          }
      
        ionViewWillLeave() {
     
          }
     componentWillUnmount(){
          console.log("space: unmount");
     }
     
     ionViewDidLeave() {
          console.log("Space: Left");
     }
     
     renderProfileWind(name:any,){
          return(
               <div  className='app-chat-attnd-card'>
                         <div className='app-chat-attnd-card-outer-cont'>
                              <div  className='app-chat-attnd-card-ico-outer-cont'>
                                   <div className='app-chat-attnd-card-ico-cont'>
                                   <IonImg src={profPlaceholder} className='app-chat-attnd-card-ico'/>
                                   </div>
                              </div>
                         <div  className='app-chat-attnd-card-name'>{name}</div>
                         </div>
               </div>         
          )
     }

     renderAttende(){
          return(
               <div className='app-chat-attnd-main-cont'>
                    {this.renderProfileWind("Nameeeee")}
                    {this.renderProfileWind("Nameeeeee")}
                    {this.renderProfileWind("Nameeeee")}
                    {this.renderProfileWind("eeeeeee")}
                    {this.renderProfileWind("Nameeeeeeee")}
                    {this.renderProfileWind("Nameeeeeeee")}
                    {this.renderProfileWind("eeeeeee")}
                    {this.renderProfileWind("Nameeeeeeee")}
                    {this.renderProfileWind("Nameeeeeeee")}
               </div>
          )
     }

     render(){
          return(
               <IonPage >
               <div className='space-content'>
               <IonToolbar className='app-space-toolbar-main-cont'>
                    <IonButtons slot="start">
               <div className='app-chat-inp-butt-cont'>
                 <button className='space-head-butt' onClick={()=>{
                      this.props.setModal(false);
                 }}>
                      <IonImg src={downArrow} className='app-chat-inp-butt-ico space-head-butt-ico'></IonImg>
                 </button>
                 </div> 
                 </IonButtons>
                 <IonButtons slot="end">
               
                    <div className='app-chat-inp-butt-cont'>
                 
                 <button className='space-head-butt'>
                      <IonImg src={Group} className='app-chat-inp-butt-ico space-head-butt-ico'></IonImg>
                 </button>
                 </div> 
                 </IonButtons>
                 {
                              this.state.spaceDataLoaded===true?
                              <IonTitle className='app-space-tit-cont'>{this.state.spaceData.name}                            
                              </IonTitle>:
                              null
               }
               </IonToolbar>
                    <BannerCont attndUserData={this.state.spaceAttndUserData} attndData={this.state.spaceAttndData} />
                    <div className='app-space-name-main-cont'>
                      
                    </div>
                    <TotalListners count={this.state.spaceAttndData?this.state.spaceAttndData.length:0}/>
                    <div className='app-chat-attnd-main-outer-cont'>
                    {this.renderAttende()}
                    </div>
                    {/* <ChatCont /> */}
                  <IonToast
                    isOpen={this.state.toastBool}
                    onDidDismiss={() => this.setToast(false,"null")}
                    message={this.state.toastStr}
                    duration={600}
                    />
                    {
                    this.state.spaceDataLoaded===true?
                    <AgoraPlayer 
                    {...this.props}
                    joinable={true}
                    SID={this.props.sid}
                    spaceData={this.state.spaceData}
                    mic={!this.state.mic_mute}
                    role='host' 
                    UID={user.getUserUid()!}
                    channelToken={this.props.sid}  />:
                    <span></span>
                    }

               </div>
            
               </IonPage>
          )
     }
}

export default withIonLifeCycle(Space)