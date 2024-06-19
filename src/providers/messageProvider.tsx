import { createContext, FC, ReactNode, useContext } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firebaseDB } from '../firebase/config';

const MessageContext = createContext<{ messages: any; loading: boolean; error: string}>({
  messages: [],
  loading: false,
  error: "",
});

export const MessageProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const collectionId = collection(firebaseDB, "messages");
    const queryItem = query(collectionId, orderBy("createdAt"));
    const [data, loading, error] = useCollectionData(queryItem);
    const errorMessage = error ? error.toString() : "";

    return (
        <MessageContext.Provider value={{ messages: data, loading, error: errorMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessagesContext = () => useContext(MessageContext);