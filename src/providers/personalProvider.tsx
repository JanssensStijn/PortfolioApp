import { createContext, FC, ReactNode, useContext } from 'react';
import { collection, doc, query } from 'firebase/firestore';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { firebaseDB } from '../firebase/config';

const PersonalDataContext = createContext<{ personalData: any; loading: boolean; error: string}>({
    personalData: {},
    loading: false,
    error: "",
});

export const PersonalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const docId = doc(firebaseDB, "personal", "contacts");
    const [data, loading, error] = useDocumentData(docId);
    const errorMessage = error ? error.toString() : "";

    

    return (
        <PersonalDataContext.Provider value={{ personalData: data, loading, error: errorMessage }}>
            {children}
        </PersonalDataContext.Provider>
    );
};

export const usePersonalDataContext = () => useContext(PersonalDataContext);