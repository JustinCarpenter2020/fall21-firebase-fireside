export class Post {
  constructor(postData = {}) {
    this.id = postData.id || postData._id || ''
    this.body = postData.body || ''
    this.mediaUrl = postData.mediaUrl || null
  }
}
