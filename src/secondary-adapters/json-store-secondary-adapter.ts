import { readFile, writeFile } from 'fs';
import { StoreGreetingSecondaryPort } from '../business/greeting-service';

export class JsonStoreSecondaryAdapter implements StoreGreetingSecondaryPort {
  save(greeting: string) {
    const fileName = 'greetings-json.json';

    type GreetingContent = {
      greeting: string;
    };

    type Greetings = {
      greetings: GreetingContent[];
    };

    readFile(fileName, 'utf8', (err, data) => {
      let greetingsData: Greetings = { greetings: [] };

      if (err) {
        console.warn(
          'File not found or unreadable. Initializing new file with greetings array.'
        );
      } else {
        try {
          greetingsData = JSON.parse(data);
        } catch (parseError) {
          console.error(
            'Error parsing JSON, initializing new greetings array.'
          );
        }
      }

      greetingsData.greetings.push({ greeting: greeting });

      writeFile(
        fileName,
        JSON.stringify(greetingsData, null, 2),
        'utf8',
        (writeErr) => {
          if (writeErr) {
            console.error(`Failed to save greeting: ${writeErr.message}`);
            return;
          }
          console.log(`Greeting "${greeting}" has been saved to ${fileName}`);
        }
      );
    });
  }
}
