import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3000' });

API.interceptors.request.use((req) => {
  const profile = JSON.parse(localStorage.getItem('profile')); // Retrieve profile from localStorage
  if (profile?.token) {
    req.headers.Authorization = `Bearer ${profile.token}`;
    console.log('Authorization Header:', req.headers.Authorization);
  } else {
    console.error('Token is missing in profile');
  }
  return req;
});

 // Auth 
export const signin =(formData)=>API.post('/auth/login',formData)
export const signup  =(formData)=>API.post('/auth/signup',formData)

// Event
export const showEvents =()=>API.get('/event')
