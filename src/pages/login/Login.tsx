import { IonContent,IonButton, IonHeader, IonPage, IonSpinner,IonItem,IonLabel,IonImg,IonInput,IonTitle, IonToolbar } from '@ionic/react';
import {LoginProps} from '../../types/login/login.type';
import Googlepng from '../../assets/logo/google.png';


import '../../theme/styles/login.style.css';


import React,{useState} from 'react';


interface LoginFormProps {
     loading?:boolean
     disabled?:boolean
}

const LoginFormCont:React.FC<LoginFormProps> = (props)=>{
     const [unm, setunm] = useState<string>();
     const [pas, setpas] = useState<string>();
     const [loading, setload] = useState<boolean>(props.loading?props.loading:false);
     const [disabled, setdisa] = useState<boolean>(props.disabled?props.disabled:false);
     
     return(
          <div className='app-content-login-form-inner-main-cont'>
          <div className='app-content-login-form-fld-main-cont'>
           <div  className='app-content-login-form-fld-cont' >
           <div className='app-content-login-form-fld-cont-tit' > Login </div> 
           <IonInput value={""} disabled={disabled} placeholder="Email address" className='app-content-login-form-fld'></IonInput>
           </div>
           <div  className='app-content-login-form-fld-cont' >
           <IonInput value={""} disabled={disabled} placeholder="Password" type="password" id='login-pass-fld' className='app-content-login-form-fld'></IonInput>
           </div>
           </div>
                <div>
                <IonButton type='submit'disabled={disabled} className='app-content-login-sub-butt' >
                     {loading===false?'Sign In':<IonSpinner name="lines-small" />}
                     </IonButton>
                </div>
                <div className='app-login-or-main-cont'>or</div>
                <div>
                <IonButton className='app-content-login-sub-butt' disabled={disabled}>
                <IonImg src={Googlepng}  className='app-content-login-sub-ico-left'/>
                     Continue with Google
                     </IonButton>
                </div>
           </div>
     )
}

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
                                   <LoginFormCont loading={false} disabled={false} />
                              </div>

                              <div className='app-bottom-deco-main-cont' slot='fixed'>
                              <div >Forgot Password</div> 
                              {/* <div className='app-bottom-deco-1'/>
                              <div className='app-bottom-deco-2'/> */}
                              </div>

                    </IonContent>
               </IonPage>
          )
     }
}
