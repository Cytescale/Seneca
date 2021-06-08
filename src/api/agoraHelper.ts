import AgoraRTC, { IAgoraRTCClient, IAgoraRTCRemoteUser, IMicrophoneAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";



export default class agoraHelper{
     public static UID:string|null  = null;
     public static RTC_CLIENT:IAgoraRTCClient|null = null;
     public static PUBLISED:boolean= false;
     public static JOINED_SPACE_OWNDER:string|null = null;
     public static JOINED_SID:string|null = null;
     public static JOINED_CLIENT_SID: number | string |null = null;
     public static LOCAL_AUDIO_TRACK:IMicrophoneAudioTrack|null = null;
     public static REMOTE_AUDIO_TRACK:IRemoteAudioTrack|null = null;

     private RTC_TRACK_CONFIG={
               encoderConfig: "speech_low_quality",
     }

     public RTC_OPTIONS={
          mode:'rtc',
          codec:'vp8',
          appID: "d95380ef73954640840d0b042d9e128d",
          channel: "test",
          uid:null,
          token: '006d95380ef73954640840d0b042d9e128dIADnVZKKX/eFE7prMlmc+gOPgiuOpN7pRxOyjfD9KMpmvwx+f9gAAAAAEADGEkMQ7LC9YAEAAQDrsL1g',
     }  

     constructor(uid:string|null){
          if(!uid || uid===null){console.log("agoraHelper: empty uid init")}
          if(uid!==null){console.log("agoraHelper: set init user id"+uid);agoraHelper.UID  = uid!;}
     }


     async getAllDevices(){
          console.log("agoraHelper: listners list init");
              
     }

  
     async _initClient(){
               agoraHelper.RTC_CLIENT = AgoraRTC.createClient({
                    mode:'live',
                    codec:'vp8'
               })
               console.log("agoraHelper:  Client created");  
          if(agoraHelper.RTC_CLIENT){   
                    console.log("Duration"+agoraHelper.RTC_CLIENT.getRTCStats().Duration);;
               console.log("agoraHelper: connection stats"+agoraHelper.RTC_CLIENT!.connectionState)
             
               agoraHelper.RTC_CLIENT!.on("error", (err:any) => {
               console.log("agoraHelper:" +err)
             })
   
             agoraHelper.RTC_CLIENT!.on("user-joined",(user: IAgoraRTCRemoteUser)=>{
                  console.log("agoraHelper: user joined" +user.uid);
             })
             agoraHelper.RTC_CLIENT!.on("user-left", (user: IAgoraRTCRemoteUser)=> {
                  console.log("agoraHelper: user left" +user.uid)
             })
   
             agoraHelper.RTC_CLIENT!.on("user-published", async (user:IAgoraRTCRemoteUser, mediaType: "audio" | "video") => {
               if(agoraHelper.UID !== 'CvTBt6cgZCOwtKhQFgC3BdoIanS2'){
               console.log("agoraHelper: stream published by ID"+user.uid);
                agoraHelper.REMOTE_AUDIO_TRACK = await agoraHelper.RTC_CLIENT!.subscribe(user,'audio');
                agoraHelper.REMOTE_AUDIO_TRACK!.play();
               }
             })
             
             agoraHelper.RTC_CLIENT!.on("user-unpublished", function (user :any) {
                  console.log("agoraHelper: stream-un-published")
             })
          }
          
               
     }

     //host id :CvTBt6cgZCOwtKhQFgC3BdoIanS2
     //

     async _joinStream(appID?:string,channel?:string,token?:string){
          console.log("agoraHelper: UID JOIN init "+agoraHelper.UID);
          if(agoraHelper.JOINED_CLIENT_SID===null){
                         if(!agoraHelper.RTC_CLIENT){
                              console.log("agoraHelper: null rtc client");
                              return;
                         }
                         agoraHelper.RTC_CLIENT.setClientRole('host');
                         agoraHelper.JOINED_CLIENT_SID =  await agoraHelper.RTC_CLIENT!.join(
                         this.RTC_OPTIONS.appID, 
                         this.RTC_OPTIONS.channel,
                         this.RTC_OPTIONS.token,
                         null,
                         );
                         if(agoraHelper.UID === 'CvTBt6cgZCOwtKhQFgC3BdoIanS2'){
                              this._publicandplayAudioTrack();
                         }
                         else{
                              console.log("agoraHelper: As audience");
                         }
                         console.log("agoraHelper:  JOINED CLIENT UID"+agoraHelper.JOINED_CLIENT_SID);     
          }else{
               
          }
     }
     async _publicandplayAudioTrack(){
          agoraHelper.LOCAL_AUDIO_TRACK = await AgoraRTC.createMicrophoneAudioTrack({
               encoderConfig: "speech_low_quality",
          });
          await agoraHelper.RTC_CLIENT!.publish([agoraHelper.LOCAL_AUDIO_TRACK!]);
          agoraHelper.LOCAL_AUDIO_TRACK!.play();
     }

     async _destroyCall(){
          console.log("agoraHelper:  Audio track destroyed init");
          if(agoraHelper.LOCAL_AUDIO_TRACK){
               agoraHelper.LOCAL_AUDIO_TRACK.close();
               await agoraHelper.RTC_CLIENT!.leave();
               agoraHelper.JOINED_CLIENT_SID = null;
               console.log("agoraHelper:  Audio track destroyed");
          }
     }

}