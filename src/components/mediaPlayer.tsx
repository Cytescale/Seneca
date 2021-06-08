import {IonSearchbar,IonContent, IonToast,IonModal,IonHeader,withIonLifeCycle,IonPage,IonToolbar,IonTitle,IonButtons,IonIcon,IonButton,IonBackButton,IonRouterOutlet,IonTabBar,IonTabButton,IonImg,IonTabs } from '@ionic/react';
import AgoraRTC, { ILocalVideoTrack, IRemoteVideoTrack, ILocalAudioTrack, IRemoteAudioTrack, IMicrophoneAudioTrack, IAgoraRTCClient, IAgoraRTCRemoteUser, ClientRole } from "agora-rtc-sdk-ng";
import React, { useRef, useEffect } from "react";
import {
  Call_end,
  Person_add,
  Share,
  Mic_UnSelec,
  Fronthand,
  Send,
  Mic_Mute_UnSelec,
} from '../assets/';
const RTC_OPTIONS={
  mode:'live',
  codec:'vp8',
  appID: "d95380ef73954640840d0b042d9e128d",
  channel: "test",
  uid:null,
  token: '006d95380ef73954640840d0b042d9e128dIACwNb6QISGxvPK6JgsoNO/B6OGzNqIfnPYxC87q2tS1ggx+f9gAAAAAEADGEkMQB9HAYAEAAQAG0cBg',
}

var AGORA_CLIENT:IAgoraRTCClient|null = null;

export declare interface MediaPlayerProps {
  joinable:boolean
  role:ClientRole
  mic:boolean
  channelToken?:string
  spaceData:any
  UID?:string
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



const ChatInpCont:React.FC<{mic:boolean,setMicState:any,setToast:any}> = (props:any) => {
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

class agoraPlayer extends React.Component<MediaPlayerProps,MediaPlayerState>{
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
  
 setAgoraClient(v : IAgoraRTCClient) {
    this.setState({AGORA_CLIENT:v});
  }
 setLocalTrack(v : IMicrophoneAudioTrack) {
    this.setState({LOCAL_TRACK:v});
  }
 setRemoteTrack(v : IRemoteAudioTrack) {
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
  
  
async eventHandlers(){
  console.log("agoraHelper: event handelers created" );
  if(AGORA_CLIENT!){   
    console.log("Duration"+AGORA_CLIENT!.getRTCStats().Duration);;
    console.log("agoraHelper: connection stats"+AGORA_CLIENT!.connectionState)

    AGORA_CLIENT!.on("error", (err:any) => {
    console.log("agoraHelper:" +err)
    })

    AGORA_CLIENT!.on("user-joined",(user: IAgoraRTCRemoteUser)=>{
      console.log("agoraHelper: user joined" +user.uid);
      console.log("agoraHelper: user count"+ AGORA_CLIENT?.getRTCStats().UserCount);
    })
    AGORA_CLIENT!.on("user-left", (user: IAgoraRTCRemoteUser)=> {
      console.log("agoraHelper: user left" +user.uid)
    })

    AGORA_CLIENT!.on("user-published", async (user:IAgoraRTCRemoteUser, mediaType: "audio" | "video") => {
      console.log("agoraHelper: stream published by ID"+user.uid);
      const remoteTrack = await AGORA_CLIENT!.subscribe(user,'audio');
      this.setRemoteTrack(remoteTrack);
      this.state.REMOTE_TRACK!.play();    
      // if(this.props.UID !== 'CvTBt6cgZCOwtKhQFgC3BdoIanS2'){
          // console.log("agoraHelper: stream published by ID"+user.uid);
          //
          // }
    })

    AGORA_CLIENT!.on("user-unpublished", function (user :any) {
      console.log("agoraHelper: stream-un-published")
    })
    }
}
  async initAgoraClient(){
    AGORA_CLIENT = AgoraRTC.createClient({mode:'live',codec:'vp8'});
    console.log("agoraHelper:  Client created"); 
    this.joinChannel();
    this.eventHandlers();
  }


  async joinChannel(){
    if(this.props.joinable){
    console.log("agoraHelper: UID JOIN init "+this.props.UID);
    if(!this.state.LOCAL_TRACK && AGORA_CLIENT){
      try{
      AGORA_CLIENT!.setClientRole('host');
      const JOINED_CLIENT_SID =  await AGORA_CLIENT!.join(
        RTC_OPTIONS.appID, 
        this.props.spaceData.agora_channel_name,
        this.props.spaceData.agora_channel_token,
        null,
        );
        this.setChannelUid(JOINED_CLIENT_SID!);
        this._publicandplayAudioTrack();
          if(this.props.UID === 'CvTBt6cgZCOwtKhQFgC3BdoIanS2'){
              this._publicandplayAudioTrack();
          }
          else{
              console.log("agoraHelper: As audience");
          }
        }
        catch(e:any){
          console.log("Error Occured"+e);
          this.setToast(true,'agoraHelper: Fatal Error Occured');
        }
    }
      else{
        console.log("agoraHelper:  Already local track present || No client"); 
      }
    }
    else{
      console.log("agoraHelper:  not joinable"); 
    }
  }

  async _publicandplayAudioTrack(){
    const LOCAL_AUDIO_TRACK = await AgoraRTC.createMicrophoneAudioTrack({
         encoderConfig: "speech_low_quality",
    });
    this.setLocalTrack(LOCAL_AUDIO_TRACK);
    if(this.state.mic===true){
      this.state.LOCAL_TRACK!.setEnabled(true).then(async ()=>{
          await AGORA_CLIENT!.publish([this.state.LOCAL_TRACK!]);
      });  
      console.log("agoraHelper: Audio track umuted");
    }
    else{
      console.log("agoraHelper: Audio track muted");
      this.state.LOCAL_TRACK!.setEnabled(false);  
      //await AGORA_CLIENT!.publish([this.state.LOCAL_TRACK!]);
    }
    this.state.LOCAL_TRACK!.play();
}

async _setAsMic(){
  if(this.state.LOCAL_TRACK){
    if(this.state.LOCAL_TRACK!.isPlaying){
      if(this.state.mic===true){
        this.state.LOCAL_TRACK!.setEnabled(true).then(async ()=>{
          await AGORA_CLIENT!.publish([this.state.LOCAL_TRACK!]);
        });  
        console.log("agoraHelper: Audio track umuted");
      }
      else{
        console.log("agoraHelper: Audio track muted");
        this.state.LOCAL_TRACK!.setEnabled(false);  
        //await AGORA_CLIENT!.publish([this.state.LOCAL_TRACK!]);
      }
    }
  }
}


  async leaveCall(){
    console.log("agoraHelper:  Audio track destroyed init");
    if(this.state.LOCAL_TRACK){
      this.state.LOCAL_TRACK.close();
         await AGORA_CLIENT!.leave();
          this.setChannelUid(null);
         console.log("agoraHelper:  Audio local track destroyed");
    }
    if(this.state.REMOTE_TRACK){
      this.state.REMOTE_TRACK.stop();
         await AGORA_CLIENT!.leave();
          this.setChannelUid(null);
         console.log("agoraHelper:  Audio remote track destroyed");
    }
  }

  componentDidMount(){
    this.initAgoraClient();
  }
  componentDidUpdate(){
   // console.log("agoraHelper: Mic status change"+this.state.mic);
  }
  componentWillUnmount(){
    this.leaveCall();
  }
  render(){
    return(
      <div>
                <ChatInpCont mic={this.state.mic} setMicState={this.setMicState} setToast={this.setToast} /> 
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