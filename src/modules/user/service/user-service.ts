import { User } from '@/entity/User';

class UserService {
  public async login(requestData) {
    const { userID, password, nickName, avatarPath } = requestData;
    const isExistedUser = await User.findOne({
      where: { userID }
    });

    
    if(!isExistedUser) {
      this.register(requestData);
    }
    console.log('----- 登录操作 -----');
    
    const user = new User();


  }

  public async register(requestData) {
    console.log('----- 注册操作 -----');
    const { userID, password, nickName, avatarPath } = requestData;
    const user = new User();

    // todo: password 校验
    // todo: password 哈希化存储

    user.userID = userID;
    user.password = password;
    user.nickName = nickName;
    user.avatarPath = avatarPath;

    user.save();

    return true;
  }
}

export default UserService;
