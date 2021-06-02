let _BASE_API_URL = process.env.PUBLIC_API_HOST
if(process.env.NODE_ENV=='development'){
     _BASE_API_URL = 'http://172.20.10.6:3000/api/'
}

type URLinter = {
     backendInit:string
     getUserInfo: string
     imagekitAuth:string
}
const URLS:URLinter = {
     getUserInfo:_BASE_API_URL+'db/getUser',
     imagekitAuth:_BASE_API_URL+"cdn/imageKitAuth",
     backendInit : _BASE_API_URL+'firebase_firestore_init'
}
export default URLS;