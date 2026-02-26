export type RawCard = {
  id?: string;
  name?: string;
  number?: string;
  supertype?: string;
  subtypes?: readonly string[];
  hp?: string;
  types?: readonly string[];
  rarity?: string;
  artist?: string;
  set?: {
    name?: string;
  };
  images?: {
    small?: string;
    large?: string;
  };
};

export type CardDetails = {
  id: string;
  name: string;
  number: string;
  imageSmall: string | null;
  imageLarge: string | null;
  supertype: string | null;
  subtypes: readonly string[];
  hp: string | null;
  types: readonly string[];
  rarity: string | null;
  artist: string | null;
  setName: string | null;
};

export type SearchCard = {
  id: string;
  name: string;
  number: string;
};

export type RequiredRawCard = RawCard & {
  id: string;
  name: string;
  number: string;
};
