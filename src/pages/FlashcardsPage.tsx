
import React, { useState } from 'react';
import { Flashcard, WordData } from '@/components/flashcards/Flashcard';
import { CategorySelector, Category } from '@/components/flashcards/CategorySelector';

const FlashcardsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('emotions');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  // Sample categories data
  const categories: Category[] = [
    { id: 'emotions', name: 'Emotions', icon: '😊', color: 'text-yellow-500' },
    { id: 'nature', name: 'Nature', icon: '🌿', color: 'text-green-500' },
    { id: 'science', name: 'Science', icon: '🔬', color: 'text-blue-500' },
    { id: 'technology', name: 'Technology', icon: '💻', color: 'text-indigo-500' },
    { id: 'arts', name: 'Arts', icon: '🎨', color: 'text-purple-500' },
    { id: 'food', name: 'Food', icon: '🍎', color: 'text-red-500' },
    { id: 'travel', name: 'Travel', icon: '✈️', color: 'text-cyan-500' },
    { id: 'business', name: 'Business', icon: '💼', color: 'text-gray-500' },
  ];
  
  // Enhanced flashcards data by category
  const flashcardsByCategory: Record<string, WordData[]> = {
    'emotions': [
      {
        id: 'e1',
        word: 'Euphoria',
        partOfSpeech: 'noun',
        definition: 'A feeling or state of intense excitement and happiness.',
        example: 'The euphoria of winning the championship was overwhelming.',
        pronunciation: '/juːˈfɔːriə/',
        category: 'Emotions',
        difficulty: 'medium',
        synonyms: ['elation', 'ecstasy', 'joy', 'bliss', 'delight'],
        antonyms: ['depression', 'misery', 'sorrow', 'despair']
      },
      {
        id: 'e2',
        word: 'Melancholy',
        partOfSpeech: 'noun',
        definition: 'A feeling of pensive sadness, typically with no obvious cause.',
        example: 'She felt a wave of melancholy as she looked through old photographs.',
        pronunciation: '/ˈmɛlənkɒli/',
        category: 'Emotions',
        difficulty: 'hard',
        synonyms: ['sadness', 'gloom', 'sorrow', 'dejection', 'woe'],
        antonyms: ['happiness', 'joy', 'delight', 'cheerfulness']
      },
      {
        id: 'e3',
        word: 'Exasperation',
        partOfSpeech: 'noun',
        definition: 'A feeling of intense irritation or annoyance.',
        example: 'She sighed in exasperation when her computer crashed again.',
        pronunciation: '/ɪɡˌzæspəˈreɪʃən/',
        category: 'Emotions',
        difficulty: 'hard',
        synonyms: ['irritation', 'annoyance', 'vexation', 'frustration'],
        antonyms: ['patience', 'calmness', 'serenity', 'composure']
      },
      {
        id: 'e4',
        word: 'Contentment',
        partOfSpeech: 'noun',
        definition: 'A state of happiness and satisfaction.',
        example: 'A feeling of contentment washed over her as she relaxed in the garden.',
        pronunciation: '/kənˈtɛntmənt/',
        category: 'Emotions',
        difficulty: 'easy',
        synonyms: ['satisfaction', 'gratification', 'fulfillment', 'pleasure'],
        antonyms: ['discontent', 'dissatisfaction', 'unhappiness', 'restlessness']
      },
      {
        id: 'e5',
        word: 'Indignation',
        partOfSpeech: 'noun',
        definition: 'Anger or annoyance provoked by what is perceived as unfair treatment.',
        example: 'He expressed his indignation at the unjust accusation.',
        pronunciation: '/ˌɪndɪɡˈneɪʃ(ə)n/',
        category: 'Emotions',
        difficulty: 'medium',
        synonyms: ['outrage', 'resentment', 'anger', 'offense', 'fury'],
        antonyms: ['approval', 'acceptance', 'pleasure', 'delight']
      }
    ],
    'nature': [
      {
        id: 'n1',
        word: 'Deciduous',
        partOfSpeech: 'adjective',
        definition: 'Shedding leaves annually.',
        example: 'Maple trees are deciduous, losing their leaves in autumn.',
        pronunciation: '/dɪˈsɪdjʊəs/',
        category: 'Nature',
        difficulty: 'hard',
        synonyms: ['leaf-shedding', 'non-evergreen', 'seasonal'],
        antonyms: ['evergreen', 'coniferous', 'perennial']
      },
      {
        id: 'n2',
        word: 'Ecosystem',
        partOfSpeech: 'noun',
        definition: 'A biological community of interacting organisms and their physical environment.',
        example: 'The pond is a fragile ecosystem containing many different species.',
        pronunciation: '/ˈiːkəʊˌsɪstəm/',
        category: 'Nature',
        difficulty: 'medium',
        synonyms: ['biosphere', 'environment', 'biome', 'habitat'],
        antonyms: ['desolation', 'wasteland']
      },
      {
        id: 'n3',
        word: 'Verdant',
        partOfSpeech: 'adjective',
        definition: 'Green with vegetation; lush and green.',
        example: 'The hillsides were covered in verdant forests.',
        pronunciation: '/ˈvɜːdənt/',
        category: 'Nature',
        difficulty: 'medium',
        synonyms: ['green', 'lush', 'leafy', 'grassy', 'flourishing'],
        antonyms: ['barren', 'arid', 'withered', 'desert']
      },
      {
        id: 'n4',
        word: 'Estuary',
        partOfSpeech: 'noun',
        definition: 'The tidal mouth of a large river where freshwater meets seawater.',
        example: 'The estuary was home to many species of birds and fish.',
        pronunciation: '/ˈɛstjʊəri/',
        category: 'Nature',
        difficulty: 'hard',
        synonyms: ['inlet', 'creek', 'fjord', 'bay', 'cove'],
        antonyms: ['source', 'origin']
      },
      {
        id: 'n5',
        word: 'Fauna',
        partOfSpeech: 'noun',
        definition: 'The animals of a particular region, habitat, or geological period.',
        example: 'Australia has a unique and diverse fauna.',
        pronunciation: '/ˈfɔːnə/',
        category: 'Nature',
        difficulty: 'medium',
        synonyms: ['animals', 'wildlife', 'creatures', 'species'],
        antonyms: ['flora', 'vegetation', 'plants']
      }
    ],
    'science': [
      {
        id: 's1',
        word: 'Hypothesis',
        partOfSpeech: 'noun',
        definition: 'A proposed explanation for a phenomenon.',
        example: 'The scientist formed a hypothesis about the chemical reaction.',
        pronunciation: '/haɪˈpɒθɪsɪs/',
        category: 'Science',
        difficulty: 'medium',
        synonyms: ['theory', 'proposition', 'supposition', 'assumption'],
        antonyms: ['conclusion', 'fact', 'law', 'theorem']
      },
      {
        id: 's2',
        word: 'Photosynthesis',
        partOfSpeech: 'noun',
        definition: 'The process by which green plants use sunlight to synthesize foods from carbon dioxide and water.',
        example: 'Through photosynthesis, plants convert solar energy into chemical energy.',
        pronunciation: '/ˌfoʊtoʊˈsɪnθəsɪs/',
        category: 'Science',
        difficulty: 'medium',
        synonyms: ['carbon fixation', 'light synthesis'],
        antonyms: ['respiration', 'decomposition']
      },
      {
        id: 's3',
        word: 'Quantum',
        partOfSpeech: 'noun',
        definition: 'A discrete quantity of energy proportional in magnitude to the frequency of the radiation it represents.',
        example: 'The physicist studied quantum mechanics for his research.',
        pronunciation: '/ˈkwɒntəm/',
        category: 'Science',
        difficulty: 'hard',
        synonyms: ['particle', 'amount', 'bit', 'portion'],
        antonyms: ['continuum', 'whole']
      },
      {
        id: 's4',
        word: 'Taxonomy',
        partOfSpeech: 'noun',
        definition: 'The branch of science concerned with classification, especially of organisms.',
        example: 'Biological taxonomy is essential for identifying new species.',
        pronunciation: '/tækˈsɒnəmi/',
        category: 'Science',
        difficulty: 'hard',
        synonyms: ['classification', 'categorization', 'systematics'],
        antonyms: ['disorder', 'chaos', 'disarray']
      },
      {
        id: 's5',
        word: 'Osmosis',
        partOfSpeech: 'noun',
        definition: 'The process by which molecules of a solvent pass through a semipermeable membrane.',
        example: 'Osmosis is vital for cellular function in all living organisms.',
        pronunciation: '/ɒzˈməʊsɪs/',
        category: 'Science',
        difficulty: 'medium',
        synonyms: ['diffusion', 'permeation', 'absorption'],
        antonyms: ['impermeability', 'imperviousness']
      }
    ],
    'technology': [
      {
        id: 't1',
        word: 'Algorithm',
        partOfSpeech: 'noun',
        definition: 'A process or set of rules to be followed in calculations or other problem-solving operations.',
        example: 'The new search engine uses a sophisticated algorithm to rank results.',
        pronunciation: '/ˈælɡəˌrɪðəm/',
        category: 'Technology',
        difficulty: 'medium',
        synonyms: ['formula', 'procedure', 'process', 'method'],
        antonyms: ['randomness', 'disorder', 'chaos']
      },
      {
        id: 't2',
        word: 'Cryptocurrency',
        partOfSpeech: 'noun',
        definition: 'A digital currency in which transactions are verified and records maintained by a decentralized system.',
        example: 'Bitcoin was the first cryptocurrency to gain widespread adoption.',
        pronunciation: '/ˌkrɪptoʊˈkʌrənsi/',
        category: 'Technology',
        difficulty: 'medium',
        synonyms: ['digital currency', 'virtual money', 'crypto'],
        antonyms: ['fiat currency', 'physical money', 'cash']
      },
      {
        id: 't3',
        word: 'Firmware',
        partOfSpeech: 'noun',
        definition: 'Permanent software programmed into a read-only memory.',
        example: 'The device requires a firmware update to fix the security issue.',
        pronunciation: '/ˈfɜːrmˌwɛər/',
        category: 'Technology',
        difficulty: 'medium',
        synonyms: ['embedded software', 'microcode', 'ROM code'],
        antonyms: ['software', 'application']
      },
      {
        id: 't4',
        word: 'Blockchain',
        partOfSpeech: 'noun',
        definition: 'A system in which a record of transactions are maintained across several computers linked in a peer-to-peer network.',
        example: 'Blockchain technology ensures that the transaction history cannot be altered.',
        pronunciation: '/ˈblɒkˌtʃeɪn/',
        category: 'Technology',
        difficulty: 'hard',
        synonyms: ['distributed ledger', 'digital ledger', 'chain of blocks'],
        antonyms: ['centralized database', 'single ledger']
      },
      {
        id: 't5',
        word: 'Latency',
        partOfSpeech: 'noun',
        definition: 'The delay before a transfer of data begins following an instruction for its transfer.',
        example: 'Low latency is crucial for real-time applications like video calls.',
        pronunciation: '/ˈleɪtənsi/',
        category: 'Technology',
        difficulty: 'medium',
        synonyms: ['delay', 'lag', 'response time', 'ping'],
        antonyms: ['immediacy', 'instantaneousness', 'promptness']
      }
    ],
    // Add data for other categories
    'arts': [
      {
        id: 'a1',
        word: 'Chiaroscuro',
        partOfSpeech: 'noun',
        definition: 'The treatment of light and shade in drawing and painting.',
        example: 'Rembrandt was known for his masterful use of chiaroscuro in his paintings.',
        pronunciation: '/kiˌɑːrəˈskjʊəroʊ/',
        category: 'Arts',
        difficulty: 'hard',
        synonyms: ['light-dark', 'shading', 'tonal contrast'],
        antonyms: ['monotone', 'flat coloring']
      }
    ],
    'food': [
      {
        id: 'f1',
        word: 'Umami',
        partOfSpeech: 'noun',
        definition: 'A category of taste in food corresponding to the flavor of glutamates.',
        example: 'The chef added mushrooms to enhance the umami taste of the dish.',
        pronunciation: '/uˈmɑːmi/',
        category: 'Food',
        difficulty: 'medium',
        synonyms: ['savory', 'meaty', 'brothy', 'rich'],
        antonyms: ['bland', 'tasteless']
      }
    ],
    'travel': [
      {
        id: 'tr1',
        word: 'Wanderlust',
        partOfSpeech: 'noun',
        definition: 'A strong desire to travel and explore the world.',
        example: 'Her wanderlust led her to visit more than thirty countries.',
        pronunciation: '/ˈwɒndərlʌst/',
        category: 'Travel',
        difficulty: 'easy',
        synonyms: ['travel bug', 'itchy feet', 'globe-trotting urge'],
        antonyms: ['homebound', 'sedentary', 'stay-at-home']
      }
    ],
    'business': [
      {
        id: 'b1',
        word: 'Synergy',
        partOfSpeech: 'noun',
        definition: 'The interaction of two or more organizations to produce a combined effect greater than the sum of their separate effects.',
        example: 'The merger created a synergy that benefited both companies.',
        pronunciation: '/ˈsɪnədʒi/',
        category: 'Business',
        difficulty: 'medium',
        synonyms: ['cooperation', 'collaboration', 'combined effort'],
        antonyms: ['discord', 'conflict', 'opposition']
      }
    ]
  };
  
  const currentCategoryCards = selectedCategory ? flashcardsByCategory[selectedCategory] || [] : [];
  
  const handleNext = () => {
    if (currentCardIndex < currentCategoryCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };
  
  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      setCurrentCardIndex(currentCategoryCards.length - 1);
    }
  };
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentCardIndex(0);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Flashcards</h1>
        <p className="text-muted-foreground">Learn new words by category</p>
      </div>
      
      <CategorySelector 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={handleCategorySelect} 
      />
      
      {selectedCategory && currentCategoryCards.length > 0 ? (
        <div className="mt-8">
          <p className="text-sm text-center text-muted-foreground mb-4">
            Card {currentCardIndex + 1} of {currentCategoryCards.length}
          </p>
          
          <Flashcard 
            wordData={currentCategoryCards[currentCardIndex]}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg text-center">
          <p className="text-lg font-medium">No flashcards available for this category yet.</p>
          <p className="text-muted-foreground">Try selecting another category.</p>
        </div>
      )}
    </div>
  );
};

export default FlashcardsPage;
