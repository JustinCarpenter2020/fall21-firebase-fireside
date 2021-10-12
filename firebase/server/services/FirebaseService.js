import firebaseAdmin from 'firebase-admin'
// NOTE we create this json file on firebase under project settings, service accounts, generate new private key. Treat this file as the keys to your castle MAKE SURE IT IS GITIGNORED
const firebaseAccountKey = require('../../firebase.env.json')

class FirebaseService {
  constructor() {
    // Take our firebaseAdmin instance and we then supply it with our account key.
    firebaseAdmin.initializeApp({
      // @ts-ignore
      credential: firebaseAdmin.credential.cert(firebaseAccountKey)
    })
  }

  async getFirebaseAuthToken(user) {
    // Takes in an auth0 user object and creates a custom Firebase token!
    const firebaseToken = await firebaseAdmin.auth().createCustomToken(user.id)
    return firebaseToken
  }
}

export const firebaseService = new FirebaseService()
