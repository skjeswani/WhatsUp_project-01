import { Avatar, IconButton } from "@material-ui/core";
import {
  Chat,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import roomRef from "./DataInfo";
import { onSnapshot } from "firebase/firestore";
import "./SideBar.css";
import SideBarChat from "./SideBarChat";
import { useStatevalue } from "./StateProvider";

function SideBar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStatevalue();

  useEffect(() => {
    const unsubscribe = onSnapshot(roomRef, (snapShot) => {
      setRooms(snapShot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    // const chat = collection(db, "rooms");
    // setRooms(
    //   onSnapshot(chat, (querySnapshot) => {
    //     querySnapshot.docs.map((d) => {
    //       id: d.id;
    //       name: d.data.name;
    //     });
    //   })
    // );

    return () => unsubscribe();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar
          src={user?.photoURL}
          style={{
            height: "40px",
            width: "40px",
          }}
        />
        <div className="header_right">
          <IconButton>
            <DonutLarge
              style={{
                height: "20px",
                width: "20px",
              }}
            />
          </IconButton>
          <IconButton>
            <Chat
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
      <div className="sidebar_search">
        <div className="search_container">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SideBarChat addNewChat={true} />
        {rooms.map((room) => (
          <SideBarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
