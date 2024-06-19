import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import {
    FC,
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { firebaseAuth } from "../firebase/config";
  
  export type UserContextType = {
    user?: User;
    isLoading: boolean;
    signin: (
      email: string,
      password: string
    ) => Promise<{ user?: User; error?: string }>;
    logout: () => Promise<void>;
  };
  
  const UserContext = createContext<UserContextType>({
    signin: async () => ({}),
    logout: async () => {},
    isLoading: true,
  });
  
  export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      onAuthStateChanged(firebaseAuth, (user) => {
        setIsLoading(false);
        if (user) {
          setUser(user);
        } else {
          setUser(undefined);
        }
      });
    }, []);
  
    const signin = async (
      email: string,
      password: string
    ): Promise<{ user?: User; error?: string }> => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );
  
        setUser(userCredential.user);
  
        return { user: userCredential.user };
      } catch (error) {
        console.error(error);
  
        return { error: (error as { message: string; code: string }).message };
      }
    };
  
    const logout = async () => {
      await firebaseAuth.signOut();
      setUser(undefined);
    };
  
    const value: UserContextType = { user, isLoading, signin, logout };
  
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
  };
  
  export const useUserContext = (): UserContextType => {
    return useContext(UserContext);
  };
  