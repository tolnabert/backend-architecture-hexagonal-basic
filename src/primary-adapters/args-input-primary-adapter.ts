import { ProvideNamePrimaryPort } from '../business/greeting-service';

export function runArgsAppPrimaryAdapter(greetingService: ProvideNamePrimaryPort) {
  const [, , name] = process.argv;
  const greeting = greetingService.greet(name);

  console.log(greeting);
}

// task 6-7-8
// optional repo from Dani, tamagochi app via layers refactor to hexagonal