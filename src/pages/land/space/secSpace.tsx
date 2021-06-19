import React,{useState,useEffect} from 'react';
import {IonSearchbar,IonContent, IonFooter,IonToast,IonLoading,IonModal,IonHeader,withIonLifeCycle,IonPage,IonToolbar,IonTitle,IonButtons,IonIcon,IonButton,IonBackButton,IonRouterOutlet,IonTabBar,IonTabButton,IonImg,IonTabs } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import '../../../theme/styles/land.style.css';
import '../../../theme/styles/space.style.css';
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
import landInter from '../../../components/landInter';
import nexusResponse from '../../../api/nexusResponse';


let backendHelper:BackendHelper|null = new BackendHelper(null);

let user  =  new User();
let FirebaseHelper:firebaseHelper|null = new firebaseHelper();
let AgoraHelper:agoraHelper =  new agoraHelper(user.getUserUid());
let UserTmpDb = new userTempDb();


export  interface spaceProps extends landInter{
     mic:boolean
     setMic:any
     joined:boolean
     setJoined:any
     joinedName:string
     setJoinedName:any
}


const ChatInpCont:React.FC<any> = (props:any) => {
     return(
          <div className='app-chat-inp-main-cont' >
                    <div className='app-chat-inp-butt-cont'>
                    {props.mic===true?
                           <button className='app-chat-inp-butt' onClick={()=>{
                                 props.setMic(false);
                                 props.setSuccToast(true,"Mic Muuted")
                           }}>
                                 <IonImg src={Mic_UnSelec} className='app-chat-inp-butt-ico'></IonImg>
                           </button>:
                    <button className='app-chat-inp-butt' onClick={()=>{
                         props.setMic(true);
                         props.setSuccToast(true,"Mic Unmuted");
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




class Space extends React.Component<spaceProps,any>{
     constructor(props:any){
          super(props);
          this.state={
               mic:false,
               succToastBool:false,
               succToastMess:null,
               errToastBool:false,
               errToastMess:null,
               spaceData:null,
               spaceDataLoading:true,
               spaceDataLoaded:false,
               spaceAttndData:null,
               spaceAttndUserData:null,
               broadUserdata:null,
               listners:0,
               loading:false,
          }
          this.setMic = this.setMic.bind(this);
          this.setErrToast = this.setErrToast.bind(this);
          this.setSuccToast = this.setSuccToast.bind(this);
          this.setspaceDataLoaded = this.setspaceDataLoaded.bind(this);
          this.setspaceDataLoading = this.setspaceDataLoading.bind(this);
          this.setSpaceData = this.setSpaceData.bind(this);
          this.initSpaceComp = this.initSpaceComp.bind(this);
          this.setLoading = this.setLoading.bind(this);
          this.LoadAgora = this.LoadAgora.bind(this);
     }
     setMic(b:boolean){
          this.setState({mic:b})
          AgoraHelper.setMic(b);
}
     setSuccToast(b:boolean,m:string|null){
          this.setState({succToastBool:b,succToastMess:m});
     }
     setErrToast(b:boolean,m:string|null){
          this.setState({errToastBool:b,errToastMess:m});
     }
     setlistners(v:number){this.setState({listners:v});}
     setspaceAttndUserData(data:any){this.setState({spaceAttndUserData:data});}
     setSpaceData(data:any){this.setState({spaceData:data});}
     setspaceDataLoaded(v:boolean){this.setState({spaceDataLoaded:v});}
     setspaceDataLoading(v:boolean){this.setState({spaceDataLoading:v})}
     setLoading(v:boolean){this.setState({loading:v});}

     async initSpaceComp(){
          if(!this.props.spaceData){
               await backendHelper?.getSpaceDatabySid(user.getUserUid()!,this.props.sid).then((res:nexusResponse)=>{
                    if(!res.errBool){
                         this.setSpaceData(res.responseData.gotData)
                         this.setspaceDataLoaded(true);     
                         this.LoadAgora();
                    }else{
                         this.setErrToast(true,res.errMess);
                    }
               }).catch((e)=>{
                    this.props.setJoined(false);
                    this.props.setSpaceModal(false);
                    this.props.setSid(null);
                    this.props.setJoinedName(null)
                    this.setErrToast(true,e);
                    console.log(e);
               }).finally(()=>{
                    this.setspaceDataLoading(false);
               });
          }else{
               await this.setSpaceData(this.props.spaceData);
               this.setspaceDataLoading(false);
               this.setspaceDataLoaded(true);
               this.LoadAgora();
          }
          
     }

     async AgoraJoningPromise(){
          return new Promise((resolve, reject) => {
               setTimeout(async ()=>{
                         await AgoraHelper._joinStream().then((r)=>{resolve(r);}).catch(e=>{reject(e);});
               }, 5000);
          })        
     }
     
     async LoadAgora(){
          if(!AgoraHelper.isConnected()){
          AgoraHelper._initClient();
          AgoraHelper.setSpaceData(this.state.spaceData);
          AgoraHelper.setjoinDetails(
          this.state.spaceData.agora_channel_name,
          this.state.spaceData.agora_channel_token,
           true,);
           this.AgoraJoningPromise().then((r)=>{
               console.log("space: joining res"+r);
               this.props.setJoinedName(this.state.spaceData.name);
               this.setSuccToast(true,'Space joined');
               this.props.setJoined(true);
               this.setLoading(false);
           }).catch((e)=>{
               console.log('space: joining res err'+e);
               this.props.setJoined(false);
               this.props.setSpaceModal(false);
               this.props.setSid(null);
               this.props.setJoinedName(null)
               this.setErrToast(true,e);
           })
          }   else{
               this.setSuccToast(true,'Space already joined');
          }
     }

     componentDidMount(){  
          this.initSpaceComp();
          
     }

     render(){
          return(
               <IonPage >
                    <IonContent>
                    <div className='space-content'>
                              <IonToolbar className='app-space-toolbar-main-cont'>
                                   <IonButtons slot="start">
                                   <button className='space-head-butt'onClick={()=>{
                                        this.props.setSpaceModal(false);
                                   }}>
                                             <IonImg src={downArrow} className='app-chat-inp-butt-ico space-head-butt-ico'></IonImg>
                                          </button>
                                   </IonButtons>
                                   <IonButtons slot="end">
                                   <div className='app-chat-inp-butt-cont'>
                                          <button className='space-head-butt' onClick={()=>{
                                        this.props.setProfileListModal(true);
                                   }}>
                                   <IonImg src={Group} className='app-chat-inp-butt-ico space-head-butt-ico'></IonImg>
                              </button>
                              </div> 
                              </IonButtons>
                              </IonToolbar>
                              <div className='app-space-content'>
                                   <div className='app-space-tit-main-cont'>
                                        {this.state.spaceDataLoaded?<IonImg src={profPlaceholder} className='app-space-tit-main-cont-ico'/>:null}
                                        {this.state.spaceDataLoaded?this.state.spaceData.name:null}
                                   </div>
                                   <div className='app-space-des-main-cont'>
                                        {this.state.spaceDataLoaded?this.state.spaceData.des:null}  
                                   </div>
                                   <div className='app-space-tit-data-outer-main-cont'>
                                        <div className='app-space-tit-data-main-cont'>
                                        <IonImg src={Mic_UnSelec} className='app-space-tit-data-main-cont-ico'></IonImg>
                                        100
                                        </div>
                                        <div className='app-space-tit-data-main-cont'>
                                        <IonImg src={headphones} className='app-space-tit-data-main-cont-ico'></IonImg>
                                        100
                                        </div>
                                        
                                   </div>
                                   <div className='app-space-hr-main-cont'>
                                        Speakers
                                   </div>
                                   <div className='app-chat-attnd-main-cont'>
                                             <div  className='app-chat-attnd-card'>
                                                  <div className='app-chat-attnd-card-outer-cont'>
                                                       <div  className='app-chat-attnd-card-ico-outer-cont'>
                                                            <div className='app-chat-attnd-card-ico-cont'>
                                                            <IonImg src={profPlaceholder} className='app-chat-attnd-card-ico'/>
                                                            </div>
                                                       </div>
                                                       <div  className='app-chat-attnd-card-name'>Name</div>
                                                  </div>
                                             </div>  
                                       
                                   </div>
                                   <div className='app-space-hr-main-cont'>
                                        Joined 
                                   </div>
                                   <div className='app-chat-attnd-main-cont'>
                                             <div  className='app-chat-attnd-card'>
                                                  <div className='app-chat-attnd-card-outer-cont'>
                                                       <div  className='app-chat-attnd-card-ico-outer-cont'>
                                                            <div className='app-chat-attnd-card-ico-cont'>
                                                            <IonImg src={profPlaceholder} className='app-chat-attnd-card-ico'/>
                                                            </div>
                                                       </div>
                                                       <div  className='app-chat-attnd-card-name'>Name</div>
                                                  </div>
                                             </div>  
                                        
                                   </div>
                              </div> 
                              {this.props.joined?<ChatInpCont
                                mic={this.state.mic}
                                setMic={this.setMic}
                                setErrToast={this.setErrToast}
                                setSuccToast={this.setSuccToast}
                                closeCall={()=>{
                                     AgoraHelper._destroyCall().then((r)=>{
                                          this.props.setJoined(false);
                                          this.props.setSpaceModal(false);
                                          this.props.setSid(null);
                                          this.props.setJoinedName(null)
                                          this.setSuccToast(true,'Space Left');
                                     }).catch((e)=>{
                                          this.setErrToast(true,e);
                                     });
            
                                }}
                              />:null
                              }
                              
                              
                                        <IonLoading
                                        cssClass='my-custom-class'
                                        isOpen={(this.state.spaceDataLoading)||(this.state.loading)}
                                        onDidDismiss={() => {
                                             if(this.state.spaceDataLoading){
                                                  this.setspaceDataLoading(false)
                                             }
                                             if(this.state.loading){
                                                  this.setLoading(false)
                                             }
                                             
                                        }}
                                        message={'Please wait...'}
                                        />
                                        <IonToast
                                        isOpen={this.state.errToastBool}
                                        color='danger'
                                        onDidDismiss={() => this.setErrToast(false,'null')}
                                        message={this.state.errToastMess!}
                                        duration={1000}
                                        />
                                         <IonToast
                                        isOpen={this.state.succToastBool}
                                        color='success'
                                        onDidDismiss={() => this.setSuccToast(false,'null')}
                                        message={this.state.succToastMess!}
                                        duration={1000}
                                        />
                    </div>
                    
                    </IonContent>
               </IonPage>
          )
     }

}


export default withIonLifeCycle(Space)