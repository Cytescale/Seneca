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
      IonItem,
      IonLabel,
      IonInput,
      IonImg, 
      IonSkeletonText ,
      IonTextarea ,
      useIonRouter} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import '../../theme/styles/editprofile.style.css';
import { editProfileProps } from '../../types/land/land.type';
import {More_verti,profPlaceholder} from '../../assets/';
import pep2 from '../../../assets/placeholders/pep2.jpg'
import { setToken,setUid } from '../../api/firebaseHelper';
import history from '../history';
import User,{userData} from '../../components/user';


import BackendHelper from '../../api/backendHelper';
import { getUid } from '../../api/firebaseHelper';
let backendHelper:BackendHelper|null = null;
const user = new User();
let editUser:userData|null = null;
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

export default class EditProfile<editProfileProps> extends React.Component<{},{
     userDataLoaded:boolean
}>{
     constructor(props:editProfileProps){
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
                         editUser = res.data;
                         this.setUserDataLoad(false);
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
                    
                    {this.state.userDataLoaded?editUser?.init_bool==true?<IonBackButton defaultHref="/land" />:null:null}
                   
               </IonButtons>
               <div className='app-toolbar-tit-main-cont'>
               <IonTitle className='app-toolbar-tit'> Edit Profile </IonTitle>
               </div>
               <IonButtons slot="end">
                    <IonButton  className='app-edit-prof-save-butt'>Save</IonButton>
               </IonButtons>
               
               </IonToolbar>
                    <div className='app-profile-main-cont'>
                         <div className='app-profile-pic-main-cont'>
                                   <div className='app-profile-pic-cont'>
                                   {this.state.userDataLoaded?<IonSkeletonText animated style={{width:'100px',height:'100px','--border-radius':'4px'}}/>:
                                        <div className='app-edit-profile-pic-inner-cont'>
                                        <IonImg src={profPlaceholder} className='app-profile-pic-cont-ico'/>
                                        <div className='app-edit-profile-pro-chnge-butt-cont'>
                                        </div>
                                        </div>                             
                                   } 
                                   </div>
                         </div>
                         {this.state.userDataLoaded?<IonSkeletonText animated style={{width:'100%',height:'100px',marginTop:'12px','--border-radius':'0px'}}/>:
                         <div className='app-edit-profile-data-main-cont'>
                         <IonItem  className='app-edit-profile-data-item-cont'>
                         <IonLabel className='app-edit-profile-data-lab-cont'><div className='app-edit-profile-data-lab'>Display name</div></IonLabel>
                         <IonInput className='app-edit-profile-data-inp' value={editUser?.dname}></IonInput>
                         </IonItem>
                         
                         <IonItem  className='app-edit-profile-data-item-cont'>
                         <IonLabel className='app-edit-profile-data-lab-cont'><div className='app-edit-profile-data-lab'>Username</div></IonLabel>
                         <IonInput className='app-edit-profile-data-inp' value={editUser?.uname}></IonInput>
                         </IonItem>
                         <IonItem  className='app-edit-profile-data-item-cont'>
                         <IonLabel className='app-edit-profile-data-lab-cont'><div className='app-edit-profile-data-lab'>Bio</div></IonLabel>
                         <IonTextarea className='app-edit-profile-data-inp edit-txt-ara' value={editUser?.bio}></IonTextarea>
                         </IonItem>
                         </div>}
                    </div>
               </IonContent>
               </IonPage>
          )
     }
}