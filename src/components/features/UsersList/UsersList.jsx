import ChatUsers from "./ChatUsers/ChatUsers";

const UsersList = ({ usersList }) => {
  return (
    <>
      <ChatUsers usersList={usersList} />
    </>
  );
};

export default UsersList;
