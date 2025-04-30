import { useContext, useEffect, useState } from "react";
import "./ChatPage.scss";
import { fetchLastConversations } from "../../services/api";
import UserChat from "../../components/features/UserChat/UserChat";
import { connectToWS } from "../../services/websocket";
import ChatContext from "../../context/ChatContext";
import { useNavigate } from "react-router-dom";
import ChatUsers from "../../components/features/UsersList/ChatUsers/ChatUsers";

function ChatPage() {
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const { chatMessages, setChatMessages } = useContext(ChatContext);

  const receivedUserMessage = (message) => {
    message.messageId = chatMessages.length;
    setChatMessages((chatMessages) => [...chatMessages, message]);
  };

  useEffect(() => {
    console.log("Connection to WebSocket Server.....");
    const userId = sessionStorage.getItem("userId");
    if (userId == undefined) navigate("/login");
    else connectToWS(userId, receivedUserMessage);
  }, []);

  useEffect(() => {
    const fetchUsersList = async () => {
      const users = await fetchLastConversations();
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
          <ChatUsers lastConversations={usersList} />
          <UserChat />
        </div>
      )}
    </>
  );
}

export default ChatPage;
