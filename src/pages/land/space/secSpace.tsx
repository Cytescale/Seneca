import React,{useState,useEffect} from 'react';
import {IonSearchbar,IonContent, IonFooter,IonToast,IonLoading,IonModal,IonHeader,withIonLifeCycle,IonPage,IonToolbar,IonTitle,IonButtons,IonIcon,IonButton,IonBackButton,IonRouterOutlet,IonTabBar,IonTabButton,IonImg,IonTabs } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import '../../../theme/styles/land.style.css';
import '../../../theme/styles/space.style.css';
import { SpaceProps } from '../../../types/land/land.type';
import firebaseHelper, { getUid } from '../../../api/firebaseHelper';
import {
     Call_end,
     Person_add,
     Share,
     Mic_UnSelec,
     Fronthand,
     Send,
     Mic_Mute_UnSelec,
     profPlaceholder,
     downArrow,
     Group,
     headphones,
} from '../../../assets/';
import AgoraPlayer from '../../../components/mediaPlayer';
import ban1 from '../../../assets/placeholders/ban1.jpg'
import ban2 from '../../../assets/placeholders/ban2.jpg'
import pep2 from '../../../assets/placeholders/pep2.jpg'
import pep1 from '../../../assets/placeholders/pep1.jpg'
import pep3 from '../../../assets/placeholders/pep3.jpg'
import pep4 from '../../../assets/placeholders/pep4.jpg'
import history from '../../history';
import User, { userData } from '../../../components/user';
import userTempDb from '../../../components/userTempDb';
import BackendHelper from '../../../api/backendHelper';
import agoraHelper from '../../../api/agoraHelper';


let backendHelper:BackendHelper|null = new BackendHelper(null);

let user  =  new User();
let FirebaseHelper:firebaseHelper|null = new firebaseHelper();
let AgoraHelper:agoraHelper =  new agoraHelper(user.getUserUid());
let UserTmpDb = new userTempDb();



const ChatInpCont:React.FC<{}> = (props:any) => {
     return(
          <div className='app-chat-inp-main-cont' >
                    <div className='app-chat-inp-butt-cont'>
                    {props.mic===true?
                           <button className='app-chat-inp-butt' onClick={()=>{
                           }}>
                                 <IonImg src={Mic_UnSelec} className='app-chat-inp-butt-ico'></IonImg>
                           </button>:
                    <button className='app-chat-inp-butt' onClick={()=>{
                      
                    }}>
                    <IonImg src={Mic_Mute_UnSelec} className='app-chat-inp-butt-ico'></IonImg>
                    </button>
                    }
                    
                    </div>
                    <div className='app-chat-inp-butt-cont'>
                    <button className='app-chat-inp-butt'>
                         <IonImg src={Person_add} className='app-chat-inp-butt-ico'></IonImg>
                    </button>
                    </div>
                    <div className='app-chat-inp-butt-cont send-butt-cont'>
                    <button className='app-chat-inp-but-end' onClick={()=>{
                    }}>
                         Leave <IonImg src={Call_end} className='app-chat-inp-butt-ico space-end-ico'></IonImg>
                    </button>
                    </div>
                 
          </div>
     )
}

class Space extends React.Component<any,any>{
     constructor(props:any){
          super(props);

     }
     render(){
          return(
               <IonPage >
                    <IonContent>
                    <div className='space-content'>
                              <IonToolbar className='app-space-toolbar-main-cont'>
                                   <IonButtons slot="start">
                                   <button className='space-head-butt'onClick={()=>{
                                        this.props.setModal(false);
                                   }}>
                                             <IonImg src={downArrow} className='app-chat-inp-butt-ico space-head-butt-ico'></IonImg>
                                          </button>
                                   </IonButtons>
                                   <IonButtons slot="end">
                                   <div className='app-chat-inp-butt-cont'>
                                          <button className='space-head-butt'>
                                   <IonImg src={Group} className='app-chat-inp-butt-ico space-head-butt-ico'></IonImg>
                              </button>
                              </div> 
                              </IonButtons>
                               {/* <IonTitle className='app-space-tit-cont'>Placeholder channel</IonTitle> */}
                              </IonToolbar>
                              <div className='app-space-content'>
                                   <div className='app-space-tit-main-cont'>
                                        <IonImg src={profPlaceholder} className='app-space-tit-main-cont-ico'/>
                                        Placeholder space title
                                   </div>
                                   <div className='app-space-des-main-cont'>
                                        Placeholder Description with the intention..
                                   </div>
                                   <div className='app-space-tit-data-outer-main-cont'>
                                        <div className='app-space-tit-data-main-cont'>
                                        <IonImg src={Mic_UnSelec} className='app-space-tit-data-main-cont-ico'></IonImg>
                                        100
                                        </div>
                                        <div className='app-space-tit-data-main-cont'>
                                        <IonImg src={headphones} className='app-space-tit-data-main-cont-ico'></IonImg>
                                        100
                                        </div>
                                        
                                   </div>
                                   <div className='app-space-hr-main-cont'>
                                        Speakers
                                   </div>
                                   <div className='app-chat-attnd-main-cont'>
                                             <div  className='app-chat-attnd-card'>
                                                  <div className='app-chat-attnd-card-outer-cont'>
                                                       <div  className='app-chat-attnd-card-ico-outer-cont'>
                                                            <div className='app-chat-attnd-card-ico-cont'>
                                                            <IonImg src={profPlaceholder} className='app-chat-attnd-card-ico'/>
                                                            </div>
                                                       </div>
                                                       <div  className='app-chat-attnd-card-name'>Name</div>
                                                  </div>
                                             </div>  
                                             <div  className='app-chat-attnd-card'>
                                                  <div className='app-chat-attnd-card-outer-cont'>
                                                       <div  className='app-chat-attnd-card-ico-outer-cont'>
                                                            <div className='app-chat-attnd-card-ico-cont'>
                                                            <IonImg src={profPlaceholder} className='app-chat-attnd-card-ico'/>
                                                            </div>
                                                       </div>
                                                       <div  className='app-chat-attnd-card-name'>Name</div>
                                                  </div>
                                             </div>  
                                             <div  className='app-chat-attnd-card'>
                                                  <div className='app-chat-attnd-card-outer-cont'>
                                                       <div  className='app-chat-attnd-card-ico-outer-cont'>
                                                            <div className='app-chat-attnd-card-ico-cont'>
                                                            <IonImg src={profPlaceholder} className='app-chat-attnd-card-ico'/>
                                                            </div>
                                                       </div>
                                                       <div  className='app-chat-attnd-card-name'>Name</div>
                                                  </div>
                                             </div>  
                                             <div  className='app-chat-attnd-card'>
                                                  <div className='app-chat-attnd-card-outer-cont'>
                                                       <div  className='app-chat-attnd-card-ico-outer-cont'>
                                                            <div className='app-chat-attnd-card-ico-cont'>
                                                            <IonImg src={profPlaceholder} className='app-chat-attnd-card-ico'/>
                                                            </div>
                                                       </div>
                                                       <div  className='app-chat-attnd-card-name'>Name</div>
                                                  </div>
                                             </div>  
                                   </div>
                                   <div className='app-space-hr-main-cont'>
                                        Joined 
                                   </div>
                                   <div className='app-chat-attnd-main-cont'>
                                             <div  className='app-chat-attnd-card'>
                                                  <div className='app-chat-attnd-card-outer-cont'>
                                                       <div  className='app-chat-attnd-card-ico-outer-cont'>
                                                            <div className='app-chat-attnd-card-ico-cont'>
                                                            <IonImg src={profPlaceholder} className='app-chat-attnd-card-ico'/>
                                                            </div>
                                                       </div>
                                                       <div  className='app-chat-attnd-card-name'>Name</div>
                                                  </div>
                                             </div>  
                                             <div  className='app-chat-attnd-card'>
                                                  <div className='app-chat-attnd-card-outer-cont'>
                                                       <div  className='app-chat-attnd-card-ico-outer-cont'>
                                                            <div className='app-chat-attnd-card-ico-cont'>
                                                            <IonImg src={profPlaceholder} className='app-chat-attnd-card-ico'/>
                                                            </div>
                                                       </div>
                                                       <div  className='app-chat-attnd-card-name'>Name</div>
                                                  </div>
                                             </div>  
                                             <div  className='app-chat-attnd-card'>
                                                  <div className='app-chat-attnd-card-outer-cont'>
                                                       <div  className='app-chat-attnd-card-ico-outer-cont'>
                                                            <div className='app-chat-attnd-card-ico-cont'>
                                                            <IonImg src={profPlaceholder} className='app-chat-attnd-card-ico'/>
                                                            </div>
                                                       </div>
                                                       <div  className='app-chat-attnd-card-name'>Name</div>
                                                  </div>
                                             </div>  
                                             <div  className='app-chat-attnd-card'>
                                                  <div className='app-chat-attnd-card-outer-cont'>
                                                       <div  className='app-chat-attnd-card-ico-outer-cont'>
                                                            <div className='app-chat-attnd-card-ico-cont'>
                                                            <IonImg src={profPlaceholder} className='app-chat-attnd-card-ico'/>
                                                            </div>
                                                       </div>
                                                       <div  className='app-chat-attnd-card-name'>Name</div>
                                                  </div>
                                             </div>  
                                             <div  className='app-chat-attnd-card'>
                                                  <div className='app-chat-attnd-card-outer-cont'>
                                                       <div  className='app-chat-attnd-card-ico-outer-cont'>
                                                            <div className='app-chat-attnd-card-ico-cont'>
                                                            <IonImg src={profPlaceholder} className='app-chat-attnd-card-ico'/>
                                                            </div>
                                                       </div>
                                                       <div  className='app-chat-attnd-card-name'>Name</div>
                                                  </div>
                                             </div>  
                                             <div  className='app-chat-attnd-card'>
                                                  <div className='app-chat-attnd-card-outer-cont'>
                                                       <div  className='app-chat-attnd-card-ico-outer-cont'>
                                                            <div className='app-chat-attnd-card-ico-cont'>
                                                            <IonImg src={profPlaceholder} className='app-chat-attnd-card-ico'/>
                                                            </div>
                                                       </div>
                                                       <div  className='app-chat-attnd-card-name'>Name</div>
                                                  </div>
                                             </div>  
                                             <div  className='app-chat-attnd-card'>
                                                  <div className='app-chat-attnd-card-outer-cont'>
                                                       <div  className='app-chat-attnd-card-ico-outer-cont'>
                                                            <div className='app-chat-attnd-card-ico-cont'>
                                                            <IonImg src={profPlaceholder} className='app-chat-attnd-card-ico'/>
                                                            </div>
                                                       </div>
                                                       <div  className='app-chat-attnd-card-name'>Name</div>
                                                  </div>
                                             </div>  
                                             <div  className='app-chat-attnd-card'>
                                                  <div className='app-chat-attnd-card-outer-cont'>
                                                       <div  className='app-chat-attnd-card-ico-outer-cont'>
                                                            <div className='app-chat-attnd-card-ico-cont'>
                                                            <IonImg src={profPlaceholder} className='app-chat-attnd-card-ico'/>
                                                            </div>
                                                       </div>
                                                       <div  className='app-chat-attnd-card-name'>Name</div>
                                                  </div>
                                             </div>  
                                   </div>
                              </div> 
                              <ChatInpCont/>
                    </div>
                    
                    </IonContent>
               </IonPage>
          )
     }

}


export default withIonLifeCycle(Space)