import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

export const url = "https://api.nsift.tech";

const API = Axios.create({ baseURL: url });

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("@token");
    if (value !== null) {
      return value;
    }
    return null;
  } catch (e) {}
};

API.interceptors.request.use(async (req) => {
  const token = await getToken();
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }

  return req;
});

export const registerNewExpoToken = async (body) =>
  API.post(`${url}/new/expo-token`, body);

export const fetchUserRequests = async () => API.get(`${url}/data/requests`);
export const fetchUserAllRequests = async () =>
  API.get(`${url}/requests/history`);
export const fetchUserPendingRequest = async () =>
  API.get(`${url}/requests/pending`);
export const sendOtp = async (phone) => API.get(`${url}/send-otp/${phone}`);
export const sendEmailOtp = async (email) =>
  API.get(`${url}/reset-otp/${email}`);
export const verifyEmailOtp = async (email, password, otp) =>
  API.post(`${url}/reset-password`, { email, password, otp });
export const verifyOtp = async (phone, otp) =>
  API.get(`${url}/verify-otp/${phone}/${otp}`);
export const registerUser = async (body) =>
  API.post(`${url}/new/resident`, body);
export const signIn = async (body) => API.post(`${url}/login`, body);
export const acceptRequest = async (id) =>
  API.get(`${url}/request/accept/${id}`);

export const rejectRequest = async (id) =>
  API.get(`${url}/request/reject/${id}`);

export const fetchUserStats = async () => API.get(`${url}/data/stats`);
