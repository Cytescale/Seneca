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
      IonLoading,
      IonImg, 
      IonSkeletonText,
      IonTextarea ,
      useIonLoading,
      IonToast,
      useIonRouter} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import '../../theme/styles/editprofile.style.css';
import { editProfileProps } from '../../types/land/land.type';
import {More_verti,profPlaceholder,CancelIco} from '../../assets/';
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

interface LoadingProps {}



const ErrorNoti:React.FC<{
     shown:boolean , 
     text:string,
     hide(val:boolean,str:string):void
     }>=
     (props:{shown:boolean,text:string,hide(val:boolean,str:string):void})=>{
     let [shown,setShow] = useState<boolean>(props.shown);
     if(shown===true){
          return(
               <div className='app-err-noti-main-cont'>
                    {props.text}
                    <IonImg src={CancelIco} className='app-err-noti-main-cont-ico' onClick={()=>{
                         props.hide(false,"null")
                    }}></IonImg>
               </div>
          )
     }else{return(<div />)}
}


const LoadingExample: React.FC<LoadingProps> = () => {
     const [present] = useIonLoading();
     return (
       <IonPage>
         <IonContent>
           <IonButton
             expand="block"
             onClick={() =>
               present({
                 duration: 3000,
               })
             }
           >
             Show Loading
           </IonButton>
           <IonButton
             expand="block"
             onClick={() => present('Loading', 2000, 'dots')}
           >
             Show Loading using params
           </IonButton>
         </IonContent>
       </IonPage>
     );
   };

export default class EditProfile<editProfileProps> extends React.Component<{},{
     userDataLoaded:boolean
     loading:boolean
     errBool:boolean
     errStr:string
     toastBool:boolean
     toastStr:string
}>{
     constructor(props:editProfileProps){
          super(props);
          this.state={
               userDataLoaded:true,
               loading:false,
               errBool:false,
               errStr:"Null",
               toastBool:false,
               toastStr:"null"
          }
          this.setUserDataLoad = this.setUserDataLoad.bind(this);
          this.profileClassInit = this.profileClassInit.bind(this);
          this.setLoading = this.setLoading.bind(this);
          this.profileSaveProcess = this.profileSaveProcess.bind(this);
          this.setErr = this.setErr.bind(this);
          this.setToast = this.setToast.bind(this);
     }

     setToast(bool:boolean,str:string){
          this.setState({
               toastBool:bool,
               toastStr:str
          })
     }

     setErr(bool:boolean,str:string){
          this.setState({
               errBool:bool,
               errStr:str
          })
     }

     setLoading(val:boolean){
          this.setState({loading:val});
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

     async profileSaveProcess(){
          this.setLoading(true);
          await backendHelper?._updateUserInfo(editUser!).then((res:any)=>{
              console.log(res);
               if(res){
                   if(res.errBool === false){
                    this.setToast(true,"Profile updated");
                    this.setErr(false,"null");
                   }
                   else{
                    switch(res.errCode){
                         case 1:{
                              this.setErr(true,"Data extraction failed");
                              break;
                         }
                         case 2:{
                              this.setErr(true,"Update failed");
                              break;
                         }
                         case 3:{
                              this.setErr(true,"Missing uid");
                              break;
                         }
                         case 4:{
                              this.setErr(true,"Username exist");
                              break;
                         }
                         default:{
                              this.setErr(true,"Fatal error");
                              break;
                         }
                    }    
                   }
               
              }
              else{
               this.setErr(true,"Fatal error");
              }
          });
          this.setLoading(false);
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
                    {this.state.userDataLoaded===false?editUser?.init_bool===true?<IonBackButton defaultHref="/land" />:null:null}
               </IonButtons>
               <div className='app-toolbar-tit-main-cont'>
               <IonTitle className='app-toolbar-tit'> Edit Profile </IonTitle>
               </div>
               <IonButtons slot="end">
                    <IonButton  className='app-edit-prof-save-butt' onClick={this.profileSaveProcess} > Save</IonButton>
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
                         <IonInput className='app-edit-profile-data-inp' value={editUser?.dname}  onIonChange={e =>{editUser!.dname = e.detail.value!}} ></IonInput>
                         </IonItem>
                         
                         <IonItem  className='app-edit-profile-data-item-cont'>
                         <IonLabel className='app-edit-profile-data-lab-cont'><div className='app-edit-profile-data-lab'>Username</div></IonLabel>
                         <IonInput className='app-edit-profile-data-inp' value={editUser?.uname} onIonChange={e =>{editUser!.uname = e.detail.value!}}  ></IonInput>
                         </IonItem>
                         <IonItem  className='app-edit-profile-data-item-cont'>
                         <IonLabel className='app-edit-profile-data-lab-cont'><div className='app-edit-profile-data-lab'>Bio</div></IonLabel>
                         <IonTextarea className='app-edit-profile-data-inp edit-txt-ara' value={editUser?.bio} onIonChange={e =>{editUser!.bio = e.detail.value!}} ></IonTextarea>
                         </IonItem>
                              <div className='app-edit-profile-err-cont'>
                              {this.state.errBool?<ErrorNoti  shown={true} text={this.state.errStr} hide={(val:boolean,str:string)=>this.setErr(val,str)}/>:<span/>}
                              </div>
                         </div>}
                    </div>
                    <IonLoading
                         cssClass='my-custom-class'
                         isOpen={this.state.loading}
                         onDidDismiss={()=>this.setLoading(false)}
                         message={'Please wait...'}
                         />
                          <IonToast
                    isOpen={this.state.toastBool}
                    onDidDismiss={() => this.setToast(false,"null")}
                    message={this.state.toastStr}
                    duration={600}
                    />
               </IonContent>
               </IonPage>
          )
     }
}