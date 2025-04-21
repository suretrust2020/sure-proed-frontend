import { createContext, useContext, useEffect, useReducer } from "react";
import {
  fetchStudentBatches,
  fetchTeacherBatches,
  fetchTeacherCourses,
} from "../services";
import { useAuthState } from "./auth";
import axios from "axios";
export const ChatStateContext = createContext();
export const ChatDispatchContext = createContext();

// dynamic endpoint based on running environment
const NODE_BACKEND_URL =
  import.meta.env.REACT_APP_NODE_ENV === "development"
    ? import.meta.env.REACT_APP_NODE_DEV_BASEURL
    : import.meta.env.REACT_APP_NODE_PROD_BASEURL;

const CHAT_URL = `${NODE_BACKEND_URL}/api/chat`;

const defaultState = {
  activeChat: null,
  courses: [],
  batches: [],
  loading: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_BATCHES":
      return {
        ...state,
        batches: payload,
      };

    case "SET_COURSES":
      return {
        ...state,
        courses: payload,
      };
    case "SET_ACTIVE_CHAT":
      return {
        ...state,
        activeChat: payload,
      };

    case "SET_MESSAGES":
      return {
        ...state,
        activeChat: {
          ...state.activeChat,
          messages: payload,
        },
      };

    case "SET_ROOM_ID":
      return {
        ...state,
        activeChat: {
          ...state.activeChat,
          roomId: payload,
        },
      };
    case "ADD_MESSAGE":
      return {
        ...state,
        activeChat: {
          ...state.activeChat,
          messages: [...state.activeChat.messages, payload],
        },
      };

    case "REMOVE_MESSAGE":
      let filterMsg = state.activeChat.messages.filter(
        (msg) => msg._id !== payload
      );
      return {
        ...state,
        activeChat: {
          ...state.activeChat,
          messages: [...filterMsg],
        },
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: payload,
      };

    default:
      throw new Error(`${type} is nat a valid action`);
  }
};

export const ChatProvider = ({ children }) => {
  // const socketRef = useRef();
  const { role, isAuthenticated } = useAuthState();
  const [state, dispatch] = useReducer(reducer, defaultState);
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (role === "teacher") {
      handleFetchTeacherCourses();
    }

    if (role === "student") {
      handleFetchStudentBatches();
    }
  }, [role, isAuthenticated]);

  async function handleFetchTeacherCourses() {
    dispatch({ type: "SET_LOADING", payload: "fetching-courses" });
    try {
      const courses = await fetchTeacherCourses();

      dispatch({ type: "SET_COURSES", payload: courses });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: "" });
    }
  }

  async function handleFetchStudentBatches() {
    dispatch({ type: "SET_LOADING", payload: "fetching-batches" });

    try {
      const batches = await fetchStudentBatches();
      dispatch({ type: "SET_BATCHES", payload: batches });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: "" });
    }
  }

  async function handleFetchBatches(courseId) {
    dispatch({ type: "SET_BATCHES", payload: [] });
    dispatch({ type: "SET_LOADING", payload: "fetching-batches" });

    try {
      const batches = await fetchTeacherBatches(courseId);
      dispatch({ type: "SET_BATCHES", payload: batches });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: "fetching" });
    }
  }

  async function handleFetchMessages(batch) {
    dispatch({ type: "SET_LOADING", payload: "fetching-messages" });

    dispatch({
      type: "SET_ACTIVE_CHAT",
      payload: batch,
    });
    try {
      const res = await axios.get(`/${batch.course.id}/${batch.id}/`, {
        baseURL: CHAT_URL,
      });
      dispatch({
        type: "SET_MESSAGES",
        payload: res.data,
      });
      const roomId = `class-c-${batch.course.id}-b-${batch.id}`;

      dispatch({
        type: "SET_ROOM_ID",
        payload: roomId,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: "" });
    }
  }

  async function handleSentMessage(roomId, data) {
    dispatch({ type: "SET_LOADING", payload: "sending-message" });

    try {
      const res = await axios.post(`/${roomId}`, data, {
        baseURL: CHAT_URL,
      });

      dispatch({
        type: "ADD_MESSAGE",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: "" });
    }
  }

  async function deleteMessage(msgId) {
    dispatch({ type: "SET_LOADING", payload: "removing-message" });

    try {
      const res = await axios.delete(`/${msgId}`, { baseURL: CHAT_URL });
      if (res.data?.acknowledged) {
        dispatch({ type: "REMOVE_MESSAGE", payload: msgId });
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "SET_LOADING", payload: "" });
    }
  }
  return (
    <ChatStateContext.Provider value={state}>
      <ChatDispatchContext.Provider
        value={{
          handleFetchBatches,
          handleFetchMessages,
          handleSentMessage,
          deleteMessage,
        }}
      >
        {children}
      </ChatDispatchContext.Provider>
    </ChatStateContext.Provider>
  );
};

export const useChatState = () => useContext(ChatStateContext);
export const useChatDispatch = () => useContext(ChatDispatchContext);
