import { AppState } from '../AppState'
import { fbAuth, storage } from '../utils/FirebaseProvider'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class FirebaseService {
  async upload(name, data, type) {
    let collectionType = ''
    switch (type) {
      case 'image':
        collectionType = 'Images'
        break
      case 'video':
        collectionType = 'Videos'
        break
    }
    const collection = storage.ref(collectionType)
    const resource = collection.child(data.name)
    // const resource = collection.child(AppState.account.id).child(name).child(data.name)
    const snapshot = await resource.put(data, {
      customMetadata: {
        uid: AppState.account.id, size: data.size, type: data.type
      }
    })
    const url = await snapshot.ref.getDownloadURL()
    return url

    // if (type === 'image') {
    //   // NOTE creates a collection in firebase storage with the pathing images => imagename.png
    //   const collection = storage.ref('Images/' + name + '.png')

    //   // Take that pathing and put the data we have there
    //   const snapshot = await collection.put(data, { uid: AppState.account.id })

    //   // snapshot is that data so now we will take that data and get a downloadable url from it, this is a method from firebase
    //   const url = await snapshot.ref.getDownloadURL()

    //   return url
    // } else {
    //   const collection = storage.ref('Videos/' + name + '.mp4')
    //   const snapshot = await collection.put(data)
    //   const url = await snapshot.ref.getDownloadURL()
    //   return url
    // }
  }

  async login() {
    try {
      const res = await api.get('/account/firebase-token')
      const firebaseAuthToken = res.data.token
      await fbAuth.signInWithCustomToken(firebaseAuthToken)
    } catch (e) {
      logger.error('[FIREBASE_AUTH] unable to authenticate', e)
    }
  }
}

export const firebaseService = new FirebaseService()
