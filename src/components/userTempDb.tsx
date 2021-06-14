import {userData} from './user';

class userTempDb{

     public static userList:Array<userData> = []

     constructor(){


     }

     public getUserList(){
          return userTempDb.userList;
     }

     public addUser(user:userData){
          this.getUserList().push(user);
     }

     public getUserByUid(uid:string):userData|null{
          let fd:userData|null= null;
          this.getUserList().forEach(e => {
               if(e.UID == uid){
                    fd = e;
                    return;
               }
          });
          return fd;
     }

     public getUserByJid(jid:number):userData|null{
          let fd:userData|null= null;
          this.getUserList().forEach(e => {
               if(e.joining_id == jid){
                    fd = e;
                    return;
               }
          });
          return fd;
     }


     public async ifInList(uid:string):Promise<boolean>{
          let fd= false;
          if(this.getUserList()){
               if(this.getUserList().length>0){
                    for (const item of this.getUserList()) {
                         let o = await ((item:any,uid:any)=>{
                                   if(item.UID == uid){
                                        return true;
                                   }
                                   else{
                                        return false;
                                   }
                              }
                         )
                         let t  =o(item,uid);
                         if(t){fd=true;break;}
                    }
               }
          }
          return fd;
     }
}
export default userTempDb;