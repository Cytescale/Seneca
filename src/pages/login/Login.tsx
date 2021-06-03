import { IonContent,IonButton, IonHeader, IonPage, IonSpinner,IonItem,IonLabel,IonImg,IonInput,IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import {LoginProps} from '../../types/login/login.type';
import Googlepng from '../../assets/logo/google.png';


import '../../theme/styles/login.style.css';




import React,{useState} from 'react';
import firebaseHelper,{serverReponse, setUid} from '../../api/firebaseHelper';
import { CancelIco } from '../../assets';
import history from '../history';
import { withRouter } from 'react-router';
import User from '../../components/user';



const user = new User();

const FirebaseHelper = new firebaseHelper();

interface LoginFormProps {
     loading?:boolean
     disabled?:boolean
}

const ErrorNoti:React.FC<{
     shown:boolean , 
     text:string,
     hide(val:boolean):void
     }>=
     (props:{shown:boolean,text:string,hide(val:boolean):void})=>{
     let [shown,setShow] = useState<boolean>(props.shown);
     if(shown===true){
          return(
               <div className='app-err-noti-main-cont'>
                    {props.text}
                    <IonImg src={CancelIco} className='app-err-noti-main-cont-ico' onClick={()=>{
                         props.hide(false)
                    }}></IonImg>
               </div>
          )
     }else{return(<div />)}
}

function validateEmail(email:string):boolean{
     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(String(email).toLowerCase());
 }

const  loginCallback = (res:serverReponse,callback:any)=>{
     if(res){
     if(res.error){
          switch(res.error.errMess){
               case 'auth/user-not-found':{
                    callback(true,"User not found");  
                    break;
               }
               case 'auth/too-many-requests':{
                    callback(true,"Too many requests , please wait");  
                    break;
               }
               case 'auth/wrong-password':{
                    callback(true,"Wrong password");  
                    break;
               }
               default:{
                    callback(true,"Error Occured");
                    break;
               }             
          }
     }
     else{
          user.setUserUid(res.resMess.uid);
          setUid(res.resMess.uid);
         history.replace('/land/explore');
         console.log("login | "+res.resMess);
     }}
     else{
          callback(true,"Fatal occured");  
     }

}

async function formsubmit(unm:string,pass:string,callback:any,setload:any,setdisab:any,router:any){

     setload(true);
     setdisab(true);
     if(unm&&pass){
          if(validateEmail(unm)===true){
          FirebaseHelper.initEmailAuth(unm,pass,loginCallback).then(res=>loginCallback(res!,callback));
          }else{
               callback(true,"Invalid email");
          }    
     }
     else{
          callback(true,"Enter all details please");
     }
     setload(false);
     setdisab(false);
     return false;
}    

const LoginFormCont:React.FC<LoginFormProps> = (props:LoginFormProps)=>{
     const router = useIonRouter();
     const [unm, setunm] = useState<string>("nikhilwilayate1998@gmail.com");
     const [pas, setpas] = useState<string>("password");
     const [loading, setload] = useState<boolean>(props.loading?props.loading:false);
     const [disabled, setdisa] = useState<boolean>(props.disabled?props.disabled:false);
     const [errBool, seterrBool] = useState<boolean>(false);
     const [errStr, seterrStr] = useState<string>("");

     return(     
          <div className='app-content-login-form-inner-main-cont'>
          <div className='app-content-login-form-fld-main-cont'>
           <div  className='app-content-login-form-fld-cont' >
           <div className='app-content-login-form-fld-cont-tit' > Login </div> 
           <IonInput type={'email'} value={unm} disabled={disabled} placeholder="Email address" onIonChange={e=>setunm(e.detail.value!)} className='app-content-login-form-fld'></IonInput>
           </div>
           <div  className='app-content-login-form-fld-cont' >
           <IonInput value={pas} disabled={disabled} placeholder="Password" onIonChange={e=>setpas(e.detail.value!)} type="password" id='login-pass-fld' className='app-content-login-form-fld'></IonInput>
           </div>
           </div>
           {errBool===true?<ErrorNoti shown={errBool} text={errStr} hide={(val:boolean)=>seterrBool(val)} />:<div/>}
                <div>
                <IonButton type='submit' className='app-content-login-sub-butt'  disabled={disabled} onClick={
                         ()=>{
                              formsubmit(unm!,pas!,(bool:boolean,str:string)=>{
                              seterrBool(bool);
                              seterrStr(str);
                              },setload,setdisa,router)
                    }}>
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


const LoginAct:React.FC<{ setAuth:any}> = (props)=>{
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

export default LoginAct;
