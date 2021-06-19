import {IonRippleEffect,IonMenu,withIonLifeCycle ,IonSkeletonText,  IonToast,  IonContent,IonRefresher, IonRefresherContent,IonPage,IonImg,useIonRouter } from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { Link, Redirect, Route } from 'react-router-dom';
import React,{CSSProperties, useState,useEffect} from 'react';
import {Menu,profPlaceholder,headphones,WelcomeBanner, Add} from '../../../assets';
import '../../../theme/styles/land.style.css';
import nexusResponse from '../../../api/nexusResponse';
import {ExploreProps} from '../../../types/land/land.type';
import BackendHelper from '../../../api/backendHelper';
import firebaseHelper, { getUid } from '../../../api/firebaseHelper';
import User, { userData } from '../../../components/user';
import history from '../../history';
import agoraHelper from '../../../api/agoraHelper';
import userTmpDb from '../../../components/userTempDb';
import spaceDataInter from '../../../components/spaceInter';
import {DoubleHeader,WecomeHead} from '../../../components/uiComp';
import landInter from '../../../components/landInter';

var UserTmpDb = new userTmpDb(); 
var backendHelper:BackendHelper|null = null;
var feedBackEndHelper:BackendHelper|null = new BackendHelper("string");
var FirebaseHelper:firebaseHelper|null = new firebaseHelper();
const user = new User();
var AgoraHelper:agoraHelper =  new agoraHelper(user.getUserUid());
// AgoraHelper.getJoiningId();


const  RenderAttnds:React.FC<any> = (props)=>{
     let [pd,setPd] = useState<any>(<IonSkeletonText animated className='app-render-space-pic-skelt attnd-pic-cont' style={{
          width: '26px',
          height:'26px',
          }} />);
     useEffect(() => {
               backendHelper?._getUserJoiningId(props.jid!).then((res:nexusResponse)=>{
                    if(!res.errBool){
                    setPd(<div className='app-atnd-ico-cont'>
                         <IonImg src={profPlaceholder} className='atnd-pro-pic' />
                         </div>);     
               }
               else{console.log(res.errMess);}
         }).catch(e=>{
               console.log(e);
         })
     }, [props.jid])
     return(pd)         
}    
const  RenderName:React.FC<any> = (props)=>{
     //let [dataLoaded,setDataLoaded] = useState<Boolean>(false);
     let [pd,setPd] = useState<any>(<div className='app-feat-space-top-name-main-cont-name'>
                                        <IonSkeletonText animated className='app-render-space-pic-skelt' style={{
                                        width: '18px',
                                        height:'18px',
                                        }} />
                                        <IonSkeletonText animated  className='app-render-space-name-skelt' />
                                   </div>);
     useEffect(() => {
         backendHelper?._getUserInfo(props.uid!).then((res:nexusResponse)=>{
               if(!res.errBool){
                    setPd(
                         <div className='app-feat-space-top-name-main-cont-name'>
                         <IonImg src={profPlaceholder} className='app-feat-space-left-pro-ico' />
                        {res.responseData.dname}
                    </div> 
                    );     
               }
               else{console.log(res.errMess);}
         }).catch(e=>{
               console.log(e);
         })
     }, [props.uid!]);
     return(pd)                      
}    

export interface SpaceComp extends landInter{
     data:spaceDataInter
}


export let SpaceComp:React.FC<SpaceComp> =(props:SpaceComp)=>{
     let router = useIonRouter();
     return(
          <div className='app-feat-space-main-cont' onClick={()=>{
               props.setSpaceModal(true);
               if(props.sid!=props.data._id){
                    props.setSpaceData(props.data);
                    props.setSid(props.data._id);}
               }}>
              
               <div className='app-feat-space-top-name-main-cont'>
                              <div className='app-feat-space-top-name-main-inner-cont'>
                                   <RenderName uid={props.data.creator_uid}/>
                                   <div className='app-feat-space-bottom-pro-count-cont'> <IonImg src={headphones} className='app-feat-space-head-pro-ico' />{props.data.listners}</div>
                              </div>
                              <div className='app-feat-space-atnd-main-cont'>
                                 {
                                      props.data.broadcaster?.map((e:any,ind:number)=>{
                                             console.log(e);
                                             return(
                                             <RenderAttnds key={ind} jid={e} />
                                             )
                                      })
                                 }
                              </div>

               </div>
               <div className='app-feat-space-bottom-main-cont'>
                    <div className='app-feat-space-bottom-name-main-cont'>
                         <div>
                              <div className='app-feat-space-bottom-name'>{props.data.name}</div>
                              <div className='app-feat-space-bottom-des'>{props.data.des}</div>
                         </div>
                    </div>                    
                    </div>
          </div>
     )
}


const Feed:React.FC<any> = (props)=>{
     let [feedData,setFeedData] = useState<Array<spaceDataInter>|null>(null);
     useEffect(() => {
          backendHelper?._getSpaceFeedDatabyUid(props.uid!).then((res:nexusResponse)=>{
               if(!res.errBool){
                    setFeedData(res.responseData);
                    props.setSuccToast(true,'Feed Data Loaded');
               }else{
                    props.setErrToast(true,res.errMess);
               }
          }).catch((e)=>{
               console.log(e);
               props.setErrToast(true,e);
          })
     }, [props.uid!]);
     return(
          <div>
               {feedData?.map((e:spaceDataInter,ind)=>{
                    return(<SpaceComp key={ind} {...props} data={e}/>)
               })}
          </div>    
     );
}


const SideChannelList:React.FC = (props:any)=>{
     return(
          <IonMenu  
               side="start" 
               swipeGesture={true}  
               menuId="menuId"
               className='appLeftMenuCont'
               contentId="explore-content"
               type='push'
               
               maxEdgeStart={40}>
               <IonContent className='appContentMainCont'>
                    <div className='appSideChannelListCont'>
                              <div>
                                 
                                  
                                   <div className='appSideChannelOuterCont '>
                                   <div className='appSideChannelCont'>CN1</div>
                                   </div>
                                   <div className='appSideChannelHrCont'/>
                                   <div className='appSideChannelOuterCont '>
                                        <button className='appSideChannelAddCont' onClick={()=>{
                                             history.push('/spacecreate');
                                        }}><IonImg src={Add} className=' '/></button>
                                   </div>
                              </div>
                    </div>
               </IonContent>
     </IonMenu>  );
}


class Explore extends React.Component<any,{
     userDataLoaded:boolean
     errToastBool:boolean,
     errToastMess:string|null,
     succToastBool:boolean,
     succToastMess:string|null,
}>{
     constructor(props:ExploreProps){
          super(props);
          this.state={
               succToastBool:false,
               succToastMess:null,
               errToastBool:false,
               errToastMess:null,
               userDataLoaded:false,               
          }
          this.setUserDataLoaded = this.setUserDataLoaded.bind(this);
          this.exploreClassInit = this.exploreClassInit.bind(this);
          this.setErrToast = this.setErrToast.bind(this);
          this.setSuccToast = this.setSuccToast.bind(this);
          this.doRefresh  = this.doRefresh.bind(this);
     }
     setSuccToast(b:boolean,m:string|null){
          this.setState({succToastBool:b,succToastMess:m});
     }
     setErrToast(b:boolean,m:string|null){
          this.setState({errToastBool:b,errToastMess:m});
     }
     setUserDataLoaded(b:boolean){
          this.setState({userDataLoaded:b});
     }
     doRefresh(event: CustomEvent<RefresherEventDetail>) {
          console.log('Begin async operation');
          this.exploreClassInit(true);
          this.setUserDataLoaded(false);
          setTimeout(() => {
            this.exploreClassInit(true);
            event.detail.complete();
          }, 2000);
     }

     exploreClassInit(reloadBool?:boolean){
          if(reloadBool!){
               console.log("Exploree: reload uid"+user.getUserUid());          
          }
          if(user.getUserUid())backendHelper = new BackendHelper(user.getUserUid()!);
          if(backendHelper){
               backendHelper._getUserInfo(user.getUserUid()).then((res:nexusResponse)=>{
                    if(res){
                         if(!res.errBool){
                               this.setUserDataLoaded(true);
                               this.setSuccToast(true,'User Data loaded');
                               user.setUserData(res.responseData);
                               AgoraHelper.setJoiningId(res.responseData.joining_id);
                              // user.setUserData(res.responseData);
                              //      //AgoraHelper.setJoiningId(user.getUserData()!.joining_id);
                              //      if(user.getUserData()?.init_bool===false){
                              //      history.replace('/editprofile');
                              // }
                         }
                         else{this.setErrToast(true,res.errMess);}
               }
               }).catch(e=>{
                    this.setErrToast(true,e);
               });
          }
     }
     
     componentDidMount() {
          console.log("Explore: explore init uid"+user.getUserUid());
          this.exploreClassInit(false);
     }

     render(){
          return(
                   <IonPage >
                    <IonContent fullscreen className='app-content-main-cont ' id='explore-content' >
                         <IonRefresher slot="fixed" onIonRefresh={this.doRefresh}><IonRefresherContent></IonRefresherContent></IonRefresher>
                              <div className='app-render-content'>
                                   <div className='app-start-spacer'/>
                                   <WecomeHead shown/>
                                   <div className='app-intro-main-cont'>
                                        <div className='app-intro-main-cont-ico-cont'>
                                        <IonImg src={WelcomeBanner} className='app-intro-main-cont-ico'/>
                                        </div>
                                        <div className='app-intro-main-cont-tit'>Start Talking </div>
                                   </div>
                                   <DoubleHeader priString="Recommendation" secString="Spaces you may be interested in" secStringVisi={true}/>
                                   <div className='app-render-region-cont'>
                                        {this.state.userDataLoaded?
                                             <Feed {...this.props} 
                                             uid={user.getUserUid()} 
                                             setErrToast={this.setErrToast} 
                                             setSuccToast={this.setSuccToast}
                                             />:<IonSkeletonText animated className='app-render-skelt-main-cont' />}
                                   </div>
                                      <IonToast
                                        isOpen={this.state.errToastBool}
                                        color='danger'
                                        onDidDismiss={() => this.setErrToast(false,null)}
                                        message={this.state.errToastMess!}
                                        duration={1000}
                                        />
                                         <IonToast
                                        isOpen={this.state.succToastBool}
                                        color='success'
                                        onDidDismiss={() => this.setSuccToast(false,null)}
                                        message={this.state.succToastMess!}
                                        duration={1000}
                                        />
                              </div>                       
                              </IonContent>        
                              <SideChannelList {...this.props}/>
                    </IonPage>
         );
     }
}



export default withIonLifeCycle(Explore);
