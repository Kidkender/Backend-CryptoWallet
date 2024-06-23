declare module "zeromq" {
  class Subscriber {
    connect(address: string): void;
    subscribe(topic: string): void;
    on(event: string, listener: (topic: Buffer, message: Buffer) => void): this;
  }

  const _default: {
    Subscriber: typeof Subscriber;
  };

  export default _default;
}
