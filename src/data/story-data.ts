
interface StoryWord {
  word: string;
  meaning: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetWords: StoryWord[];
  imageUrl?: string;
}

export const storyData: Story[] = [
  {
    id: '1',
    title: 'The Mysterious Artifact',
    content: `The archaeological team made a serendipitous discovery while excavating the ancient temple. The artifact they found was ubiquitous in the historical records but had never been seen in person before. It was an ephemeral moment as the sunlight hit the gold for the first time in centuries, revealing intricate patterns.

    "This paradigm-shifting find will change everything we know about the civilization," Dr. Peterson exclaimed with uncharacteristic enthusiasm. The team's resilience through months of difficult digging had finally paid off.
    
    They used an advanced algorithm to reconstruct the broken pieces, carefully juxtaposing the fragments until they formed a complete object. Even the most nonchalant members of the team couldn't hide their excitement.
    
    Just like the photosynthesis process that gives life to plants, this discovery would bring new life to their understanding of ancient technologies. No one would experience FOMO on this incredible day in archaeological history.`,
    difficulty: 'advanced',
    targetWords: [
      { word: 'serendipitous', meaning: 'Occurring or discovered by chance in a happy or beneficial way' },
      { word: 'ubiquitous', meaning: 'Present, appearing, or found everywhere' },
      { word: 'ephemeral', meaning: 'Lasting for a very short time' },
      { word: 'paradigm', meaning: 'A typical example or pattern of something; a model' },
      { word: 'resilience', meaning: 'The capacity to recover quickly from difficulties' },
      { word: 'algorithm', meaning: 'A process or set of rules to be followed in calculations or problem-solving' },
      { word: 'juxtaposing', meaning: 'Place or deal with close together for contrasting effect' },
      { word: 'nonchalant', meaning: 'Feeling or appearing casually calm and relaxed' },
      { word: 'photosynthesis', meaning: 'The process by which plants use sunlight to synthesize foods' },
      { word: 'FOMO', meaning: 'Fear of missing out; anxiety that an exciting event may currently be happening elsewhere' }
    ]
  },
  {
    id: '2',
    title: 'A Day at the Garden',
    content: `Sarah loved visiting the community garden. The garden was abundant with colorful flowers and tasty vegetables. Every Saturday morning, she would diligently water the plants and pull out any weeds.

    "The tomatoes are ripe," she said with excitement. Her friend Tom helped her harvest the vegetables. They collected a bountiful crop of tomatoes, carrots, and lettuce.
    
    Afterward, they sat under the shade of a large tree. The weather was perfect – not too hot, not too cold. Sarah shared some refreshing lemonade she had made that morning.
    
    "Gardening is such a rewarding hobby," Tom remarked. Sarah nodded in agreement. They both felt content watching butterflies flutter among the flowers as the afternoon gently passed by.`,
    difficulty: 'beginner',
    targetWords: [
      { word: 'abundant', meaning: 'Present in great quantity' },
      { word: 'diligently', meaning: 'In a way that shows care and conscientiousness in one's work or duties' },
      { word: 'harvest', meaning: 'The process or period of gathering crops' },
      { word: 'bountiful', meaning: 'Large in quantity; abundant' },
      { word: 'refreshing', meaning: 'Serving to refresh or reinvigorate someone' },
      { word: 'rewarding', meaning: 'Providing satisfaction; fulfilling' },
      { word: 'content', meaning: 'In a state of peaceful happiness' },
      { word: 'flutter', meaning: 'Fly unsteadily or hover by flapping the wings quickly and lightly' }
    ]
  },
  {
    id: '3',
    title: 'The Tech Startup Journey',
    content: `Launching a tech startup required Maya to be versatile in many skills. She needed to navigate the complex ecosystem of venture capital while maintaining her innovative vision for the product.

    "We need to pivot our strategy," Maya announced to her team after analyzing the latest user feedback. The initial prototype had been obsolete compared to what competitors were offering.
    
    Their software engineer, Raj, worked on debugging the application, trying to eliminate the persistent glitches that users had reported. Meanwhile, the interface design team was streamlining the user experience to make it more intuitive.
    
    Despite facing numerous challenges, Maya remained optimistic. "Disruption isn't easy," she reminded herself, "but it's the only way to create something truly groundbreaking." The upcoming product launch would either validate their hard work or send them back to the drawing board.`,
    difficulty: 'intermediate',
    targetWords: [
      { word: 'versatile', meaning: 'Able to adapt or be adapted to many different functions or activities' },
      { word: 'ecosystem', meaning: 'A complex network or interconnected system' },
      { word: 'innovative', meaning: 'Featuring new methods; advanced and original' },
      { word: 'pivot', meaning: 'The central point, pin, or shaft on which a mechanism turns or oscillates' },
      { word: 'obsolete', meaning: 'No longer produced or used; out of date' },
      { word: 'debugging', meaning: 'The process of identifying and removing errors from computer hardware or software' },
      { word: 'persistent', meaning: 'Continuing firmly or obstinately in a course of action' },
      { word: 'streamlining', meaning: 'Make (an organization or system) more efficient and effective' },
      { word: 'intuitive', meaning: 'Using or based on what one feels to be true even without conscious reasoning' },
      { word: 'disruption', meaning: 'Disturbance or problems which interrupt an event, activity, or process' },
      { word: 'groundbreaking', meaning: 'Breaking new ground; innovative; pioneering' },
      { word: 'validate', meaning: 'Check or prove the validity or accuracy of something' }
    ]
  }
];
