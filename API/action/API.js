import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
const API = axios.create({ baseURL: 'https://eventat-app-backend.vercel.app' });


API.interceptors.request.use(async (req) => {
  try {
    const profile = await SecureStore.getItemAsync("profile");
    
    // Parse profile if it's stored as a string
    const parsedProfile = profile ? JSON.parse(profile) : null;

    if (parsedProfile?.token) {
      req.headers.Authorization = `Bearer ${parsedProfile.token}`;
    } else {
      console.error('Token is missing in profile');
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
  return req;
});

 // Auth 
export const signin =(formData)=>API.post('/auth/login',formData)
export const signup  =(formData)=>API.post('/auth/signup',formData)

// Event
export const  showEvents =()=>API.get('/event')
export const createEvent = (formData)=>API.post('/event',formData)

// Event user
export const joinEvent = (id)=>API.patch(`/event-user/${id}`)
export const myJoinedEvents =()=>API.get('/event-user/show-my-joined-events')
export const showMyCreatedEvents =()=>API.get('/event-user/show-my-created-events')
export const checkIfUserJoinedEvent = (eventId)=>API.get(`/event-user/joined/${eventId}`)
export const leaveEvent = (eventId)=>API.delete(`/event-user/${eventId}`)

// Club
export const allClubs =()=>API.get('/club')
export const findOneClub =(id)=>API.get(`/club/${id}`)

// Club Events
export const showClubEvents =(clubId)=>API.get(`/club-event/${clubId}`)

