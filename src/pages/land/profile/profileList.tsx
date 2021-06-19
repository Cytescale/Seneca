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
      withIonLifeCycle,
      useIonRouter} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import '../../../theme/styles/land.style.css';
import { ProfileProps } from '../../../types/land/land.type';
import {More_verti,profPlaceholder} from '../../../assets/';
import pep2 from '../../../assets/placeholders/pep2.jpg'
import { setToken,setUid } from '../../../api/firebaseHelper';
import history from '../../history';
import User from '../../../components/user';
import nexusResponse from '../../../api/nexusResponse';

import BackendHelper from '../../../api/backendHelper';
import { getUid } from '../../../api/firebaseHelper';
let backendHelper:BackendHelper|null = null;
const user = new User();

 class ProfileListView extends React.Component<any,any>{
     
     constructor(props:ProfileProps){
          super(props);
          this.state={
          
          }
          
     }

     ionViewDidEnter(){
          
     }

     ionViewWillEnter() {
          
     }
      
     ionViewWillLeave() {
     
     }
     
     ionViewDidLeave() {
         
     }
     render(){
          return(
               <IonPage >
               <IonContent fullscreen className='app-content-main-cont profile-view-cont'>
                         
               </IonContent>
               </IonPage>
          )
     }
}

export default withIonLifeCycle(ProfileListView)