import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
const API = axios.create({ baseURL: 'https://eventat-app-backend.vercel.app' });

API.interceptors.request.use(
  async (req) => {
    try {
      const profile = await SecureStore.getItemAsync("profile");
      const parsedProfile = profile ? JSON.parse(profile) : null;

      if (parsedProfile?.token) {
        req.headers.Authorization = `Bearer ${parsedProfile.token}`;
        console.log("Authorization Header:", req.headers.Authorization);
      } else {
        console.warn("Token is missing in profile");
      }
    } catch (error) {
      console.error("Error setting Authorization header:", error);
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

 // Auth 
export const signin =(formData)=>API.post('/auth/login',formData)
export const signup  =(formData)=>API.post('/auth/signup',formData)

// Event
export const showEvents =()=>API.get('/event')
export const createEvent = (formData)=>API.post('/event',formData)


// my events
export const myJoinedEvents =()=>API.get('/event-user/show-my-joined-events')
