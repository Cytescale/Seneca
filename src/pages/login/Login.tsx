import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';

interface LoginProps{

}

export default class LoginAct<LoginProps> extends React.Component{
     constructor(props:LoginProps){
          super(props);

     }
     render(){
          return(
               <div>
                    Login Page Test
               </div>
          )
     }
}
