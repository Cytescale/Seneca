import axios from 'axios';
import URLS from './api.routes';
import imageKitCert from '../certs/imagekit.config';
import {userData} from '../components/user';
import userTempDb from '../components/userTempDb';



const Usertmpdb = new userTempDb();

export default class BackendHelper{
     public static SuccessPass = 0;
     public static MaxPass = 10;
     public static CurrentPass = 0;


     UID :string|null = null;
     constructor(UID:string|null){
          this.UID = UID!;
     }
     
     async _getSpace(){
          
     }

     async _createSpace(data:any){
          let respn =  null;
          await axios.post(URLS.createSpace,data)
             .then(res=>{
               respn = res.data;
             })
             .catch(err=>{
                  console.log(err);
             });
          return respn;
      }

     async _updateUserInfo(data:userData){
          let respn =  null;
           await axios.post(URLS.updateUserInfo,{uid:this.UID,data:data,
               headers: {"Access-Control-Allow-Origin": "*"}})
              .then(res=>{
                respn = res.data;
              })
              .catch(err=>{
 
                   console.log(err);
              });
           return respn;
      }

      async _delFollow(uid:string,suid:string){
          let respn =  null;
          await axios.post(URLS.delFollow,{uid:uid,suid:suid,
               headers: {"Access-Control-Allow-Origin": "*"}})
             .then(res=>{
               respn = res.data;
             })
             .catch(err=>{
                  console.log(err);
             });
          return respn;
      }
      async _getFollowCount(uid:string,suid:string){
          let respn =  null;
          await axios.post(URLS.getFollowCount,{
               uid:uid,
               suid:suid,
               headers: {"Access-Control-Allow-Origin": "*"}
          })
             .then(res=>{
               respn = res.data;
             })
             .catch(err=>{
                  console.log(err);
             });
          return respn;
      }


      async _addFollow(uid:string,suid:string){
          let respn =  null;
          await axios.post(URLS.addFollow,{
               uid:uid,
               suid:suid,
               headers: {"Access-Control-Allow-Origin": "*"}})
             .then(res=>{
               respn = res.data;
             })
             .catch(err=>{
                  console.log(err);
             });
          return respn;
      }

      async _getFollowedBool(uid:string,suid:string){
          let respn =  null;
           await axios.post(URLS.getFollowBool,{
                uid:uid,
                suid:suid,
                headers: {"Access-Control-Allow-Origin": "*"}
               })
              .then(res=>{
                respn = res.data;
              })
              .catch(err=>{
                   console.log(err);
              });
           return respn;
      }
 
      async _getOtherUserInfo(suid:string){
          BackendHelper.CurrentPass++;
          let respn =  null;
          if(BackendHelper.CurrentPass<BackendHelper.MaxPass){
               let bol = await Usertmpdb.ifInList(suid)
               if(bol===false){
                    console.log('backend helper: user data request | no user already');
               await axios.post(URLS.getUserInfo,{
                    uid:suid,
                    headers: {"Access-Control-Allow-Origin": "*"}
               })
               .then(async(res)=>{
                    respn = res.data;
                    let uData:userData = res.data.data;
                    BackendHelper.SuccessPass++;
                    let bl = await Usertmpdb.ifInList(uData.UID);
                    if(uData!==null){
                         if(!bl){Usertmpdb.addUser(uData);}
                    }

               })
               .catch(err=>{
                    console.log(err);
               });
               }
               else{
                    console.log('backend helper: user data request | already has user');
                    respn = {     
                         data: Usertmpdb.getUserByUid(suid),
                         errBool: false,
                         errCode: 0,
                         errMess: "null",
                    }
                   
               }
               BackendHelper.CurrentPass--;
          }
          else{
               respn = {     
                    data: null,
                    errBool: true,
                    errCode: 0,
                    errMess: "Too many request",
               }
          }
          return respn;
      }

      async _getUserJoiningId(jid:string){
          let respn =  null;
           await axios.post(URLS.getUserByJoiningId,{
                jid:jid,
                headers: {"Access-Control-Allow-Origin": "*"}
               })
              .then(res=>{
                respn = res.data;
              })
              .catch(err=>{
                   console.log(err);
              });
           return respn;
      }

     async _getUserInfo(){
         let respn =  null;
          await axios.post(URLS.getUserInfo,{
               uid:this.UID,
               headers: {"Access-Control-Allow-Origin": "*"}

          })
             .then(res=>{
               respn = res.data;
             })
             .catch(err=>{

                  console.log(err);
             });
          return respn;
     }

     async _get_image_kit_auth(){
          let gotFile = null;
          await axios.post(URLS.imagekitAuth,{})
             .then(res=>{
                 if(res){
                      gotFile =res.data;
                 }
             })
             .catch(err=>{
                  
                  console.log(err);
               
             });
             return gotFile;
     }

     

     async _image_upload(file_data:any){
          let tok:any = await this._get_image_kit_auth();     
          const formData = new FormData();
          formData.append('file',file_data['data_url']);
          formData.append('publicKey',imageKitCert.publicKey);
          formData.append('signature',tok.signature);
          formData.append('expire',tok.expire);
          formData.append('token',tok.token);
          formData.append('fileName',"titan-user-img");
          formData.append('useUniqueFileName','true');
          formData.append('isPrivateFile','false');
          const res  = await axios.post("https://upload.imagekit.io/api/v1/files/upload", formData, {
               headers: {
                    'content-type': 'multipart/form-data'
                }
             });        
          return res.data;
     }


}