import { ReplaySubject } from "rxjs";
import firebase from "firebase/app";

export default class MockAngularFireAuth {
  user = new ReplaySubject<firebase.User>(1);
  signInWithPopup = () => Promise.resolve();
  onAuthStateChanged = () => Promise.resolve();
  auth = {};
}
