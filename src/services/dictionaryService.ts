import { WordData } from '@/components/flashcards/Flashcard';

// Mock Oxford dictionary API as we don't have actual API keys
export async function searchWord(word: string): Promise<WordData | null> {
  try {
    // In a real app, this would be an API call to Oxford Dictionary API
    // For now, we'll simulate a response with sample data
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
    
    const mockResponse = {
      id: `oxford-${Date.now()}`,
      word: word,
      definition: `Definition of ${word} (Oxford Dictionary)`,
      partOfSpeech: ["noun", "verb", "adjective", "adverb", "preposition", "conjunction"][Math.floor(Math.random() * 6)],
      pronunciation: `/${word}/`,
      example: `Example sentence using "${word}".`,
      synonyms: [`similar to ${word}`, `like ${word}`],
      antonyms: [`opposite of ${word}`],
      category: "Oxford",
      difficulty: ["easy", "medium", "hard"][Math.floor(Math.random() * 3)] as "easy" | "medium" | "hard"
    };
    
    return mockResponse;
  } catch (error) {
    console.error("Error fetching word data:", error);
    return null;
  }
}

// Sample Oxford dictionary words - expanded with more domain-specific entries
export const oxfordWords: WordData[] = [
  {
    id: "oxford-1",
    word: "serendipity",
    definition: "The occurrence and development of events by chance in a happy or beneficial way",
    partOfSpeech: "noun",
    pronunciation: "/ˌser.ənˈdɪp.ɪ.ti/",
    example: "They found each other by serendipity.",
    synonyms: ["chance", "fate", "fortune"],
    antonyms: ["misfortune", "design"],
    category: "Oxford",
    difficulty: "hard"
  },
  {
    id: "oxford-2",
    word: "ephemeral",
    definition: "Lasting for a very short time",
    partOfSpeech: "adjective",
    pronunciation: "/ɪˈfem.ər.əl/",
    example: "The ephemeral nature of fashion trends",
    synonyms: ["fleeting", "transient", "momentary"],
    antonyms: ["permanent", "enduring", "eternal"],
    category: "Oxford",
    difficulty: "hard"
  },
  {
    id: "oxford-3",
    word: "meticulous",
    definition: "Showing great attention to detail; very careful and precise",
    partOfSpeech: "adjective",
    pronunciation: "/məˈtɪk.jə.ləs/",
    example: "She was meticulous in her research.",
    synonyms: ["thorough", "careful", "precise"],
    antonyms: ["careless", "sloppy", "negligent"],
    category: "Oxford",
    difficulty: "medium"
  },
  {
    id: "oxford-4",
    word: "derivative",
    definition: "Something that is based on another source; a financial security whose value is derived from an underlying asset",
    partOfSpeech: "noun",
    pronunciation: "/dɪˈrɪvətɪv/",
    example: "The film is a derivative of earlier sci-fi classics.",
    synonyms: ["imitation", "spin-off", "byproduct"],
    antonyms: ["original", "prototype", "source"],
    category: "Oxford",
    difficulty: "medium"
  },
  {
    id: "oxford-5",
    word: "pandemic",
    definition: "An outbreak of a disease that occurs over a wide geographic area and affects an exceptionally high proportion of the population",
    partOfSpeech: "noun",
    pronunciation: "/pænˈdemɪk/",
    example: "The world faced a significant pandemic in 2020.",
    synonyms: ["epidemic", "outbreak", "plague"],
    antonyms: ["containment", "endemic"],
    category: "Oxford",
    difficulty: "medium"
  },
  {
    id: "oxford-6",
    word: "paradox",
    definition: "A seemingly absurd or contradictory statement or proposition which when investigated may prove to be well founded or true",
    partOfSpeech: "noun",
    pronunciation: "/ˈpærədɒks/",
    example: "The time travel paradox is a common theme in science fiction.",
    synonyms: ["contradiction", "absurdity", "enigma"],
    antonyms: ["consistency", "logic"],
    category: "Oxford",
    difficulty: "hard"
  },
  {
    id: "oxford-7",
    word: "anomaly",
    definition: "Something that deviates from what is standard, normal, or expected",
    partOfSpeech: "noun",
    pronunciation: "/əˈnɒməli/",
    example: "The scientist discovered an anomaly in the data.",
    synonyms: ["irregularity", "deviation", "oddity"],
    antonyms: ["regularity", "standard", "norm"],
    category: "Oxford",
    difficulty: "medium"
  },
  {
    id: "oxford-8",
    word: "ambivalent",
    definition: "Having mixed feelings or contradictory ideas about something or someone",
    partOfSpeech: "adjective",
    pronunciation: "/æmˈbɪvələnt/",
    example: "She felt ambivalent about her career change.",
    synonyms: ["conflicted", "uncertain", "undecided"],
    antonyms: ["decisive", "certain", "resolved"],
    category: "Oxford",
    difficulty: "medium"
  },
  {
    id: "oxford-9",
    word: "conjunction",
    definition: "A word used to connect clauses or sentences or to coordinate words in the same clause",
    partOfSpeech: "noun",
    pronunciation: "/kənˈdʒʌŋkʃən/",
    example: "Use conjunctions like 'and' or 'but' to join sentences.",
    synonyms: ["connector", "joiner", "link"],
    antonyms: ["separator", "divider"],
    category: "Grammar",
    difficulty: "medium"
  },
  {
    id: "oxford-10",
    word: "preposition",
    definition: "A word governing, and usually preceding, a noun or pronoun and expressing a relation to another word or element",
    partOfSpeech: "noun",
    pronunciation: "/ˌprepəˈzɪʃən/",
    example: "Common prepositions include 'in', 'on', and 'with'.",
    synonyms: ["function word", "positional word"],
    antonyms: [],
    category: "Grammar",
    difficulty: "medium"
  },
  {
    id: "oxford-11",
    word: "adverb",
    definition: "A word that modifies a verb, adjective, or other adverb, expressing manner, place, time, or degree",
    partOfSpeech: "noun",
    pronunciation: "/ˈædvɜːb/",
    example: "She quickly ran to the store (quickly is an adverb).",
    synonyms: ["modifier", "qualifier"],
    antonyms: [],
    category: "Grammar",
    difficulty: "medium"
  },
  {
    id: "oxford-12",
    word: "pronoun",
    definition: "A word that can function as a noun phrase used by itself and that refers to participants in the discourse",
    partOfSpeech: "noun",
    pronunciation: "/ˈprəʊnaʊn/",
    example: "Pronouns include 'he', 'she', 'they', and 'it'.",
    synonyms: ["substitute", "replacement"],
    antonyms: [],
    category: "Grammar",
    difficulty: "easy"
  },
  {
    id: "oxford-13",
    word: "syntax",
    definition: "The arrangement of words and phrases to create well-formed sentences in a language",
    partOfSpeech: "noun",
    pronunciation: "/ˈsɪntæks/",
    example: "Proper syntax is essential for clear communication.",
    synonyms: ["sentence structure", "grammar", "word order"],
    antonyms: [],
    category: "Grammar",
    difficulty: "hard"
  },
  {
    id: "oxford-14",
    word: "clause",
    definition: "A part of a sentence containing a subject and predicate",
    partOfSpeech: "noun",
    pronunciation: "/klɔːz/",
    example: "In the sentence 'When it rains, I stay home', there are two clauses.",
    synonyms: ["phrase", "component", "element"],
    antonyms: [],
    category: "Grammar",
    difficulty: "medium"
  },
  {
    id: "oxford-15",
    word: "gerund",
    definition: "A form that is derived from a verb but that functions as a noun, in English ending in -ing",
    partOfSpeech: "noun",
    pronunciation: "/ˈdʒerənd/",
    example: "In 'Swimming is good exercise', 'swimming' is a gerund.",
    synonyms: ["verbal noun", "-ing form"],
    antonyms: [],
    category: "Grammar",
    difficulty: "hard"
  },
  {
    id: "oxford-16",
    word: "participle",
    definition: "A word formed from a verb and used as an adjective or as part of verb tense",
    partOfSpeech: "noun",
    pronunciation: "/ˈpɑːtɪsɪpl/",
    example: "In 'The broken vase', 'broken' is a participle.",
    synonyms: ["verbal adjective"],
    antonyms: [],
    category: "Grammar",
    difficulty: "hard"
  }
];
