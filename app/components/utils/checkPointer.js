import AsyncStorage from '@react-native-community/async-storage';

const POINTER = '0';

function newPointer() {
  AsyncStorage.setItem('POINTER', '0');
}

export default async function checkPointer() {
  try {
    const hadPointer = await AsyncStorage.getItem('POINTER');
    if (hadPointer === null) {
      newPointer();
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
