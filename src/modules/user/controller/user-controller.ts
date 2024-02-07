import UserService from '../service/user-service';
import { controller, router } from '@/annotations';

const userService = new UserService();

@controller({ path: '/user', name: '用户' })
class UserController {
  @router({ method: 'post', path: '/login' })
  public login(ctx) {
    // const {} = ctx.request.query?????
    // await userService().login
  }
}

export default UserController;
