import { IonContent,IonButton, IonHeader, IonPage, IonItem,IonLabel,IonImg,IonInput,IonTitle, IonToolbar } from '@ionic/react';
import {LoginProps} from '../../types/login/login.type';
import Googlepng from '../../assets/logo/google.png';


import '../../theme/styles/login.style.css';


import React from 'react';


export default class LoginAct<LoginProps> extends React.Component{
     constructor(props:LoginProps){
          super(props);

     }
     render(){
          return(
               <IonPage >
                    <IonContent fullscreen className='app-content-main-cont'>
                              <div className='app-content-head-main-cont'>
                                   <div className='app-content-head-logo-main-cont'>
                                        Seneca
                                   </div>
                                   <div className='app-content-head-right-butt-main-cont'>
                                        Sign Up
                                   </div>
                              </div>

                              <div className='app-content-login-intro-main-cont'>
                                        <div className='app-content-login-intro-ico-cont'>
                                        <svg className='app-content-login-intro-ico' width="375" height="74" viewBox="0 0 375 74" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M-19 28.3145C-4.16184 59.7754 1.93926 96.0402 69.6619 50.5513C151.212 -4.22542 168.755 -10.7365 197.441 21.3964C282.485 116.659 372.758 27.6231 375 9.83373" stroke="#7E93FF" stroke-width="3"/></svg>
                                        </div>
                                        Where everyome is heard
                              </div>

                              <div className='app-content-login-form-main-cont'>
                              <div  className='app-content-login-form-fld-cont' >
                              <IonInput value={""} placeholder="Email address" className='app-content-login-form-fld'></IonInput>
                              </div>
                              <div  className='app-content-login-form-fld-cont' >
                              <IonInput value={""} placeholder="Password" type="password" id='login-pass-fld' className='app-content-login-form-fld'></IonInput>
                              </div>
                                   <div>
                                   <button className='app-content-login-sub-butt'>Sign In</button>
                                   </div>
                                   <div className='app-login-or-main-cont'>or</div>
                                   <div>
                                   <button className='app-content-login-sub-butt'>
                                   <IonImg src={Googlepng}  className='app-content-login-sub-ico-left'/>
                                        Continue with Google
                                        </button>
                                   </div>
                              </div>

                              <div className='app-bottom-deco-main-cont'>
                              <div className='app-bottom-deco-1'/>
                              <div className='app-bottom-deco-2'/>
                              </div>

                    </IonContent>
               </IonPage>
          )
     }
}
