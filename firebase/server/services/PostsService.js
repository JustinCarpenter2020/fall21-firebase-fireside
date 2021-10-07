import { dbContext } from '../db/DbContext'

class PostsService {
  async getAll(query = {}) {
    return await dbContext.Posts.find(query).populate('creator')
  }

  async create(body) {
    return await dbContext.Posts.create(body)
  }
}

export const postService = new PostsService()
