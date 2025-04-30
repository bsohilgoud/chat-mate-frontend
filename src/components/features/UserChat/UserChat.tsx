import { useContext } from "react";
import ChatBox from "./ChatBox/ChatBox";
import ChatContext from "../../../context/ChatContext";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatConversation from "./ChatConversation";
import { saveNewPrivateMessage } from "../../../services/api";

function UserChat() {
  const { chatPartner, setChatMessages } = useContext(ChatContext);

  const sendChatMessage = async (newMessage) => {
    const savedMessage = await saveNewPrivateMessage(
      chatPartner.userId,
      newMessage,
    );
    console.log(savedMessage);
    setChatMessages((chatMessages) => [...chatMessages, savedMessage]);
  };

  if (chatPartner === undefined || chatPartner === null) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="user-chat"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <ChatHeader chatPartner={chatPartner} />
      <ChatConversation />
      <ChatBox sendChatMessage={sendChatMessage} />
    </div>
  );
}

export default UserChat;
