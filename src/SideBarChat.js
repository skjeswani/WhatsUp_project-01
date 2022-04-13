import { Avatar } from "@material-ui/core";
import { addDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import roomRef from "./DataInfo";
import "./SideBar.css";
import "./SideBarChat.css";
import { Link } from "react-router-dom";
import {
  collection,
  docs,
  doc,
  onSnapshot,
  serverTimestamp,
  orderBy,
  getDocs,
  query,
} from "firebase/firestore";

// import { color } from "@mui/system";

function SideBarChat({ id, name, addNewChat }) {
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      const docRef = doc(roomRef, id);
      const messageRef = collection(docRef, "messages");
      const q = query(messageRef, orderBy("timestamp", "asc"));

      onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    }
  }, [id]);

  // useEffect(() => {
  //   setSeed(Math.floor(Math.random() * 5000));
  // }, []);

  const createChat = () => {
    const roomName = prompt("Please enter the room name");

    if (roomName) {
      addDoc(roomRef, { name: roomName });
    }
  };

  return !addNewChat ? (
    <Link
      to={`/rooms/${id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} />
        <div className="chat_info">
          <h2>{name}</h2>
          <p>{messages[messages.length - 1]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SideBarChat;
