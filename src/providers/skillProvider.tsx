import { createContext, FC, ReactNode, useContext } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firebaseDB } from '../firebase/config';

const SkillContext = createContext<{ skills: any; loading: boolean; error: string}>({
  skills: [],
  loading: false,
  error: "",
});

export const SkillProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const collectionId = collection(firebaseDB, "skills");
    const queryItem = query(collectionId);
    const [data, loading, error] = useCollectionData(queryItem);
    const errorMessage = error ? error.toString() : "";

    return (
        <SkillContext.Provider value={{ skills: data, loading, error: errorMessage }}>
            {children}
        </SkillContext.Provider>
    );
};

export const useSkillContext = () => useContext(SkillContext);