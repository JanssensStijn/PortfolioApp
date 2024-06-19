import { createContext, FC, ReactNode, useContext } from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firebaseDB } from '../firebase/config';

const ProjectContext = createContext<{ projects: any; loading: boolean; error: string}>({
    projects: [],
    loading: false,
    error: "",
});

export const ProjectProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const collectionId = collection(firebaseDB, "projects");
    const queryItem = query(collectionId, orderBy("order"));
    const [data, loading, error] = useCollectionData(queryItem);
    const errorMessage = error ? error.toString() : "";

    return (
        <ProjectContext.Provider value={{ projects: data, loading, error: errorMessage }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjectsContext = () => useContext(ProjectContext);