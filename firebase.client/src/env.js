
export const dev = window.location.origin.includes('localhost')

export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = false
export const domain = 'dev-elomoai1.us.auth0.com'
export const audience = 'https://the-network/'
export const clientId = 'GwuDg9rqGRNpSGeEJF1DzrW30AND1bxO'

// NOTE you get this when you create a new app in firebase
export const firebaseConfig = {
  apiKey: 'AIzaSyB-A-563WGlQV67ZwtANqwSpnIbz3VEZ_Y',
  authDomain: 'storage-a3abe.firebaseapp.com',
  projectId: 'storage-a3abe',
  storageBucket: 'storage-a3abe.appspot.com',
  messagingSenderId: '52852852088',
  appId: '1:52852852088:web:d657a8141e7521e344b48d',
  measurementId: 'G-HKRZP0P3G0'
}
