import {IonSearchbar,IonContent, IonToast,IonModal,IonHeader,withIonLifeCycle,IonPage,IonToolbar,IonTitle,IonButtons,IonIcon,IonButton,IonBackButton,IonRouterOutlet,IonTabBar,IonTabButton,IonImg,IonTabs } from '@ionic/react';
import AgoraRTC, { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack, IMicrophoneAudioTrack, IAgoraRTCClient, IAgoraRTCRemoteUser, ClientRole } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect } from "react";
import firebaseHelper from '../api/firebaseHelper';
import {
  Call_end,
  Person_add,
  Share,
  Mic_UnSelec,
  Fronthand,
  Send,
  Mic_Mute_UnSelec,
  
} from '../assets/';
import User from './user';


let user  =  new User();
let FirebaseHelper:firebaseHelper|null = new firebaseHelper();

const RTC_OPTIONS={
  mode:'live',
  codec:'vp8',
  appID: "d95380ef73954640840d0b042d9e128d",
  channel: "test",
  uid:null,
  token: '006d95380ef73954640840d0b042d9e128dIACwNb6QISGxvPK6JgsoNO/B6OGzNqIfnPYxC87q2tS1ggx+f9gAAAAAEADGEkMQB9HAYAEAAQAG0cBg',
}



export declare interface MediaPlayerProps {
  joinable:boolean
  role:ClientRole
  mic:boolean
  channelToken?:string
  spaceData:any
  SID:string
  UID?:string
  joined:boolean
  setJoined:any
  joinedName:string
  setJoinedName:any
}

export declare interface MediaPlayerState {
  mic:boolean
  published:boolean
  joined:boolean
  joined_channel_uid:string|number|null
  joined_channel_owner_uid:string|null
  AGORA_CLIENT:IAgoraRTCClient|null
  LOCAL_TRACK:IMicrophoneAudioTrack|null
  REMOTE_TRACK:IRemoteAudioTrack|null
  toastBool:boolean
  toastStr:string
}


const ChatInpCont:React.FC<{mic:boolean,setMicState:any,setToast:any,closeCall:any}> = (props:any) => {
  return(
       <div className='app-chat-inp-main-cont' >
                 <div className='app-chat-inp-butt-cont'>
                 {props.mic===true?
                        <button className='app-chat-inp-butt' onClick={()=>{
                              props.setMicState(false);
                              props.setToast(true,"Mic Unmuted")
                        }}>
                              <IonImg src={Mic_Mute_UnSelec} className='app-chat-inp-butt-ico'></IonImg>
                        </button>:
                 <button className='app-chat-inp-butt' onClick={()=>{
                      props.setMicState(true);
                      props.setToast(true,"Mic muted");
                 }}>
                 <IonImg src={Mic_UnSelec} className='app-chat-inp-butt-ico'></IonImg>
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
                    props.closeCall();
                 }}>
                      Leave <IonImg src={Call_end} className='app-chat-inp-butt-ico space-end-ico'></IonImg>
                 </button>
                 </div>
              
       </div>
  )
}

class agoraPlayer extends React.Component<MediaPlayerProps|any,MediaPlayerState>{
  public static AGORA_CLIENT:IAgoraRTCClient|null = null;
  constructor(props:MediaPlayerProps){
    super(props);
    this.state={
      mic:false,
      published:false,
      joined:false,
      joined_channel_uid:null,
      joined_channel_owner_uid:null,
      AGORA_CLIENT:null,
      LOCAL_TRACK:null,
      REMOTE_TRACK:null,
      toastBool:false,
      toastStr:"null"
    }

    this.setAgoraClient = this.setAgoraClient.bind(this);
    this.setLocalTrack = this.setLocalTrack.bind(this);
    this.setRemoteTrack = this.setRemoteTrack.bind(this);
    this.setChannelUid = this.setChannelUid.bind(this);
    this.setJoined = this.setJoined.bind(this);
    this.setPublised =  this.setPublised.bind(this);
    this.setChannelOwner = this.setChannelOwner.bind(this);
    this.leaveCall = this.leaveCall.bind(this);
    this.eventHandlers  =this.eventHandlers.bind(this);
    this.initAgoraClient = this.initAgoraClient.bind(this);
    this._publicandplayAudioTrack = this._publicandplayAudioTrack.bind(this);
    this.setToast = this.setToast.bind(this);
    this._setAsMic = this._setAsMic.bind(this);
    this.setMicState = this.setMicState.bind(this);
    this.setMic = this.setMic.bind(this);
  }


  setMic(bool:boolean){
    if(FirebaseHelper?.getFirebase()){
      console.log("agoraPlayer: attendee add init");
      var database = FirebaseHelper?.getFirebase()!.database();
      var spaceRef = database.ref('user_curr_stat').child(user.getUserUid()!).update({speaking:bool});
    }
  }


  addAsAttendee(){
    let data =this.props.spaceData ;
    if(FirebaseHelper?.getFirebase()){
         console.log("agoraPlayer: attendee add init");
         var database = FirebaseHelper?.getFirebase()!.database();
         var spaceRef = database.ref('user_curr_stat').child(user.getUserUid()!).set({
            speaking:false,
            currentListing:this.props.SID,
         });

    }
}
removeAsAttendee(){
  let data = this.props.spaceData;
    if(FirebaseHelper?.getFirebase()){
         console.log("agoraPlayer: attendee remove init");
         var database = FirebaseHelper?.getFirebase()!.database();
         var spaceRef = database.ref('user_curr_stat').child(user.getUserUid()!).set({
          speaking:false,
          currentListing:null,
         });
    }
}
removeAsAttendeeWithUid(uid:string){
  let data = this.props.spaceData;
    if(FirebaseHelper?.getFirebase()){
         console.log("agoraPlayer: attendee remove init");
         var database = FirebaseHelper?.getFirebase()!.database();
         var spaceRef = database.ref('user_curr_stat').child(uid).set({
          speaking:false,
          currentListing:null,
         });
    }
}



  setMicState(v:boolean){
    this.setState({mic:v})
    this._setAsMic();
  }

  setToast(bool:boolean,str:string){
    this.setState({
         toastBool:bool,
         toastStr:str
    })
}
  
 setAgoraClient(v : IAgoraRTCClient|null) {
    this.setState({AGORA_CLIENT:v});
  }
 setLocalTrack(v : IMicrophoneAudioTrack|null) {
    this.setState({LOCAL_TRACK:v});
  }
 setRemoteTrack(v : IRemoteAudioTrack|null) {
    this.setState({REMOTE_TRACK:v});
  }
 setChannelUid(v : string|number|null) {
    this.setState({joined_channel_uid:v});
  }
 setJoined(v : boolean) {
    this.setState({joined:v});
  }
 setPublised(v : boolean) {
    this.setState({published:v});
  }
 setChannelOwner(v : string) {
    this.setState({joined_channel_owner_uid:v});
  }
  
  
 eventHandlers(){
  console.log("agoraPlayer: event handelers created" );
  if(agoraPlayer.AGORA_CLIENT!){   
    console.log("Duration"+agoraPlayer.AGORA_CLIENT!.getRTCStats().Duration);;
    console.log("agoraPlayer: connection stats"+agoraPlayer.AGORA_CLIENT!.connectionState)

    agoraPlayer.AGORA_CLIENT!.on("volume-indicator", volumes => {
      volumes.forEach((volume, index) => {
        if(volume.uid === this.props.UID){
          if(volume.level>2){
            this.setMic(true);
          }
          else{
            this.setMic(false);
          }
          
        }
        
      });
    })

    agoraPlayer.AGORA_CLIENT!.on("error", (err:any) => {
    console.log("agoraPlayer:" +err)
    })

    agoraPlayer.AGORA_CLIENT!.on("user-joined",(user: IAgoraRTCRemoteUser)=>{
      console.log("agoraPlayer: user joined" +user.uid);
      console.log("agoraPlayer: user count"+ agoraPlayer.AGORA_CLIENT?.getRTCStats().UserCount);
    })
    agoraPlayer.AGORA_CLIENT!.on("user-left", (user: IAgoraRTCRemoteUser)=> {
      console.log("agoraPlayer: user left" +user.uid)
    })

    agoraPlayer.AGORA_CLIENT!.on("user-published", async (user:IAgoraRTCRemoteUser, mediaType: "audio" | "video") => {
      console.log("agoraPlayer: stream published by ID"+user.uid);
      const remoteTrack = await agoraPlayer.AGORA_CLIENT!.subscribe(user,'audio');
      this.setRemoteTrack(remoteTrack);
      this.state.REMOTE_TRACK!.play();    
      // if(this.props.UID !== 'CvTBt6cgZCOwtKhQFgC3BdoIanS2'){
          // console.log("agoraPlayer: stream published by ID"+user.uid);
          //
          // }
    })

    agoraPlayer.AGORA_CLIENT!.on("user-unpublished", function (user :any) {
      console.log("agoraPlayer: stream-un-published")
    })
    }
}
  async initAgoraClient(){
    AgoraRTC.setLogLevel(3);
    agoraPlayer.AGORA_CLIENT = AgoraRTC.createClient({mode:'live',codec:'vp8'});
    console.log("agoraPlayer:  Client created"); 
    await this.joinChannel();
    this.eventHandlers();
  }


  async joinChannel(){
    if(this.props.joinable){
    console.log("agoraPlayer: UID JOIN init "+this.props.UID);
    if(!this.state.LOCAL_TRACK && agoraPlayer.AGORA_CLIENT && !this.props.joined){
      try{
        agoraPlayer.AGORA_CLIENT!.setClientRole('host');
      const JOINED_CLIENT_SID =  await agoraPlayer.AGORA_CLIENT!.join(
        RTC_OPTIONS.appID, 
        this.props.spaceData.agora_channel_name,
        this.props.spaceData.agora_channel_token,
        this.props.UID,
        );
        if(JOINED_CLIENT_SID){
          this.addAsAttendee();
          this.props.setJoined(true);
          this.props.setJoinedName(this.props.spaceData.name)
        }
        // agoraPlayer.AGORA_CLIENT!.enableAudioVolumeIndicator();
        this.setChannelUid(JOINED_CLIENT_SID!);
        this._publicandplayAudioTrack();
        }
        catch(e:any){
          console.log("Error Occured"+e);
          this.setToast(true,'agoraPlayer: Fatal Error Occured');
        }
    }
      else{
        console.log("agoraPlayer:  Already local track present || No client"); 
      }
    }
    else{
      console.log("agoraPlayer:  not joinable"); 
    }
  }

  async _publicandplayAudioTrack(){
    const LOCAL_AUDIO_TRACK = await AgoraRTC.createMicrophoneAudioTrack({
         encoderConfig: "speech_low_quality",
    });
    
  
    if(this.state.mic===true){
      LOCAL_AUDIO_TRACK.setEnabled(true).then(async ()=>{
          await agoraPlayer.AGORA_CLIENT!.publish([this.state.LOCAL_TRACK!]);
      });  
      console.log("agoraPlayer: Audio track umuted");   
    }
    else{
      console.log("agoraPlayer: Audio track muted");
      LOCAL_AUDIO_TRACK.setEnabled(false);  
    }
    this.setLocalTrack(LOCAL_AUDIO_TRACK);
    this.state.LOCAL_TRACK!.play();
}

async _setAsMic(){
  if(this.state.LOCAL_TRACK){
      if(this.state.mic===true){
        this.state.LOCAL_TRACK!.setEnabled(true).then(async ()=>{
          await agoraPlayer.AGORA_CLIENT!.publish([this.state.LOCAL_TRACK!]);
        });  
        console.log("agoraPlayer: Audio track umuted");
      }
      else{
        console.log("agoraPlayer: Audio track muted");
        this.state.LOCAL_TRACK!.setEnabled(false);  
        //await AGORA_CLIENT!.publish([this.state.LOCAL_TRACK!]);
      }
  }
}


  async leaveCall(){
    console.log("agoraPlayer:  Audio track destroyed init");
     if(this.state.LOCAL_TRACK){
      this.state.LOCAL_TRACK.close();
         await agoraPlayer.AGORA_CLIENT!.leave();
         console.log("agoraPlayer:  Audio local track destroyed");
    }
    if(this.state.REMOTE_TRACK){
      this.state.REMOTE_TRACK.stop();
         await agoraPlayer.AGORA_CLIENT!.leave();
         console.log("agoraPlayer:  Audio remote track destroyed");
    }
    agoraPlayer.AGORA_CLIENT= null;
    this.setChannelUid(null);
    this.setAgoraClient(null);
    this.setRemoteTrack(null);
    this.setLocalTrack(null);
    this.removeAsAttendee();
    this.props.setJoined(false);
    this.props.setModal(false);
    this.props.setSid(null);
    this.props.setJoinedName(null)
  }

  componentDidMount(){
    this.initAgoraClient();
  }
  componentDidUpdate(){
   // console.log("agoraPlayer: Mic status change"+this.state.mic);
  }
  componentWillUnmount(){
    //this.leaveCall();
  }
  render(){
    return(
      <div>
                <ChatInpCont mic={this.state.mic} setMicState={this.setMicState} setToast={this.setToast} closeCall={this.leaveCall}/> 
                  <IonToast
                    isOpen={this.state.toastBool}
                    onDidDismiss={() => this.setToast(false,"null")}
                    message={this.state.toastStr}
                    duration={600}
                    />
      </div>
    )
  }
}

export default agoraPlayer;