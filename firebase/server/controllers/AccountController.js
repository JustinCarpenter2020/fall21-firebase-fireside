import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { firebaseService } from '../services/FirebaseService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/firebase-token', this.getFirebaseAuthToken)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getFirebaseAuthToken(req, res, next) {
    try {
      const token = await firebaseService.getFirebaseAuthToken(req.userInfo)
      return res.send({ token })
    } catch (error) {
      next(error)
    }
  }
}
