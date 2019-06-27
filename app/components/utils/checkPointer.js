import AsyncStorage from '@react-native-community/async-storage';

var POINTER = 0;

function newPointer() {
  AsyncStorage.setItem('POINTER', '0');
}

export default async function checkPointer() {
  try {
    const hadPointer = await AsyncStorage.getItem('POINTER');
    console.log("POINTER",hadPointer);
    if (hadPointer === null) {
      newPointer();
      return 0;
    }
    return parseInt(hadPointer);
  } catch (error) {
    return false;
  }
}
