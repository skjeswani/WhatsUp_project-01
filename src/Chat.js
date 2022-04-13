import { Avatar, IconButton } from "@material-ui/core";
import { useParams } from "react-router-dom";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
  Send,
} from "@mui/icons-material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Chat.css";
import roomRef from "./DataInfo";
import {
  collection,
  docs,
  doc,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
  getDocs,
  query,
} from "firebase/firestore";
import { useStatevalue } from "./StateProvider";

function Chat() {
  const [{ user }, dispatch] = useStatevalue();
  const [input, setInput] = useState("");
  const [roomName, setroomName] = useState("");
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const docRef = doc(roomRef, roomId);
    onSnapshot(docRef, (snapshot) => {
      setroomName(snapshot.data().name);

      const messageRef = collection(docRef, "messages");
      const q = query(messageRef, orderBy("timestamp", "asc"));

      // const order = orderBy(messageRef, "timestamp", "asc");

      onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
    });
  }, [roomId]);

  const sendMessage = (e) => {
    const docRef = doc(roomRef, roomId);
    const messageRef = collection(docRef, "messages");

    addDoc(messageRef, {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    });

    e.preventDefault();
    setInput("");
  };

  //

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}
          style={{
            height: "40px",
            width: "40px",
          }}
        />

        <div className="chat_header_info">
          <h3>{roomName}</h3>
          <p>
            Last Seen{" "}
            {messages.length > 0
              ? messages[messages.length - 1].timestamp?.toDate().toUTCString()
              : "..."}
          </p>
        </div>

        <div className="chat_header_right">
          <IconButton>
            <SearchOutlined
              style={{
                height: "20px",
                width: "20px",
              }}
            />
          </IconButton>
          <IconButton>
            <AttachFile
              style={{
                height: "20px",
                width: "20px",
              }}
            />
          </IconButton>
          <IconButton>
            <MoreVert
              style={{
                height: "20px",
                width: "20px",
              }}
            />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {/* <p className="chat_message">Lorem ipsum dolor</p> */}
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_reciever"
            }`}
          >
            <span className="message_name">{message.name}</span>
            {message.message}
            <span className="message_time">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticon className="icon" />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}></button>
        </form>

        <Mic className="icon" />
      </div>
    </div>
  );
}

export default Chat;
