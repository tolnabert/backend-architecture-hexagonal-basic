export interface ProvideNamePrimaryPort {
  greet: (name: string) => void;
}

export interface StoreGreetingSecondaryPort {
  save: (greeting: string) => void;
}

export class GreetingService implements ProvideNamePrimaryPort {
  constructor(private readonly store: StoreGreetingSecondaryPort) {}

  greet(name: string) {
    const greeting = `Hello, ${name}`;
    this.store.save(greeting);
    return greeting;
  }
}
