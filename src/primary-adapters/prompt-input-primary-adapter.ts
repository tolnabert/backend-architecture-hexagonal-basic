import PromptSync from 'prompt-sync';
import { ProvideNamePrimaryPort } from '../business/greeting-service';

export function runPromptApp(greetingService: ProvideNamePrimaryPort) {
  const prompt = PromptSync();
  let input: string | null = null;

  do {
    input = prompt('Please provide a name: ');
    if (typeof input === 'string' && input.length > 1)
      greetingService.greet(input);
  } while (input !== null && input.length < 1);
}
