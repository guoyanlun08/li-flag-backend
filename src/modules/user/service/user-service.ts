import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '@/entity/User';
import MyError from '@/common/my-error';
import { LoginReqData, RegisterReqData, UpdateUserInfoReqData } from '../types/index';
import { CallerInfo } from '@/middleware/authMiddleware';

class UserService {
  /** 登录 */
  public async login(requestData: LoginReqData) {
    const { userId, password } = requestData;

    const user = await User.findOne({
      where: { userId },
    });

    if (!user) {
      throw new MyError('账号不存在');
    }

    // 检查密码是否匹配
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new MyError('账号密码不匹配');
    }

    user.lastOnlineTime = new Date();
    await user.save();

    const token = jwt.sign({ userId: user.userId }, 'login-token-key', {
      expiresIn: '14 days',
    });
    const userInfo = { ...user };
    delete userInfo.password;

    return {
      token,
      userInfo,
    };
  }
  /** 注册逻辑 */
  public async register(requestData: RegisterReqData) {
    const { userId, password, repeatPassword } = requestData;

    const isExistedUser = await User.findOne({
      where: { userId },
    });

    if (isExistedUser) {
      throw new MyError('账号已存在');
    }

    if (password !== repeatPassword) {
      throw new MyError('密码不一致');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await User.save({
      userId,
      nickName: `用户${userId}`,
      password: hashPassword,
      lastOnlineTime: new Date(),
    });

    return {
      message: '注册成功',
    };
  }

  /** 获取用户信息 */
  public async getUserInfo(caller: CallerInfo) {
    const { userId } = caller;

    const user = await User.findOneBy({ userId });
    const userInfo = { ...user };

    delete userInfo.password;
    return {
      userInfo,
    };
  }

  /** 更新用户信息 */
  public async updateUserInfo(requestData: UpdateUserInfoReqData) {
    const { userId, ...updateValue } = requestData;
    console.log('updateValue==', updateValue);

    const user = await User.findOne({
      where: { userId },
    });

    if (!user) {
      throw new MyError('未传递 userId');
    }

    delete updateValue.repeatPassword;

    const { affected } = await User.update(user.userId, updateValue);
    if (!affected) {
      throw new MyError(`更新 userId: ${userId} 失败`);
    }

    return {
      message: `更新用户: ${userId} 成功`,
    };
  }
}

export default UserService;
