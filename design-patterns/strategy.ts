// User type
export interface User {
  id: string;
  provider: 'google' | 'kakao' | 'apple';
  email: string;
}

// Strategy interface
interface AuthStrategy {
  authenticate(token: string): Promise<User>;
}

// Concrete strategies
class GoogleStrategy implements AuthStrategy {
  async authenticate(token: string): Promise<User> {
    // → call Google API, verify token…
    return { id: 'g-123', provider: 'google', email: 'user@google.com' };
  }
}

class KakaoStrategy implements AuthStrategy {
  async authenticate(token: string): Promise<User> {
    // → call Kakao API, verify token…
    return { id: 'k-456', provider: 'kakao', email: 'user@kakao.com' };
  }
}

class AppleStrategy implements AuthStrategy {
  async authenticate(token: string): Promise<User> {
    // → call Apple API, verify token…
    return { id: 'a-789', provider: 'apple', email: 'user@apple.com' };
  }
}

// Context
class AuthService {
  constructor(private strategy: AuthStrategy) {}

  login(token: string) {
    return this.strategy.authenticate(token);
  }
}

// Usage example
async function demo() {
  const token = 'oauth-token';

  console.log(await new AuthService(new GoogleStrategy()).login(token));
  console.log(await new AuthService(new KakaoStrategy()).login(token));
  console.log(await new AuthService(new AppleStrategy()).login(token));
}

demo();
