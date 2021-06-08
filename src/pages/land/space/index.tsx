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
const BannerCont:React.FC<{}>=(props)=>{
     return(
          <div className='app-space-banner-main-cont'>
               <IonImg src={ban2} className='app-space-banner-img'/>
               <div className='app-space-banner-bottom-main-cont'>
                    <SpeakersCont name='alvin' proPic={pep1} isLive={true} />
               </div>
          </div>
     )
}
const TotalListners:React.FC<{count:number}> = (props) =>{
     return(
          <div className='app-total-listners-main-cont' id='listnr-cont'>
               
               <div className='app-total-listners-count'>
                   <div className='app-total-listners-count-ecp' />{props.count} Listners
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
     constructor(props:SpaceProps){
          super(props);
          this.state={
               mic_mute:true,
               toastBool:false,
               spaceDataLoading:true,
               spaceDataLoaded:false,
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
     }

     
  setToast(bool:boolean,str:string){
     this.setState({
          toastBool:bool,
          toastStr:str
     })
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


     async initSpaceData(){
          if(FirebaseHelper?.getFirebase()){
               console.log("INITs");
               var database = FirebaseHelper?.getFirebase()!.database();
               var spaceRef = database.ref('user_space_det').child(this.props.match.params.sid);
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
          console.log(this.props.match.params.sid);
          if(this.props.match.params.sid){
               this.initSpaceData();
          }
        
     }



     ionViewWillEnter() {
          
          if(this.props.match.params.sid==='undefined' || !user.getUserUid()){
            
               history.replace('/land');
          }
          }
      
        ionViewWillLeave() {
     
          }
     componentWillUnmount(){
     }
     
     ionViewDidLeave() {
          console.log("Space: Left");
     }
     render(){
          return(
               <IonPage >
               <div className='space-content'>
               <IonToolbar className='app-space-toolbar-main-cont'>
               <IonButtons slot="start">
                    <IonBackButton defaultHref="/land" />
               </IonButtons>
               <IonButtons slot="end" className='app-toolbar-end-butt-cont' >
                    <div className='app-toolbar-end-outer-butt'>
                    <IonButton className='app-toolbar-end-butt' >
                    <IonImg src={Person_add} className='app-toolbar-tit-more-ico' />
                    </IonButton>
                    </div>
                    <div className='app-toolbar-end-outer-butt'>
                    <IonButton className='app-toolbar-end-butt' >
                    <IonImg src={Share} className='app-toolbar-tit-more-ico' />
                    </IonButton>
                    </div>
                    <div className='app-toolbar-end-outer-butt'>
                    <IonButton className='app-toolbar-end-butt' >
                    <IonImg src={Call_end} className='app-toolbar-tit-more-ico' />
                    </IonButton>
                    </div>
               </IonButtons>
               </IonToolbar>
                    <BannerCont />
                    <div className='app-space-name-main-cont'>
                         {
                              this.state.spaceDataLoaded===true?
                              this.state.spaceData.name:
                              null
                         }
                    </div>
                    <TotalListners count={0}/>
                    <ChatCont />
                  <IonToast
                    isOpen={this.state.toastBool}
                    onDidDismiss={() => this.setToast(false,"null")}
                    message={this.state.toastStr}
                    duration={600}
                    />
                    {
                    this.state.spaceDataLoaded===true?
                    <AgoraPlayer 
                    joinable={true}
                    spaceData={this.state.spaceData}
                    mic={!this.state.mic_mute}
                    role='host' 
                    UID={user.getUserUid()!}
                    channelToken={this.props.match.params.sid}  />:
                    <span></span>
                    }

               </div>
            
               </IonPage>
          )
     }
}

export default withIonLifeCycle(Space)