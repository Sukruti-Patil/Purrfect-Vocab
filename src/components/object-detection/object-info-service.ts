
interface ObjectInfoResponse {
  word: string;
  meaning: string;
  pronunciation?: string;
  example: string;
  popCulture: {
    title: string;
    type: 'movie' | 'series' | 'book';
    scene: string;
  }[];
}

// This is a mock service that would ideally be replaced with a real API call
export const fetchObjectInfo = async (objectName: string): Promise<ObjectInfoResponse> => {
  // In production, this would be a real API call to a service like WordsAPI, Oxford Dictionary API, etc.
  console.log(`Fetching info for object: ${objectName}`);
  
  // Hardcoded responses for common objects
  const objectInfoDatabase: Record<string, ObjectInfoResponse> = {
    laptop: {
      word: 'laptop',
      meaning: 'A portable computer small enough to use on one\'s lap',
      pronunciation: 'lap·top',
      example: 'She opened her laptop to finish writing the report while waiting at the airport.',
      popCulture: [
        {
          title: 'The Social Network',
          type: 'movie',
          scene: 'Mark Zuckerberg (Jesse Eisenberg) codes furiously on his laptop to create "Facemash" in his Harvard dorm room.'
        },
        {
          title: 'Mr. Robot',
          type: 'series',
          scene: 'Elliot Alderson (Rami Malek) uses his laptop to hack into corporate systems and expose corruption.'
        }
      ]
    },
    cup: {
      word: 'cup',
      meaning: 'A small, open container used for drinking',
      pronunciation: 'kʌp',
      example: 'She sipped her tea from a porcelain cup while reading the morning news.',
      popCulture: [
        {
          title: 'Beauty and the Beast',
          type: 'movie',
          scene: 'Chip, the enchanted teacup character, speaks to Belle during her stay at the Beast\'s castle.'
        },
        {
          title: 'Harry Potter and the Prisoner of Azkaban',
          type: 'book',
          scene: 'Professor Trelawney reads tea leaves in Harry\'s cup during Divination class, predicting a grim future.'
        }
      ]
    },
    cell_phone: {
      word: 'cell phone',
      meaning: 'A portable telephone that works by cellular radio technology',
      pronunciation: 'sel fəʊn',
      example: 'She quickly checked her cell phone for any new messages from her friends.',
      popCulture: [
        {
          title: 'The Matrix',
          type: 'movie',
          scene: 'Neo (Keanu Reeves) receives a mysterious cell phone in a package, which rings immediately with a call from Morpheus.'
        },
        {
          title: 'Stranger Things',
          type: 'series',
          scene: 'The kids use their walkie-talkies as a precursor to modern cell phones to communicate across Hawkins during their adventures.'
        }
      ]
    },
    chair: {
      word: 'chair',
      meaning: 'A separate seat for one person, typically with a back and four legs',
      pronunciation: 'tʃɛər',
      example: 'He sat down in the comfortable chair after a long day at work.',
      popCulture: [
        {
          title: 'The Voice',
          type: 'series',
          scene: 'Judges sit in iconic red rotating chairs and turn around when they hear a contestant they want on their team.'
        },
        {
          title: 'A Game of Thrones',
          type: 'book',
          scene: 'The Iron Throne, an uncomfortable chair made from swords, is the central symbol of power in Westeros.'
        }
      ]
    },
    book: {
      word: 'book',
      meaning: 'A written or printed work consisting of pages bound together',
      pronunciation: 'bʊk',
      example: 'She always carries a book in her bag for reading on the train.',
      popCulture: [
        {
          title: 'The Neverending Story',
          type: 'movie',
          scene: 'Bastian discovers a magical book that transports him into the fantasy world of Fantasia.'
        },
        {
          title: 'The Book Thief',
          type: 'book',
          scene: 'Liesel Meminger steals books during Nazi Germany as a way to cope with the horrors around her.'
        }
      ]
    },
    guitar: {
      word: 'guitar',
      meaning: 'A stringed musical instrument with a fretted fingerboard, played by plucking or strumming',
      pronunciation: 'ɡɪˈtɑr',
      example: 'He played the guitar at the beach party as everyone sang along.',
      popCulture: [
        {
          title: 'Back to the Future',
          type: 'movie',
          scene: 'Marty McFly (Michael J. Fox) performs "Johnny B. Goode" on an electric guitar at the Enchantment Under the Sea dance.'
        },
        {
          title: 'School of Rock',
          type: 'movie',
          scene: 'Dewey Finn (Jack Black) teaches privileged private school kids how to rock out on guitars and form a band.'
        }
      ]
    }
  };
  
  // Default response if the object is not in our database
  const defaultInfo: ObjectInfoResponse = {
    word: objectName,
    meaning: `A common object used in everyday life`,
    example: `The ${objectName} was placed on the table.`,
    popCulture: [
      {
        title: 'Various movies and TV shows',
        type: 'movie',
        scene: `This ${objectName} appears in many different contexts across popular media.`
      }
    ]
  };
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return objectInfoDatabase[objectName.toLowerCase()] || defaultInfo;
};
