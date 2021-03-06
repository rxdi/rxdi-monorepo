export function Public<T>(): Function {
  const pub = { public: true };
  return (t: any, propKey: string, desc: TypedPropertyDescriptor<any>) => {
    const descriptor = desc;
    const originalMethod = descriptor.value;
    const propertyKey = propKey;
    const self = t;
    descriptor.value = function(...args: any[]) {
      const returnValue = originalMethod.apply(args);
      Object.assign(returnValue, pub);
      return returnValue;
    };
    self.constructor._descriptors = self.constructor._descriptors || new Map();
    self.constructor._descriptors.set(propertyKey, descriptor);
    return descriptor;
  };
}
