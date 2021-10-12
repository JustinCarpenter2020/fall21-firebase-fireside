import { storage } from '../utils/FireBaseHandler'

class FireBaseLogic {
  async upload(name, data, type) {
    if (type === 'image') {
      // NOTE creates a collection in firebase storage with the pathing images => imagename.png
      const collection = storage.ref('Images/' + name + '.png')

      // Take that pathing and put the data we have there
      const snapshot = await collection.put(data)

      // snapshot is that data so now we will take that data and get a downloadable url from it, this is a method from firebase
      const url = await snapshot.ref.getDownloadURL()

      return url
    } else {
      const collection = storage.ref('Videos/' + name + '.mp4')
      const snapshot = await collection.put(data)
      const url = await snapshot.ref.getDownloadURL()
      return url
    }
  }
}

export const fireBaseLogic = new FireBaseLogic()
