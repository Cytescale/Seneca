import React,{useState} from 'react';
import {IonContent,
       useIonActionSheet,
       IonActionSheet,
      IonHeader,
      IonPage,
      IonToolbar,
      IonTitle,
      IonButtons,
      IonButton,
      IonBackButton,
      IonImg, 
      IonSkeletonText ,
      useIonRouter} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import '../../../theme/styles/land.style.css';
import { ProfileProps } from '../../../types/land/land.type';
import {More_verti,profPlaceholder,downArrow} from '../../../assets/';
import pep2 from '../../../assets/placeholders/pep2.jpg'
import { setToken,setUid } from '../../../api/firebaseHelper';
import history from '../../history';
import User, { userData } from '../../../components/user';


import BackendHelper from '../../../api/backendHelper';
import { getUid } from '../../../api/firebaseHelper';
let backendHelper:BackendHelper|null = null;
const user = new User();
let  gotUser:userData|null = null;


const Bottomsheet:React.FC<{}> = (props)=>{
     const [showActionSheet, setShowActionSheet] = useState(false);
     const router = useIonRouter();
     return(
          <div slot="end">
               <IonButtons onClick={() => setShowActionSheet(true)}>
                    <IonImg src={More_verti} className='app-toolbar-tit-more-ico' />
               </IonButtons>
      <IonActionSheet
        isOpen={showActionSheet}
        onDidDismiss={() => setShowActionSheet(false)}
        cssClass='my-custom-class'
        buttons={[{
               text: 'Block',
               role: 'destructive',
               handler: () => {

               }
          }, 
          {
               text: 'Cancel',
               role: 'cancel',
               handler: () => {
               
               }
          }]}
          >
          </IonActionSheet>
          </div>
     )
}


const FollowButton:React.FC<{}> = (props)=>{
     const rtr = useIonRouter();
     return(
          <IonButton  className='app-profile-view-pic-cont-butt' onClick={()=>{
               rtr.push('/editprofile','forward','push');    
         }} >Follow</IonButton>
     );
}

interface profileViewInter  {
     setModal:any
     suid:string|null
}

export default class ProfileView<profileViewInter> extends React.Component<any,{
     userDataLoaded:boolean
}>{
     
     constructor(props:profileViewInter){
          super(props);
          this.state={
               userDataLoaded:true
          }
          this.setUserDataLoad = this.setUserDataLoad.bind(this);
          this.profileClassInit = this.profileClassInit.bind(this);
     }

     setUserDataLoad(val:boolean){
          this.setState({userDataLoaded:val})
     }

     profileClassInit(reloadBool?:boolean){
          if(reloadBool!){
               console.log("Profile View: reload uid"+this.props.suid);          
          }
          if(this.props.suid)backendHelper = new BackendHelper(this.props.suid!);
          if(backendHelper){
               backendHelper._getUserInfo().then((res:any)=>{
                    console.log("HIT");
                    if(res.errBool!==true){
                         gotUser = res.data;
                         this.setUserDataLoad(true);
                    }
               });
          }
     }

     componentDidMount(){
          console.log("Profile View: uid"+this.props.suid);  
          this.profileClassInit(false);
     }

     render(){
          return(
               <IonPage >
               <IonContent fullscreen className='profile-view-main-cont'>
               <IonToolbar className='app-toolbar-main-cont profile-view-head-main'>
               <IonButtons slot="start">
                    <IonButton onClick={()=>{
                         this.props.setModal(false);
                         }}><IonImg src={downArrow}/></IonButton>
               </IonButtons>
               <div className='app-toolbar-tit-main-cont'>
               <IonTitle> {this.state.userDataLoaded?<IonSkeletonText animated style={{width:'100%',height:'22px','--border-radius':'4px'}}/>:
                         <span>@{user.getUserData()?.uname}</span>     
                         }</IonTitle>
               </div>
               
               <Bottomsheet />
               </IonToolbar>
                    <div className='app-profile-main-cont'>
                         <div className='app-profile-pic-main-cont'>
                                   <div className='app-profile-pic-cont'>
                                   {this.state.userDataLoaded?<IonSkeletonText animated style={{width:'100px',height:'100px','--border-radius':'4px'}}/>:
                                        <div className='app-profile-pic-inner-cont'>
                                        <IonImg src={profPlaceholder} className='app-profile-pic-cont-ico'/>
                                        <div className='app-profile-pic-cont-butt-cont'>
                                           <FollowButton/>
                                        </div>
                                        </div>
                                   } 
                                        
                                        <div className='app-profile-pic-name'>{this.state.userDataLoaded?<IonSkeletonText animated style={{width:'100%',height:'14px','--border-radius':'4px'}}/>:
                                        <span>{user.getUserData()?.dname}</span>}</div>
                                   </div>
                         </div>
                          <div className='app-profile-bio-main-cont'>
                                             <div className='app-profile-bio-cont'>
                                             {this.state.userDataLoaded?<IonSkeletonText animated style={{width:'100%',height:'100%','--border-radius':'4px'}}/>:
                                             <div>
                                                   {user.getUserData()?.bio}
                                             </div>
                                             }
                                                   
                                             </div>
                         </div>
                         <div className='app-profile-count-main-cont'>
                                   <div className='app-profile-tab-main-cont'>
                                             <div className='app-profile-tab-tit'>Followers</div>
                                             <div className='app-profile-tab-count'>
                                             {this.state.userDataLoaded?<IonSkeletonText className='app-skelt-main-cont' animated style={{width:'80px',height:'22px','--border-radius':'4px'}}/>:
                                             <span>0</span>
                                             }</div>
                                   </div>
                                   <div className='app-profile-tab-main-cont'>
                                             <div className='app-profile-tab-tit'>Following</div>
                                             <div className='app-profile-tab-count'>{this.state.userDataLoaded?<IonSkeletonText animated style={{width:'80px',height:'22px','--border-radius':'4px'}}/>:
                                             <span>0</span>
                                             }</div>
                                   </div>
                         </div>
                                   
                         

                    </div>
               </IonContent>
               </IonPage>
          )
     }
}