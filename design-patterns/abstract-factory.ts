// Abstract Factory
interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// Abstract Product
interface Button {
  render(): void;
}

interface Checkbox {
  render(): void;
}

// Concrete Factory
class IOSUIFactory implements UIFactory {
  createButton(): Button {
    return new IOSButton();
  }

  createCheckbox(): Checkbox {
    return new IOSCheckbox();
  }
}

class AndroidUIFactory implements UIFactory {
  createButton(): Button {
    return new AndroidButton();
  }

  createCheckbox(): Checkbox {
    return new AndroidCheckbox();
  }
}

class WebUIFactory implements UIFactory {
  createButton(): Button {
    return new WebButton();
  }

  createCheckbox(): Checkbox {
    return new WebCheckbox();
  }
}

// Concrete Product
class IOSButton implements Button {
  render(): void {
    console.log('IOS Button');
  }
}

class IOSCheckbox implements Checkbox {
  render(): void {
    console.log('IOS Checkbox');
  }
}

class AndroidButton implements Button {
  render(): void {
    console.log('Android Button');
  }
}

class AndroidCheckbox implements Checkbox {
  render(): void {
    console.log('Android Checkbox');
  }
}

class WebButton implements Button {
  render(): void {
    console.log('Web Button');
  }
}

class WebCheckbox implements Checkbox {
  render(): void {
    console.log('Web Checkbox');
  }
}

// Client
type OS = 'ios' | 'android' | 'web';
const os = 'android' as OS;

const uiFactory: UIFactory = ((): UIFactory => {
  switch (os) {
    case 'ios':
      return new IOSUIFactory();
    case 'android':
      return new AndroidUIFactory();
    case 'web':
      return new WebUIFactory();
  }
})();

const button = uiFactory.createButton();
const checkbox = uiFactory.createCheckbox();

button.render();
checkbox.render();
