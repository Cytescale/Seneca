import firebase from "firebase/app";
import "firebase/auth";
import axios from 'axios';
import FIREBASE_CONFIG_VAR from "../certs/firebase.config";
import URLS from './api.routes'; 
     import { Storage } from '@capacitor/storage';
import User from "../components/user";


declare type errResponse = {
     errCode:number
     errMess:string
     errBool:boolean
     fatal?:boolean
}

declare type serverReponse ={
     error?:errResponse|null
     resCode?:number
     resMess?:any
}


declare  interface  firebaseHelperInter{
     initFirebaseApp(callback?:(val:boolean)=>void):boolean|null
     initFirebaseBackend(callback?:(val:boolean)=>void):any
     initFirebaseAuthStateChange():boolean|null
     checkInitUser():Promise<boolean|null>
     getFirebase():(firebase.app.App)|null
     userCheck():boolean
     getCurrentUser():firebase.User|null
     initEmailAuth(eml:string,pass:string,callback:any):Promise<serverReponse|null>
     intiGoogleAuth():serverReponse|null
     getConnected():boolean|null
     

}

export type {serverReponse,firebaseHelperInter,errResponse};

const checkToken = async () => {
     const { value } = await Storage.get({ key: 'token' });
     return value;
}

const setToken = async (token:string) => {
     await Storage.set({key: 'token',value:token});
};
const getUid = async () => {
     const { value } = await Storage.get({ key: 'uid' });
     return value;
};
const setUid = async (uid:string) => {
     await Storage.set({key: 'uid',value:uid});
};


export {checkToken,setToken,getUid,setUid}

const  user = new User();

export default class firebaseHelper implements firebaseHelperInter{
     static _FIREBASE_APP:firebase.app.App|null = null;
     static _FIREBASE_PROVIDE:firebase.auth.GoogleAuthProvider|null = null;
     static _CONNTECD:boolean = false;
  
     constructor(){

     }
     
     initFirebaseApp(callback?:any): boolean | null {
          try{
               if(firebase.apps.length<1){
                    firebaseHelper._FIREBASE_APP = firebase.initializeApp(FIREBASE_CONFIG_VAR);
                    firebaseHelper._FIREBASE_PROVIDE = new firebase.auth.GoogleAuthProvider(); 
                    console.log('firebasehelper | new app initialised');
                    
                  }else{
                    console.log('firebasehelper | app already initialised'); 
                  }
                  
                  if(callback)callback(true);
                  return true;
          }
          catch(e){
               if(callback)callback(false);
               console.log(e);
               return false;
          }
     }
     async checkInitUser(){
          let res = await checkToken();
          if( res &&  res!=='null'){
               let uid  = await getUid();
               user.setUserUid(uid);
               user.setUserToken(res);
               return true;
          }
          else{
               console.log("NO USER");
               return false;
          }
          return null;
     }

     async initFirebaseBackend(callback?:any) {
          let ress = await axios.post(URLS.backendInit,{headers: {'Access-Control-Allow-Origin' : '*',}})
          .then((res:any)=>{
            console.log("firebasehelper | Backend firebase app init success");            
            firebaseHelper._CONNTECD  = true;
            if(callback)callback(true);
            return true;
          })
          .catch(err=>{
            console.log("firebasehelper | Backend firebase app init failure "+err);
            firebaseHelper._CONNTECD  = false;
            if(callback)callback(false);
            throw new Error(err);
            return false;
          });
          return ress;
     }
     getConnected():(typeof firebaseHelper._CONNTECD){
          return firebaseHelper._CONNTECD;
     }
     initFirebaseAuthStateChange(): boolean | null {
          throw new Error("Method not implemented.");
     }
     getFirebase(): firebase.app.App | null {
          return (firebaseHelper._FIREBASE_APP);
     }
     userCheck(): boolean {
          throw new Error("Method not implemented.");
     }
     getCurrentUser(): firebase.User|null {
          if(this.getFirebase()&&this.getFirebase()!.auth()){ 
               return (this.getFirebase()!.auth().currentUser);
          }
          return null;
     }


     async initEmailAuth(eml: string, pass: string,callback:any):Promise<serverReponse|null>{
          let ress:serverReponse = {}
          await this.getFirebase()!.auth().signInWithEmailAndPassword(eml,pass).then((result)=>{
                    
                    result.user?.getIdToken(true).then(res=>{
                         user.setUserToken(res);
                         setToken(res);
                    })
                    ress = {
                         error:null,
                         resCode:200,
                         resMess:{uid:result.user?.uid}
                    }
               })
               .catch((error) => {
                    console.log(error.code); 
                    ress= {
                         error:{
                              errCode :1,
                              errMess:error.code,
                              errBool : true,
                              fatal :  false,
                         }
                    }
               
          });
          //callback(res);
          return ress;
        
     }
     intiGoogleAuth(): serverReponse | null {
          throw new Error("Method not implemented.");
     }

}