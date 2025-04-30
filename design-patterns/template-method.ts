export interface User {
  id: string;
  name: string;
}
export interface Product {
  id: string;
  title: string;
  price: number;
}

function mockFetch(url: string, options: RequestInit): Promise<Response> {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ users: [] }),
  } as Response);
}

abstract class ApiClient<T, P = any> {
  // 템플릿 메소드
  async fetch(params: P): Promise<T> {
    this.showLoading(); // 공통 전처리
    const url = this.buildUrl(params); // 가변 단계 #1
    const options = this.buildOptions(params); // 가변 단계 #2
    try {
      const res = await mockFetch(url, options);
      if (!res.ok) throw new Error(res.statusText);
      const raw = await res.json();
      return this.parseResponse(raw); // 가변 단계 #3
    } catch (err: any) {
      return this.handleError(err); // 가변 단계 #4
    } finally {
      this.hideLoading(); // 공통 후처리
    }
  }

  protected showLoading() {
    /* e.g. spinner on */
    console.log('loading...');
  }
  protected hideLoading() {
    /* e.g. spinner off */
    console.log('loaded');
  }

  // abstract methods
  protected abstract buildUrl(params: P): string;
  // default implementation
  protected buildOptions(params: P): RequestInit {
    return {};
  }
  protected abstract parseResponse(raw: any): T;
  // default implementation
  protected handleError(err: any): Promise<T> {
    return Promise.reject(err);
  }
}

class UserClient extends ApiClient<User[], { page: number }> {
  protected buildUrl({ page }: { page: number }) {
    return `/api/users?page=${page}`;
  }
  protected parseResponse(raw: any): User[] {
    return raw.users as User[];
  }

  protected buildOptions() {
    return { headers: { 'X-Auth-Token': 'YOUR_TOKEN_HERE' }, isUser: true };
  }
}

class ProductClient extends ApiClient<Product[], { category: string }> {
  protected buildUrl({ category }: { category: string }) {
    return `/api/products?cat=${encodeURIComponent(category)}`;
  }
  protected buildOptions() {
    return { headers: { 'X-Auth-Token': 'YOUR_TOKEN_HERE' }, isUser: false };
  }
  protected parseResponse(raw: any): Product[] {
    return raw.items as Product[];
  }
}

async function demo() {
  const users = await new UserClient().fetch({ page: 1 });
  console.log('Users:', users);

  const products = await new ProductClient().fetch({ category: 'books' });
  console.log('Products:', products);
}

demo().catch(console.error);
