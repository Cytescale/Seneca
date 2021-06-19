import {IonRippleEffect,withIonLifeCycle ,  IonContent,IonRefresher, IonRefresherContent,IonPage,IonImg,useIonRouter } from '@ionic/react';
import {Menu,profPlaceholder,headphones,WelcomeBanner} from '../assets';
import React,{CSSProperties, useState,useEffect} from 'react';


let WecomeHead:React.FC<{shown?:Boolean}> = (props)=>{
     const [visi, setVis] = useState(props.shown);
     return(
     <div className='app-welcom-head-main-cont' >
               <div className='app-welcom-head-main-cont-ico-cont'>
               <IonImg src={Menu} className='app-welcom-head-main-cont-ico'/>
               </div>
               Seneca
     </div>
     )
}



let DoubleHeader:React.FC<{priString:string,secString?:string,secStringVisi?:boolean,SenStyle?:CSSProperties}> =(props)=>{
     return(
          <div style={props.SenStyle!} className='app-dhead-main-cont'>
                    <div className='app-dhead-sec-str-main-cont' style={{
                         display:props.secString && props.secStringVisi === true?'block':'none',
                    }}>
                    {props.secString}     
                    </div>
                    <div className='app-dhead-pri-str-main-cont'>
                    {props.priString}     
                    </div>
                    
          </div>
     )     
}

export {DoubleHeader,WecomeHead}