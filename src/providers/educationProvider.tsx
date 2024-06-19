import { createContext, FC, ReactNode, useContext } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firebaseDB } from '../firebase/config';

const EducationContext = createContext<{ educations: any; loading: boolean; error: string}>({
    educations: [],
  loading: false,
  error: "",
});

export const EducationProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const collectionId = collection(firebaseDB, "education");
    const queryItem = query(collectionId);
    const [data, loading, error] = useCollectionData(queryItem);
    const errorMessage = error ? error.toString() : "";

    return (
        <EducationContext.Provider value={{ educations: data, loading, error: errorMessage }}>
            {children}
        </EducationContext.Provider>
    );
};

export const useEducationContext = () => useContext(EducationContext);