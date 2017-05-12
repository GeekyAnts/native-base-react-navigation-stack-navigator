// A basic, minimalist EventEmitter

// Subscription { remove() {} }

export default class EventEmitter {
  constructor() {
    this.registry = {};
  }

  addListener(eventType, listener) {
    if (!this.registry[eventType]) {
      this.registry[eventType] = [];
    }
    this.registry[eventType].push(listener);
    return { remove: () => this.removeListener(eventType, listener) };
  }

  once(eventType, listener, context) {
    const h = (...args) => {
      result.remove();
      listener.apply(context, args);
    };
    const result = this.addListener(eventType, h);
    return result;
  }

  removeAllListeners(eventType) {
    this.registry[eventType] = [];
  }

  // eslint-disable-next-line class-methods-use-this
  removeSubscription(subscription) {
    subscription.remove();
  }

  listeners(eventType) {
    return this.registry[eventType];
  }

  emit(eventType, ...args) {
    const events = this.registry[eventType];
    if (!events) return;
    events.forEach(handler => handler(...args));
  }

  removeListener(eventType, listener) {
    const events = this.registry[eventType];
    if (!events) return;
    const index = events.indexOf(listener);
    if (index === -1) return;
    events.splice(index, 1);
    if (events.length === 0) {
      delete this.registry[eventType];
    }
  }
}
