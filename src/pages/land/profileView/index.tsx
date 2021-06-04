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
      IonSpinner,
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


const FollowButton:React.FC<{followBool:boolean,isloading:boolean,setLoading:any,setFollow:any,suid:any}> = (props:any)=>{
     const rtr = useIonRouter();
     return(
               props.isloading===false?props.followBool===false?
               <IonButton  className='app-profile-view-pic-cont-butt' onClick={()=>{
                        props.setLoading(true);
                        backendHelper!._addFollow(user.getUserUid()!,props.suid!).then((res:any)=>{
                             console.log(res);
                             if(res){
                                  if(res.errBool===false){
                                        props.setFollow(true);
                                  }
                             }
                         props.setLoading(false);
                        })
              }} >Follow</IonButton>:
              <IonButton  className='app-profile-view-pic-cont-butt-unfol' onClick={()=>{               
               props.setLoading(true);
               backendHelper!._delFollow(user.getUserUid()!,props.suid!).then((res:any)=>{
                    console.log(res);
                    if(res){
                         if(res.errBool===false){
                               props.setFollow(false);
                         }
                    }
                props.setLoading(false);
               })
               }} >Unollow</IonButton>:<IonButton  className='app-profile-view-pic-cont-butt'>  <IonSpinner name="dots" /></IonButton>

     );
}

interface profileViewInter  {
     setModal:any
     suid:string|null
}

export default class ProfileView<profileViewInter> extends React.Component<any,{
     userDataLoaded:boolean
     followDataLoadded:boolean
     followBool:boolean
     followLoading:boolean
     followCountLoaded:boolean
     followers:number
     following:number
}>{
     
     constructor(props:profileViewInter){
          super(props);
          this.state={
               userDataLoaded:true,
               followDataLoadded:false,
               followBool:false,
               followLoading:false,
               followCountLoaded:false,
               followers:0,
               following:0,

          }
          this.setUserDataLoad = this.setUserDataLoad.bind(this);
          this.profileClassInit = this.profileClassInit.bind(this);
          this.setFollowDataLoad = this.setFollowDataLoad.bind(this);
          this.setFollowBool = this.setFollowBool.bind(this);
          this.setFollowLoading = this.setFollowLoading.bind(this);
          this.setFollowCountBool  =this.setFollowCountBool.bind(this);
          this.setFollowCount = this.setFollowCount.bind(this);
     }

     setFollowCount(followers:number,following:number){
          this.setState({
               followers:followers,
               following:following}
               )
     }
     setFollowCountBool(val:boolean){
          this.setState({followCountLoaded:val})
     }

     setFollowBool(val:boolean){
          this.setState({followBool:val});
     }

     setFollowLoading(val:boolean){
          this.setState({followLoading:val})
     }

     setFollowDataLoad(val:boolean){
          this.setState({followDataLoadded:val});
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
                    if(res.errBool!==true){
                         backendHelper?._getFollowCount(user.getUserUid()!,this.props.suid!).then((cres:any)=>{
                              if(cres.errBool==false){
                                   this.setFollowCount(cres.data.follCount.followers,cres.data.follCount.following)
                                   this.setFollowCountBool(true);
                              }
                              else{
                                   console.log(cres.errMess);
                              }
                         });
                         backendHelper?._getFollowedBool(user.getUserUid()!,this.props.suid!).then((fres:any)=>{
                              if(fres.errBool===false){
                                   this.setFollowBool(fres.data.follow_bool);
                                   this.setFollowDataLoad(true);
                              }else{
                                   console.log(fres.errMess);
                              }
                    })
                         gotUser = res.data;
                         this.setUserDataLoad(false);
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
                         <span>@{gotUser?.uname}</span>     
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
                                           {this.state.followDataLoadded===true?
                                           <FollowButton 
                                           followBool={this.state.followBool} 
                                           isloading={this.state.followLoading} 
                                           setLoading={this.setFollowLoading}
                                           setFollow={this.setFollowBool} 
                                           suid={this.props.suid!}/>:
                                           <IonSkeletonText animated style={{width:'120px',height:'22px','--border-radius':'4px'}}/>}
                                        </div>
                                        </div>
                                   } 
                                        
                                        <div className='app-profile-pic-name'>{this.state.userDataLoaded?<IonSkeletonText animated style={{width:'100%',height:'14px','--border-radius':'4px'}}/>:
                                        <span>{gotUser?.dname}</span>}</div>
                                   </div>
                         </div>
                          <div className='app-profile-bio-main-cont'>
                                             <div className='app-profile-bio-cont'>
                                             {this.state.userDataLoaded?<IonSkeletonText animated style={{width:'100%',height:'100%','--border-radius':'4px'}}/>:
                                             <div>
                                                   {gotUser?.bio}
                                             </div>
                                             }
                                                   
                                             </div>
                         </div>
                         <div className='app-profile-count-main-cont'>
                                   <div className='app-profile-tab-main-cont'>
                                             <div className='app-profile-tab-tit'>Followers</div>
                                             <div className='app-profile-tab-count'>
                                             {this.state.userDataLoaded?<IonSkeletonText className='app-skelt-main-cont' animated style={{width:'80px',height:'22px','--border-radius':'4px'}}/>:
                                             <span>{this.state.followers}</span>
                                             }</div>
                                   </div>
                                   <div className='app-profile-tab-main-cont'>
                                             <div className='app-profile-tab-tit'>Following</div>
                                             <div className='app-profile-tab-count'>{this.state.userDataLoaded?<IonSkeletonText animated style={{width:'80px',height:'22px','--border-radius':'4px'}}/>:
                                             <span>{this.state.following}</span>
                                             }</div>
                                   </div>
                         </div>
                                   
                         

                    </div>
               </IonContent>
               </IonPage>
          )
     }
}