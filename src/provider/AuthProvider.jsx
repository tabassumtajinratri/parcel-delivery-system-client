import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../axiosInstance/useAxiosPublic";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const AxiosPublic = useAxiosPublic();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('user');

  const registerWithEmailPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithEmailPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const loginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const updateUserProfile = (profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profile);
  };

  

  const logOut = () => {
    setLoading(true);
    signOut(auth);
  };

 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      AxiosPublic.get(`/users/${currentUser?.email}`)
      .then((res) => {
        setUserType(res.data.userType);
        console.log(res.data.userType);
        
      });

      if (currentUser) {
        const userEmail = currentUser?.email || user?.email;
        const userInfo = { email: userEmail };
        AxiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authProps = {
    user,
    loading,
    registerWithEmailPassword,
    loginWithEmailPassword,
    loginWithGoogle,
    updateUserProfile,
    logOut,
    userType,
  };

  return (
    <AuthContext.Provider value={authProps}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
