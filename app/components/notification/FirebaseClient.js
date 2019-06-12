import FirebaseConstants from "./FirebaseConstants";
import { Alert } from "react-native";

const API_URL = "https://fcm.googleapis.com/fcm/send";

class FirebaseClient {

  async send(body, type) {
		if(FirebaseClient.KEY === 'AAAANtjli84:APA91bFn4vzyjpB2um1TwhXX26KMfdEfwFi0GPXA75hPkGalx_pndRXDuSDbQdIMYE9lbQo9XM1zZoEvVo6dAS-ILEhu7poKOMNu7ctaNad_fqy-y8RR-nxILUd-9hbd7aKNj6gsSS47'){
			Alert.alert('Set your API_KEY in app/FirebaseConstants.js')
			return;
		}
  	let headers = new Headers({
  		"Content-Type": "application/json",
      "Authorization": "key=" + FirebaseConstants.KEY
  	});

		try {
			let response = await fetch(API_URL, { method: "POST", headers, body });
			console.log(response);
			try{
				response = await response.json();
				if(!response.success){
					Alert.alert('Failed to send notification, check error log')
				}
			} catch (err){
				Alert.alert('Failed to send notification, check error log')
			}
		} catch (err) {
			Alert.alert(err && err.message)
		}
  }

}

let firebaseClient = new FirebaseClient();
export default firebaseClient;
