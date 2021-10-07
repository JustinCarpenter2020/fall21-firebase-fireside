import { AppState } from '../AppState'
import { Post } from '../Models/Post'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class PostsService {
  async getAll() {
    const res = await api.get('api/posts')
    AppState.posts = res.data.map(p => new Post(p))
    logger.log(AppState.posts)
  }

  async create(body) {
    const res = await api.post('api/posts', body)
    AppState.posts.push(new Post(res.data))
  }
}

export const postsService = new PostsService()
