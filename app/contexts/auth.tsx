"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { fetchStudentData, fetchTeacherData } from "../services";

export const AuthStateContext = createContext(null);
export const AuthDispatchContext = createContext(null);

const defaultState = {
  isAuthLoading: true,
  isAuthenticated: false,
  currentUser: null,
  role: "",
  classMeet: {
    meetingCode: null,
    batchId: null,
    courseId: null,
  },
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_AUTHLOADING":
      return {
        ...state,
        isAuthLoading: payload,
      };

    case "SET_CURRENTUSER":
      return {
        ...state,
        isAuthenticated: true,
        currentUser: payload,
      };

    case "SET_CURRENTUSER_ROLE":
      return {
        ...state,
        role: payload,
      };

    case "REMOVE_CURRENTUSER":
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
      };

    case "UPDATE_PROFILE":
      return {
        ...state,
        currentUser: payload,
      };

    case "UPDATE_CLASSMEET":
      return {
        ...state,
        classMeet: payload,
      };

    default:
      throw new Error(`${type} is not a valid action`);
  }
};

const studentMetaData = {};
const teacherMetaData = {};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  async function fetchCurrentStudent(studentMetaData) {
    try {
      const data = await fetchStudentData(studentMetaData);
      dispatch({ type: "SET_CURRENTUSER", payload: data });
      dispatch({ type: "SET_CURRENTUSER_ROLE", payload: "student" });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "SET_AUTHLOADING", payload: false });
    }
  }
  async function fetchCurrentTeacher(teacherMetaData) {
    try {
      const data = await fetchTeacherData(teacherMetaData);
      dispatch({ type: "SET_CURRENTUSER", payload: data });
      dispatch({ type: "SET_CURRENTUSER_ROLE", payload: "teacher" });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "SET_AUTHLOADING", payload: false });
    }
  }

  useEffect(() => {
    if (studentMetaData) {
      fetchCurrentStudent(studentMetaData);
    } else if (teacherMetaData) {
      fetchCurrentTeacher(teacherMetaData);
    } else {
      dispatch({ type: "SET_AUTHLOADING", payload: false });
    }
  }, []);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {!state.isAuthLoading && children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);
