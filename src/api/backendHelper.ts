import axios from 'axios';
import URLS from './api.routes';
import imageKitCert from '../certs/imagekit.config';

export default class BackendHelper{
     UID :string|null = null;
     constructor(UID:string){
          this.UID = UID!;
     }
     
     async _getUserInfo(){
         let respn =  null;
          await axios.post(URLS.getUserInfo,{uid:this.UID})
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