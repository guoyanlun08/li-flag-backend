import { Request, Response } from 'express';

import UserService from '../service/user-service';
import { controller, router } from '@/annotations';

const userService = new UserService();

@controller({ path: '/user', name: '用户' })
class UserController {
  @router({ method: 'post', path: '/login' })
  public async login(req: Request, res: Response) {
    const { body: requestData } = req;

    const result = await userService.login(requestData);

    return result;
  }

  @router({ method: 'post', path: '/register' })
  public async register(req: Request, res: Response) {
    const { body: requestData } = req;

    const result = await userService.register(requestData);

    return result;
  }

  @router({ method: 'get', path: '/getUserInfo' })
  public async getUserInfo(req: Request, res: Response) {
    const { caller } = res.locals;

    const result = await userService.getUserInfo(caller);

    return result;
  }
}

export default UserController;
