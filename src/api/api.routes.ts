let _BASE_API_URL = process.env.PUBLIC_API_HOST
if(process.env.NODE_ENV=='development'){
     _BASE_API_URL = 'http://172.20.10.6:3000/api/'
}

type URLinter = {
     backendInit:string

}
const URLS:URLinter = {
     backendInit : _BASE_API_URL+'firebase_firestore_init'
}
export default URLS;