export default (
  setting: {
    method: string; // 路由方法 按理来讲这里应该设置枚举
    path: string; // 路由上下文
  } = {
    method: '',
    path: '',
  },
) => Reflect.metadata('Router', setting);
