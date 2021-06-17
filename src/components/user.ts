declare type userData = {
     _id:string,
     uid:string,
     email:string,
     dname:string,
     cname:string,
     uname:string,
     bio:string,
     login_method:number,
     deleted_bool:boolean,
     init_bool:boolean,
     pvt_bool:boolean,
     admin_bool:boolean,
     joining_id:number,
     
}
export type{userData}

export default class User {
     public static TOKEN:string|null;
     public static UID:string|null;
     public static DATA:userData|null;
     constructor(){

     }

     setUserToken(val:string|null):void{
          User.TOKEN = val;
     }
     setUserUid(val:string|null):void{
          User.UID = val;
     }
     setUserData(val:userData|null):void{
          User.DATA = val;
          
     }
     getUserData():userData|null{
          return User.DATA;
     }
     getUserToken():string|null{
          return User.TOKEN;
     }
     getUserUid():string|null{
          return User.UID
     }
}