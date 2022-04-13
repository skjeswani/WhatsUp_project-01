import { collection } from "firebase/firestore";
import db from "./firebase";

const roomRef = collection(db, "rooms");
// const messageRef = roomRef

export default roomRef;
