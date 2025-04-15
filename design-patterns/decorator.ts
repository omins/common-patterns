interface Logger {
  logEvent(eventName: string, data: any): void;
}

class BaseLogger implements Logger {
  logEvent(eventName: string, data: any): void {
    // noop
  }
}

class LoggerDecorator implements Logger {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  logEvent(eventName: string, data: any): void {
    this.logger.logEvent(eventName, data);
  }
}

class GALoggerDecorator extends LoggerDecorator {
  logEvent(eventName: string, data: any): void {
    super.logEvent(eventName, data);
    console.log(`[GA] Event: ${eventName}`, data);
  }
}

class FBPixelLoggerDecorator extends LoggerDecorator {
  logEvent(eventName: string, data: any): void {
    super.logEvent(eventName, data);
    console.log(`[FB] Event: ${eventName}`, data);
  }
}

class TikTokPixelLoggerDecorator extends LoggerDecorator {
  logEvent(eventName: string, data: any): void {
    super.logEvent(eventName, data);
    console.log(`[TikTok] Event: ${eventName}`, data);
  }
}

let logger: Logger;

logger = new BaseLogger();
logger = new GALoggerDecorator(logger);
logger = new FBPixelLoggerDecorator(logger);
logger = new TikTokPixelLoggerDecorator(logger);
logger.logEvent('click_login', { page: 'login' });
console.log('--------------------------------');
logger.logEvent('login_success', { page: 'login', userId: '123' });
