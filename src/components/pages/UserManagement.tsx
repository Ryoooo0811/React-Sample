/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useCallback, useEffect } from "react";
import { Center, Spinner, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react";

import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../organisms/user/UserDetailModal";
import { useSelectUsers } from "../../hooks/useSelectUsers";

export const UserManagement: FC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users, loading } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUsers();
  
  
  useEffect(() => getUsers(), [])

  const onClickUser = useCallback((id: number) => {
    onSelectUser({ id, users, onOpen });
    onOpen()
  }, [users, onSelectUser, onOpen]);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }} justify="space-around">
            {users.map((user) => (
              <WrapItem key={user.id}>
                <UserCard id={user.id} imageUrl="https://source.unsplash.com/featured" userName={user.username} fullName={user.name} onClick={onClickUser} />
              </WrapItem>
            ))}
        </Wrap>
      )}
      <UserDetailModal user={selectedUser} isOpen={isOpen} onClose={onClose} />
    </>
  );
});