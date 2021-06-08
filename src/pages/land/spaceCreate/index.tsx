import React,{CSSProperties,useState} from 'react';
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
      useIonRouter,
      IonTextarea,
      IonChip,
      IonLabel,
      IonRadioGroup,
      IonInput,
      IonItem,
      IonRadio,
      IonItemDivider,
      IonList,
      IonToast,
      IonListHeader} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import '../../../theme/styles/spacecreate.style.css';
import {More_verti,profPlaceholder,downArrow,CancelIco} from '../../../assets/';
import pep2 from '../../../assets/placeholders/pep2.jpg'
import { setToken,setUid } from '../../../api/firebaseHelper';
import history from '../../history';
import User, { userData } from '../../../components/user';
import ban1 from '../../../assets/placeholders/ban1.jpg'
import BackendHelper from '../../../api/backendHelper';
import { getUid } from '../../../api/firebaseHelper';
import { FeaturedSpace, spaceInter } from '../explore/Explore';
let backendHelper:BackendHelper|null = null;
const user = new User();


declare interface spaceCreateInter  {

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

let WecomeHead:React.FC<{shown?:Boolean}> = (props)=>{
     const [visi, setVis] = useState(props.shown);
     return(
     <div className='app-welcom-head-main-cont'  style={{
               display:visi==true?'block':'none',
          }}>
               {/* <Link to="/land/space" replace >User 1</Link> */}
         Create a <br/> Space
          
          <IonImg className='app-welcom-head-close-butt' onClick={()=>{
               setVis(!visi);
          }}
          src={CancelIco}
          />
     </div>
     )
}

declare interface spaceDataInter{
     uid:string
     name:string
     des:string
     image_url:string|null
     public_visi:boolean
}
declare interface spaceCreateState{
     tile:string
     des:string
     img_url:string|null
     public_visi:boolean
     toastBool:boolean,
     toastStr:string
}


export default class SpaceCreate<spaceCreateInter> extends React.Component<spaceCreateInter,spaceCreateState>{
     constructor(props:spaceCreateInter){
          super(props);
          this.state = {
               tile:'Sample title',
               des:'Sample description',
               img_url:null,
               public_visi:true,
               toastBool:false,
               toastStr:"null",
          }
          this.setVisiBool = this.setVisiBool.bind(this);
          this.setTitle = this.setTitle.bind(this);
          this.setDesc = this.setDesc.bind(this);
          this.initSpaceCreate = this.initSpaceCreate.bind(this);
          this.spaceProcess = this.spaceProcess.bind(this);
     }


     setToast(boole:boolean,str:string){
          this.setState({toastBool:boole,toastStr:str})
     }

     setTitle(val:string){
          this.setState({tile:val});
     }
     setDesc(val:string){
          this.setState({des:val});
     }

     setVisiBool(val:boolean){
          this.setState({public_visi:val});
     }

     // renderPreview(){
     //      const spaceData:spaceInter={
     //           name:this.state.tile,
     //           creator_name:user.getUserData()?.dname!,
     //           banner_art_src:ban1!,
     //           isLive:true,
     //           suid:user.getUserUid()!
     //      }
     //      return(
     //           <FeaturedSpace data={spaceData}  setProfileModal={()=>{}} />
     //      )
     // }

     initSpaceCreate(){
          if(user.getUserUid())backendHelper = new BackendHelper(user.getUserUid()!);
        
     }
     
     componentDidMount(){
          this.initSpaceCreate();    
     }

//1280 x 600

     spaceProcess(){
          if(backendHelper){
                    const spaceData:spaceDataInter ={
                         uid:user.getUserUid()!,
                         name:this.state.tile,
                         des:this.state.des,
                         image_url:this.state.img_url,
                         public_visi:this.state.public_visi,
                    }
                   backendHelper._createSpace(spaceData).then((res:any)=>{
                       if(res){
                            if(res.errBool===false){
                                 if(res.data.creation_bool===true){
                                   history.replace('/space/'+res.data.key)
                                 }else{
                                        this.setToast(true,"Creation failed");
                                 }
                              
                            }else{
                              this.setToast(true,res.errMess);
                            }
                       }
                       else{
                         this.setToast(true,"Response parse  failed");
                       }
                   }); 
          }
     }
     
     render(){
          return(
               <IonPage >
                       <IonHeader >
               <IonToolbar className='app-toolbar-main-cont profile-view-head-main'>
               <IonButtons slot="start">
                    <IonBackButton defaultHref='/land'/>
               </IonButtons>
               <IonButtons slot="end">
               <IonButton  onClick={()=>{
                         this.spaceProcess();
                    } 
               }>Create</IonButton>
               </IonButtons>
               </IonToolbar>
               </IonHeader>
               <IonContent fullscreen className='profile-view-main-cont'>
                    <WecomeHead shown={true}/>

                    {/* <DoubleHeader priString="Preview" secString="Set your space's visibility" secStringVisi={false}/>
                    <div className='app-space-create-inp-cont'>
                       {this.renderPreview()}
                    </div> */}

                    <DoubleHeader priString="Enter title" secString="Give your space a name" secStringVisi={true}/>     
                    <div className='app-space-create-inp-cont'>
                    <IonInput type='text' value={this.state.tile} onIonChange={e =>{this.setTitle(e.detail.value!)}} placeholder='Title' className='app-space-create-inp-fld'></IonInput>
                    </div>
                    <DoubleHeader priString="Enter Description"  secString="Tell us about your space" secStringVisi={true}/>
                    <div className='app-space-create-inp-cont'>
                    <IonTextarea placeholder='Description' value={this.state.des}  onIonChange={e =>{this.setDesc(e.detail.value!)}} className='app-space-create-inp-txt-fld'></IonTextarea>
                    </div>
                    <DoubleHeader priString="Cover image" secString="Set a cover art for your space" secStringVisi={true}/>
                    <div className='app-space-create-inp-cont'>
                    <IonImg src={ban1} className='ion-activatable ripple-parent app-space-create-ban-art'/>
                    </div>


                    {/* <IonList>
          <IonRadioGroup value={this.state.public_visi} onIonChange={e => this.setVisiBool(e.detail.value)} className='app-space-crate-rad-grup-main-cont'>
               <DoubleHeader priString="Visibility" secString="Set your space's visibility" secStringVisi={true}/>
            <IonItem className='app-space-crate-rad-grup-main-cont'>
              <IonLabel className='app-space-crate-rad-grup-main-cont-tit'>Private</IonLabel>
              <IonRadio slot="start" value={false} />
            </IonItem>

            <IonItem className='app-space-crate-rad-grup-main-cont'>
              <IonLabel className='app-space-crate-rad-grup-main-cont-tit'>Public</IonLabel>
              <IonRadio slot="start" value={true} />
            </IonItem>
          </IonRadioGroup>
        </IonList>
         */}
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