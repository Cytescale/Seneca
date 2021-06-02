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
import {More_verti,profPlaceholder} from '../../../assets/';
import pep2 from '../../../assets/placeholders/pep2.jpg'
import { setToken,setUid } from '../../../api/firebaseHelper';
import history from '../../history';
import User from '../../../components/user';


import BackendHelper from '../../../api/backendHelper';
import { getUid } from '../../../api/firebaseHelper';
let backendHelper:BackendHelper|null = null;
const user = new User();

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
               text: 'Logout',
               role: 'destructive',
               handler: () => {
                    user.setUserToken(null);
                    user.setUserUid(null);
                    setToken('null');
                    setUid('null');
                    router.push('/login','none','replace');    
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


const EditButton:React.FC<{}> = (props)=>{
     const rtr = useIonRouter();
     return(
          <IonButton  className='app-profile-pic-cont-butt' onClick={()=>{
               rtr.push('/editprofile','forward','push');    
         }} >Edit profile</IonButton>
     );
}



export default class Profile<ProfileProps> extends React.Component<{},{
     userDataLoaded:boolean
}>{
     
     constructor(props:ProfileProps){
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
               console.log("Profile: reload uid"+user.getUserUid());          
          }
          if(user.getUserUid())backendHelper = new BackendHelper(user.getUserUid()!);
          if(backendHelper){
               backendHelper._getUserInfo().then((res:any)=>{
                    if(res.errBool!==true){
                         user.setUserData(res.data);
                         this.setUserDataLoad(false);
                         console.log(user.getUserData()!.cname);
                    }
               });
          }
     }

     componentDidMount(){
          console.log("Profile: init uid"+user.getUserUid());
          this.profileClassInit(false);
     }

     render(){
          return(
               <IonPage >
               <IonContent fullscreen className='app-content-main-cont'>
               <IonToolbar className='app-toolbar-main-cont'>
               <IonButtons slot="start">
                    {/* <IonBackButton defaultHref="/land" /> */}
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
                                           <EditButton/>
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
                                             {this.state.userDataLoaded?<IonSkeletonText animated style={{width:'80px',height:'22px','--border-radius':'4px'}}/>:
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