import { storage } from '../env'
class FireBaseLogic {
  async upload(name, data, type) {
    // NOTE creates a collection in firebase storage with the pathing images => imagename.png

    if (type === 'img') {
      const collection = storage.ref('Images/' + name + '.png')
      const snapshot = await collection.put(data)
      const url = await snapshot.ref.getDownloadURL()
      return url
    } else {
      const collection = storage.ref('Videos/' + name + '.mp4')
      const snapshot = await collection.put(data)
      const url = await snapshot.ref.getDownloadURL()
      return url
    }

    // Take that pathing and put the data we have there
    // const snapshot = await collection.put(data)

    // snapshot is that data so now we will take that data and get a downloadable url from it, this is a method from firebase
    // const url = await snapshot.ref.getDownloadURL()

    // snapshot will have additional info about the image, where it came from, it's name we assigned it, etc. If you want this data return that as well
    // logger.log(url, snapshot)
    // return url
  }
}

export const fireBaseLogic = new FireBaseLogic()
