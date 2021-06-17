import React,{useState,useEffect} from 'react';
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
import User, { userData } from '../../../components/user';
import userTempDb from '../../../components/userTempDb';
import BackendHelper from '../../../api/backendHelper';
import agoraHelper from '../../../api/agoraHelper';


let backendHelper:BackendHelper|null = new BackendHelper(null);

let user  =  new User();
let FirebaseHelper:firebaseHelper|null = new firebaseHelper();
let AgoraHelper:agoraHelper =  new agoraHelper(user.getUserUid());
let UserTmpDb = new userTempDb();
//AgoraHelper.getJoiningId();
//AgoraHelper.setJoiningId(user.getUserData()!.joining_id);



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
       }, 1500)
     })
   }

const  RenderAttnds:React.FC<any> = (props)=>{
     let [pd,setPd] = useState<any>(<div className='app-atnd-ico-cont'></div>);
     console.log("space: on request "+props.jid);
     useEffect(() => {
          getDataByJoiningId(props.jid)
          .then((data:any) =>{
          console.log('space: result'+data?.dname);
          setPd(
                              <div  className='app-chat-attnd-card'>
                                    <div className='app-chat-attnd-card-outer-cont'>
                                         <div  className='app-chat-attnd-card-ico-outer-cont'>
                                              <div className='app-chat-attnd-card-ico-cont'>
                                              <IonImg src={profPlaceholder} className='app-chat-attnd-card-ico'/>
                                              </div>
                                         </div>
                                         <div  className='app-chat-attnd-card-name'>{data?.dname}</div>
                                    </div>
                               </div>       
          )
          });
     }, [props.jid])
     return(pd)                   
}   


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


const ChatInpCont:React.FC<{mic:boolean,setMicState:any,setToast:any,closeCall:any}> = (props:any) => {
     return(
          <div className='app-chat-inp-main-cont' >
                    <div className='app-chat-inp-butt-cont'>
                    {props.mic===true?
                           <button className='app-chat-inp-butt' onClick={()=>{
                                 props.setMicState(false);
                                 props.setToast(true,"Mic Muuted")
                           }}>
                                 <IonImg src={Mic_UnSelec} className='app-chat-inp-butt-ico'></IonImg>
                           </button>:
                    <button className='app-chat-inp-butt' onClick={()=>{
                         props.setMicState(true);
                         props.setToast(true,"Mic Unmuted");
                    }}>
                    <IonImg src={Mic_Mute_UnSelec} className='app-chat-inp-butt-ico'></IonImg>
                    </button>
                    }
                    
                    </div>
                    <div className='app-chat-inp-butt-cont'>
                    <button className='app-chat-inp-butt'>
                         <IonImg src={Person_add} className='app-chat-inp-butt-ico'></IonImg>
                    </button>
                    </div>
                    <div className='app-chat-inp-butt-cont send-butt-cont'>
                    <button className='app-chat-inp-but-end' onClick={()=>{
                       props.closeCall();
                    }}>
                         Leave <IonImg src={Call_end} className='app-chat-inp-butt-ico space-end-ico'></IonImg>
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
     atndCacheEle:any = null;
      broadUserChangeFlag:boolean = false;

     constructor(props:SpaceProps){
          super(props);
          this.state={
               mic:false,
               toastBool:false,
               spaceDataLoading:true,
               spaceDataLoaded:false,
               spaceAttndData:null,
               spaceAttndUserData:null,
               toastStr:"null",
               spaceData:null,

               broadUserdata:null,
               listners:0,

               loading:false,
          }
          this.setMic = this.setMic.bind(this);
          this.setToast = this.setToast.bind(this);
          this.setspaceDataLoaded = this.setspaceDataLoaded.bind(this);
          this.setspaceDataLoading = this.setspaceDataLoading.bind(this);
          this.setSpaceData = this.setSpaceData.bind(this);
          this.initSpaceData = this.initSpaceData.bind(this);
          this.setExtractedData = this.setExtractedData.bind(this);
    
          this.setLoading = this.setLoading.bind(this);
     }    

     getUserDataArray(){
          this.userDataArray  = [];
     }


     setlistners(v:number){
          this.setState({listners:v});
     }

     setbroadUserdata(v:any){
          this.broadUserChangeFlag =  true;
          this.setState({broadUserdata:v});
     }

     setLoading(v:boolean){
          this.setState({loading:v});
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

     setSpaceData(data:any){
          this.setState({spaceData:data});
     }

     setspaceDataLoaded(v:boolean){
          this.setState({spaceDataLoaded:v});
     }

      setspaceDataLoading(v:boolean){
           this.setState({spaceDataLoading:v})
      }

      setMic(v:boolean){
          this.setState({mic:v});
          AgoraHelper.setMic(v);
     }
  
     

     async setExtractedData(data:any){
         if(!this.state.spaceDataLoaded){
               await this.setSpaceData(data); 
         }
          this.setspaceDataLoading(false);
          this.setspaceDataLoaded(true);
          console.log(data);
          console.log("space: data loaded bool"+this.state.spaceDataLoaded);    
         
     }
  

     async initSpaceData(){
          if(FirebaseHelper?.getFirebase()){
               console.log("INITs");
               var database = FirebaseHelper?.getFirebase()!.database();
               var spaceRef = database.ref('user_space_det').child(this.props.sid);
               let resdata  = null;
               spaceRef.on('value', (snapshot:any) => {
               const data = snapshot.val();
                    if(data){
                         this.setExtractedData(data);
                         this.setlistners(data.listner);
                         this.setbroadUserdata(data.broadcaster);
                    }  
               });
             
          }
          else{
               return null;
          }
     }


     componentDidUpdate(){
       
     }

     componentDidMount(){
          console.log("space: init ");
          console.log(this.props.sid);
          if(this.props.sid){
               this.initSpaceData().then(()=>{
                              if(this.state.spaceData){
                                   AgoraHelper._initClient();
                                   AgoraHelper.setSpaceData(this.state.spaceData);
                                   AgoraHelper.setjoinDetails(
                                   this.state.spaceData.agora_channel_name,
                                   this.state.spaceData.agora_channel_token,
                                   true,
                                   );
                                   AgoraHelper._joinStream().then((r)=>{
                                        console.log("space: joining res"+r);
                                        this.props.setJoinedName(this.state.spaceData.name);
                                        this.setToast(true,'Space Joined ');
                                        this.props.setJoined(true);
                                        this.setLoading(false);
                                   }).catch(e=>{
                                        console.log("space: joining error"+e);
                                        this.setToast(true,e);
                                        this.setLoading(false);
                                   });
                              
                              }else{
                                   console.log('space: space data init missing data');
                              }
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


      renderAttende(){
          if(this.state.spaceDataLoaded=== true && this.broadUserChangeFlag === true){
          console.log("space: atndee render");
          let renderRes:any=[];
               if(this.state.broadUserdata){
                         if(this.state.broadUserdata.length > 0){ 
                              this.state.broadUserdata.map((e:number) => {
                                   console.log("space: " +e);
                                   renderRes.push(<RenderAttnds jid={e}/>)
                              });
                         }
               } 
               console.log('space: render finish');
               this.broadUserChangeFlag = false;
               let data = <div className='app-chat-attnd-main-cont'>{renderRes}</div>;
               this.atndCacheEle = data;
               return(this.atndCacheEle);
          }
          else{
               return(this.atndCacheEle);    
          }
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
                    <TotalListners count={this.state.spaceData?this.state.listners:0}/>
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
                      <IonLoading
                    cssClass='my-custom-class'
                    isOpen={this.state.loading}
                    onDidDismiss={() => this.setLoading(false)}
                    message={'Please wait...'}
                    />
                      {
                    this.state.spaceDataLoaded===true?
                    <ChatInpCont 
                    mic={this.state.mic}
                    setMicState={this.setMic}
                    setToast={this.setToast}
                    closeCall={()=>{
                         AgoraHelper._destroyCall().then((r)=>{
                              this.props.setJoined(false);
                              this.props.setModal(false);
                              this.props.setSid(null);
                              this.props.setJoinedName(null)
                              this.setToast(true,'Space Left');
                         }).catch((e)=>{
                              this.setToast(true,e);
                         });

                    }}
                    />:
                    <span></span>
                    }

               </div>
            
               </IonPage>
          )
     }
}

export default withIonLifeCycle(Space)