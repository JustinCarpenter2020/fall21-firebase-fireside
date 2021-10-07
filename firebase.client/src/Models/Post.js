export class Post {
  constructor(postData = {}) {
    this.id = postData.id || postData._id || ''
    this.body = postData.body || ''
    this.imgUrl = postData.imgUrl || null
    this.videoUrl = postData.videoUrl || null
  }
}
