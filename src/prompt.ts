import { TxtStoreSecondaryAdapter } from './secondary-adapters/txt-store-secondary-adapter';
import { GreetingService } from './business/greeting-service';
import { runPromptApp } from './primary-adapters/prompt-input-primary-adapter';

const txtStore = new TxtStoreSecondaryAdapter();
const greetingService = new GreetingService(txtStore);
runPromptApp(greetingService);
