import { appendFile } from 'fs';
import { StoreGreetingSecondaryPort } from '../business/greeting-service';

export class TxtStoreSecondaryAdapter implements StoreGreetingSecondaryPort {
  save(greeting: string) {
    const fileName = 'greetings.txt';
    appendFile(fileName, greeting + '\n', (err) => {
      if (err) throw new Error(err.message);
      console.log(`${greeting} is saved in ${fileName} successfully!`);
    });
  }
}
