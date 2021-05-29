import React from 'react';
import {IonSearchbar,IonContent, IonModal,IonHeader,IonPage,IonToolbar,IonTitle,IonButtons,IonIcon,IonButton,IonBackButton,IonRouterOutlet,IonTabBar,IonTabButton,IonImg,IonTabs } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import '../../../theme/styles/land.style.css';
import { SpaceProps } from '../../../types/land/land.type';
import {
     Call_end,
     Person_add,
     Share,
     Mic_UnSelec,
     Fronthand,
     Send
} from '../../../assets/';
import ban1 from '../../../assets/placeholders/ban1.jpg'
import pep2 from '../../../assets/placeholders/pep2.jpg'
import pep1 from '../../../assets/placeholders/pep1.jpg'
import pep3 from '../../../assets/placeholders/pep3.jpg'
import pep4 from '../../../assets/placeholders/pep4.jpg'

const SpeakersCont:React.FC<{name:string,proPic:string,isLive?:boolean}> = (props)=>{
     return(
          <div className='app-space-banner-pic-cont'>
               <div className='app-space-banner-pic'>
                    <IonImg src={props.proPic} className='app-space-banner-pic-img' style={{
                         border:props.isLive?props.isLive===true?'2px solid #82FF70':null:null
                    }}/>
               </div>
               <div className='app-space-banner-name'>
                         {props.name}
               </div>
          </div>
     )
}

const BannerCont:React.FC<{}>=(props)=>{
     return(
          <div className='app-space-banner-main-cont'>
               <IonImg src={ban1} className='app-space-banner-img'/>
               <div className='app-space-banner-bottom-main-cont'>
                    <SpeakersCont name='alvin' proPic={pep1} isLive={true} />
                    <SpeakersCont name='Sakura' proPic={pep2} isLive={false} />
                    <SpeakersCont name='Izz' proPic={pep3} isLive={false} />
                    <SpeakersCont name='Usale' proPic={pep4} isLive={true} />

               </div>
          </div>
     )
}

const TotalListners:React.FC<{count:number}> = (props) =>{
     return(
          <div className='app-total-listners-main-cont' id='listnr-cont'>
               <div className='app-total-listners-tit'>
                    Current total listners for this space
               </div>
               <div className='app-total-listners-count'>
                   <div className='app-total-listners-count-ecp' />{props.count} Listners
               </div>
          </div>
     )
}


const SelfChatCont:React.FC<{}> = (props) =>{
     return(
          <div className='app-space-chat-self-main-cont'>
                  <div className='app-space-chat-other-chat-main-cont'>
                         <div className='app-space-chat-other-chat-main-data-cont'>
                         <div className='app-space-chat-name-cont self-name'>You</div>
                         <div className='app-space-chat-data-cont self-chat'>placeholder chat</div>                        
                         </div>
                         <div className='app-space-chat-time-cont self-time'>69:00 am</div>
                  </div>
          </div>
     )     
}


const OtherChatCont:React.FC<{}> = (props) =>{
     return(
          <div className='app-space-chat-other-main-cont'>
                  <div className='app-space-chat-other-pic-main-cont'>
                    <IonImg src={pep1} className='app-space-chat-other-pic-img' />
                  </div>  
                  <div className='app-space-chat-other-chat-main-cont'>
                         <div className='app-space-chat-other-chat-main-data-cont'>
                         <div className='app-space-chat-name-cont'>Alvin  <div className='app-space-chat-ecp' /> </div>
                         <div className='app-space-chat-data-cont'>placeholder chat</div>                        
                         </div>
                         <div className='app-space-chat-time-cont'>69:00 am</div>
                  </div>
          </div>
     )     
}

const ChatInpCont:React.FC<{}> = (props) => {
     return(
          <div className='app-chat-inp-main-cont' >
                    <div className='app-chat-inp-butt-cont'>
                    <button className='app-chat-inp-butt'>
                         <IonImg src={Mic_UnSelec} className='app-chat-inp-butt-ico'></IonImg>
                    </button>
                    </div>
                    <input type='text' placeholder='Whats on mind?'  className='app-chat-inp-fld'/>
                    
                    <div className='app-chat-inp-butt-cont send-butt-cont'>
                    <button className='app-chat-inp-butt'>
                         <IonImg src={Send} className='app-chat-inp-butt-ico'></IonImg>
                    </button>
                    </div>
                    <div className='app-chat-inp-butt-cont'>
                    <button className='app-chat-inp-butt'>
                         <IonImg src={Fronthand} className='app-chat-inp-butt-ico'></IonImg>
                    </button>
                    </div>
          </div>
     )
}

const ChatCont:React.FC<{}> = (props) =>{
     const ele = document.getElementById('listnr-cont');
     const rect = ele?ele.getBoundingClientRect():null;
     

     return(
         <div className='app-space-chat-main-cont' >
               <OtherChatCont/>
               <OtherChatCont/>
               <OtherChatCont/>
               <SelfChatCont/>
               <OtherChatCont/>
               <OtherChatCont/>
               <OtherChatCont/>
               <SelfChatCont/>
               <OtherChatCont/>
               <OtherChatCont/>
               <OtherChatCont/>
               <OtherChatCont/>
               <OtherChatCont/>
               <OtherChatCont/>
               <OtherChatCont/>
               <OtherChatCont/>
               <OtherChatCont/>
               
         </div>
     )
}

export default class Space<SpaceProps> extends React.Component{
     constructor(props:SpaceProps){
          super(props);
     }
     render(){
          return(
               <IonPage >
               <div className='space-content'>
               <IonToolbar className='app-space-toolbar-main-cont'>
               <IonButtons slot="start">
                    <IonBackButton defaultHref="/land" />
               </IonButtons>
               <IonButtons slot="end" className='app-toolbar-end-butt-cont' >
                    <div className='app-toolbar-end-outer-butt'>
                    <IonButton className='app-toolbar-end-butt' >
                    <IonImg src={Person_add} className='app-toolbar-tit-more-ico' />
                    </IonButton>
                    </div>
                    <div className='app-toolbar-end-outer-butt'>
                    <IonButton className='app-toolbar-end-butt' >
                    <IonImg src={Share} className='app-toolbar-tit-more-ico' />
                    </IonButton>
                    </div>
                    <div className='app-toolbar-end-outer-butt'>
                    <IonButton className='app-toolbar-end-butt' >
                    <IonImg src={Call_end} className='app-toolbar-tit-more-ico' />
                    </IonButton>
                    </div>
               </IonButtons>
               </IonToolbar>
                    <BannerCont />
                    <TotalListners count={200}/>
                    <ChatCont />
                    <ChatInpCont/>
               </div>
               </IonPage>
          )
     }
}