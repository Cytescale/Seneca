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
      useIonRouter} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import '../../../theme/styles/land.style.css';
import { ProfileProps } from '../../../types/land/land.type';
import {More_verti} from '../../../assets/';
import pep2 from '../../../assets/placeholders/pep2.jpg'
import { setToken } from '../../../api/firebaseHelper';
import history from '../../history';




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
                    setToken('null');
                    
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

export default class Profile<ProfileProps> extends React.Component<{},{}>{
     constructor(props:ProfileProps){
          super(props);
     }
     render(){
          return(
               <IonPage >
               <IonContent fullscreen className='app-content-main-cont'>
               <IonToolbar className='app-toolbar-main-cont'>
               <IonButtons slot="start">
                    <IonBackButton defaultHref="/land" />
               </IonButtons>
               <div className='app-toolbar-tit-main-cont'>
               <IonTitle>@username</IonTitle>
               </div>
               
               <Bottomsheet />
               </IonToolbar>
                    <div className='app-profile-main-cont'>
                         <div className='app-profile-pic-main-cont'>
                                   <div className='app-profile-pic-cont'>
                                        <div className='app-profile-pic-inner-cont'>
                                        <IonImg src={pep2 } className='app-profile-pic-cont-ico'/>
                                        <div className='app-profile-pic-cont-butt-cont'>
                                             <IonButton  className='app-profile-pic-cont-butt'>Edit profile</IonButton>
                                        </div>
                                        </div>
                                        <div className='app-profile-pic-name'>Creator Name</div>
                                   </div>
                         </div>
                          <div className='app-profile-bio-main-cont'>
                                             <div className='app-profile-bio-cont'>
                                                       Placeholder bio <br/> 
                                                       Placeholder bio <br/> 
                                                       Placeholder bio <br/> 
                                             </div>
                         </div>
                         <div className='app-profile-count-main-cont'>
                                   <div className='app-profile-tab-main-cont'>
                                             <div className='app-profile-tab-tit'>Followers</div>
                                             <div className='app-profile-tab-count'>100</div>
                                   </div>
                                   <div className='app-profile-tab-main-cont'>
                                             <div className='app-profile-tab-tit'>Following</div>
                                             <div className='app-profile-tab-count'>200</div>
                                   </div>
                         </div>
                                   
                         

                    </div>
               </IonContent>
               </IonPage>
          )
     }
}