import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '@/entity/User';

class UserService {
  public async login(requestData) {
    const { userId, password } = requestData;

    const user = await User.findOne({
      where: { userId },
    });

    if (!user) {
      throw new Error('账号不存在');
    }

    // 检查密码是否匹配
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error('账号密码不匹配');
    }

    user.lastOnlineTime = new Date();
    await user.save();

    const token = jwt.sign({ userId: user.userId }, 'login-token-key', {
      expiresIn: '14 days',
    });

    return {
      token,
      user,
    };
  }
  /**
   * 注册逻辑
   */
  public async register(requestData: { userId: string; password: string; repectPassword: string }) {
    const { userId, password, repectPassword } = requestData;

    const isExistedUser = await User.findOne({
      where: { userId },
    });

    if (isExistedUser) {
      throw new Error('账号已存在');
    }

    if (password !== repectPassword) {
      throw new Error('密码不一致');
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
}

export default UserService;
