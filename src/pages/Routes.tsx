import React from 'react';
import { Switch } from 'react-router';
import { Redirect, Route } from 'react-router-dom';
import { RoutesProps } from '../types/land/land.type';

import LoginAct from './login/Login';
import Search from './land/search';
import Profile from './land/profile';
import Explore from './land/explore/Explore';
import Space from './land/space';
import LandAct from './land/Land';

export default class Routes extends React.Component {
     constructor(props:RoutesProps){
          super(props);
     }
     render() {
          return(
               <Switch>
                     <Route exact path="/home" component={LandAct} />
                    <Route exact path="/land/explore" component={Explore}/>
                    <Route exact path="/land/search"  component={Search}/>
                    <Route exact path="/land/profile" component={Profile} />
                    <Route exact path="/space" component={Space} /> 
                    <Route path="/land"><LandAct/></Route>
                    <Route exact path="/login"><LoginAct /></Route>
                    <Route exact path="/"><Redirect to="/land" /></Route>
                    <Route  path='/land/space' render={() =>  <Redirect to="/space" />}  exact/>
                    <Route  path="/land/" render={() => <Redirect to="/land/explore" />} exact/>
               </Switch>
          )
     }
} 