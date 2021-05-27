import React from 'react';
import {IonSearchbar,IonContent, IonPage,IonRouterOutlet,IonTabBar,IonTabButton,IonImg,IonTabs } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import '../../../theme/styles/land.style.css';
import { SearchProps } from '../../../types/land/land.type';

export default class Search<SearchProps> extends React.Component{
     constructor(props:SearchProps){
          super(props);
     }
     render(){
          return(
               <IonPage >
               <IonContent fullscreen className='app-content-main-cont'>
                    <div>
                       
                         <IonSearchbar value={""} className='app-search-bar-cont'></IonSearchbar>
                         <IonTabs>
                              <IonRouterOutlet>                                   
                              </IonRouterOutlet>
                         <IonTabBar slot="top" className='app-search-bottombar-main-cont'>
                              <IonTabButton tab="home"  >
                                        <div>People</div>
                              </IonTabButton>
                              <IonTabButton tab="explore">
                                        <div>Spaces</div>
                              </IonTabButton> 
                         </IonTabBar>
                         </IonTabs>
                    </div>
                    </IonContent>
               </IonPage>
          )
     }
}