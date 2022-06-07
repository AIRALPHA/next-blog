import React, {createContext, useContext, useEffect, useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, firestore} from "./firebase";
import {doc, onSnapshot} from "@firebase/firestore";
import {User} from "@firebase/auth";

interface userContext {
  user: User | null | undefined,
  username: string | null
}

const UserContext = createContext<userContext>({user: null, username: null});

export const UserProvider = ({children}: {children: React.ReactElement[]}) => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;
    if(user) {
      const ref = doc(firestore, 'users', user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
      })
    } else {
      setUsername(null);
    }
    return unsubscribe;
  }, [user]);


  const value = {
    user,
    username
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const {user, username} = useContext(UserContext);
  return {user, username};
}
