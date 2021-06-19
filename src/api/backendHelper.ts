import axios from 'axios';
import URLS from './api.routes';
import imageKitCert from '../certs/imagekit.config';
import {userData} from '../components/user';
import userTempDb from '../components/userTempDb';
import nexusResponse from './nexusResponse';

const Usertmpdb = new userTempDb();

// var data = qs.stringify({
//   'uid': 'value' 
// });

export default class BackendHelper{
     public static SuccessPass = 0;
     public static MaxPass = 10;
     public static CurrentPass = 0;

     UID :string|null = null;
     constructor(UID:string|null){
          this.UID = UID!;
     }
     
   
      _getUserInfo(uid:any):Promise<nexusResponse>{    
          var data = JSON.stringify({"uid": uid});             
          return new Promise((resolve, reject) => {
               setTimeout(async ()=>{
                    await axios({
                         method: 'post',
                         url:URLS.getUserInfo,
                         headers: { 'Content-Type': 'application/json'},
                         data : data,})
                    .then((response)=>{
                         let rd:nexusResponse = response.data;
                         resolve(rd);
                    })
                    .catch((error)=>{
                    console.log(error);
                    let sr:nexusResponse ={errBool:true,errMess:error,responseData:null,}
                    reject(sr);
                    });
               }, 5000);
          })
      }

      _getSpaceFeedDatabyUid(uid:any):Promise<nexusResponse>{    
          var data = JSON.stringify({"uid": uid});             
          return new Promise((resolve, reject) => {
               setTimeout(async ()=>{
                    await axios({
                         method: 'post',
                         url:URLS.getSpaceFeedData,
                         headers: { 'Content-Type': 'application/json'},
                         data : data,})
                    .then((response)=>{
                         let rd:nexusResponse = response.data;
                         resolve(rd);
                    })
                    .catch((error)=>{
                    console.log(error);
                    let sr:nexusResponse ={errBool:true,errMess:error,responseData:null,}
                    reject(sr);
                    });
               }, 5000);
          })
      }

      async _getUserJoiningId(jid:number):Promise<nexusResponse>{
          var data = JSON.stringify({"jid":jid.toString()});             
          return new Promise((resolve, reject) => {
               setTimeout(async ()=>{
                    await axios({
                         method: 'post',
                         url:URLS.getUserByJoiningId,
                         headers: { 'Content-Type': 'application/json'},
                         data : data
                    })
                    .then((response)=>{
                         let rd:nexusResponse = response.data;
                         resolve(rd);
                    })
                    .catch((error)=>{
                    console.log(error);
                    let sr:nexusResponse ={errBool:true,errMess:error,responseData:null,}
                    reject(sr);
                    });
               }, 5000);
          })
      }

     
     async getSpaceDatabySid(uid:string,sid:string):Promise<nexusResponse>{
          var data = JSON.stringify({"uid":uid,"sid":sid});
          return new Promise((resolve, reject) => {
               setTimeout(async ()=>{
                    await axios({
                         method: 'post',
                         url:URLS.getSpaceDatabySid,
                         headers: { 'Content-Type': 'application/json'},
                         data : data
                    })
                    .then((response)=>{
                         let rd:nexusResponse = response.data;
                         resolve(rd);
                    })
                    .catch((error)=>{
                    console.log(error);
                    let sr:nexusResponse ={errBool:true,errMess:error,responseData:null,}
                    reject(sr);
                    });
               }, 5000);
          })        
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