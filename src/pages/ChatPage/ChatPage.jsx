import { useContext, useEffect, useState } from "react";
import "./ChatPage.scss";
import UsersList from "../../components/features/UsersList/UsersList";
import { fetchUsers } from "../../services/api";
import UserChat from "../../components/features/UserChat/UserChat";
import { connectToWS } from "../../services/websocket";
import ChatContext from "../../context/ChatContext";

function ChatPage() {
  const [usersList, setUsersList] = useState([]);
  const { chatPartner, chatMessages, setChatMessages } =
    useContext(ChatContext);

  const receivedUserMessage = (message) => {
    message.messageId = chatMessages.length;
    setChatMessages((chatMessages) => [...chatMessages, message]);
  };

  useEffect(() => {
    console.log("Connection to WebSocket Server.....");
    const userId = sessionStorage.getItem("userId");
    connectToWS(userId, receivedUserMessage);
  }, []);

  useEffect(() => {
    const fetchUsersList = async () => {
      const users = await fetchUsers();
      setUsersList(users);
      console.log(`userslist : ${JSON.stringify(users)}`);
    };

    fetchUsersList();
  }, []);

  return (
    <>
      {usersList.length == 0 ? (
        <div> Fetching Users</div>
      ) : (
        <div className="chatpage">
          {/* <div className="app-header">{"Chat Mate"}</div> */}
          <UsersList usersList={usersList} />
          <UserChat />
        </div>
      )}
    </>
  );
}

export default ChatPage;
