export type GameMode = "modern" | "blackops" | "futuristic";

export interface Weapon {
  id: string;
  name: string;
  damage: number;
  range: number;
  mobility: number;
  fireRate: number;
  accuracy: number;
  category: string;
  icon: string;
}

export interface Attachment {
  id: string;
  name: string;
  category: string;
  icon: string;
  bonus: string;
}

export interface Perk {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Equipment {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Loadout {
  className: string;
  gameMode: GameMode;
  primary: Weapon | null;
  secondary: Weapon | null;
  attachments: Attachment[];
  tactical: Equipment | null;
  lethal: Equipment | null;
  perk1: Perk | null;
  perk2: Perk | null;
  perk3: Perk | null;
  fieldUpgrade: Equipment | null;
}
