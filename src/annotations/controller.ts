export default (setting: { name: string; path: string }): ClassDecorator => Reflect.metadata('Controller', setting);
