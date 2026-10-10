export interface PlanetData {
  name: string;
  radius: number; // visual radius in pixels
  orbitRadius: number; // visual orbit radius in pixels
  color: string;
  glowColor: string;
  realDiameter: string; // km
  realDistance: string; // million km from sun
  orbitalPeriod: string; // Earth days/years
  description: string;
  emoji: string;
  speed: number; // relative orbital speed multiplier
}

export const planets: PlanetData[] = [
  {
    name: "Mercury",
    radius: 4,
    orbitRadius: 60,
    color: "#b5b5b5",
    glowColor: "#8a8a8a",
    realDiameter: "4,879 km",
    realDistance: "57.9 million km",
    orbitalPeriod: "88 days",
    description: "The smallest planet and closest to the Sun. It has no atmosphere and extreme temperature variations.",
    emoji: "☿",
    speed: 4.15,
  },
  {
    name: "Venus",
    radius: 7,
    orbitRadius: 90,
    color: "#e8cda0",
    glowColor: "#d4a855",
    realDiameter: "12,104 km",
    realDistance: "108.2 million km",
    orbitalPeriod: "225 days",
    description: "The hottest planet due to its thick atmosphere. It rotates backwards compared to most planets.",
    emoji: "♀",
    speed: 1.62,
  },
  {
    name: "Earth",
    radius: 8,
    orbitRadius: 125,
    color: "#4da6ff",
    glowColor: "#2979c9",
    realDiameter: "12,756 km",
    realDistance: "149.6 million km",
    orbitalPeriod: "365.25 days",
    description: "Our home planet — the only known world with liquid water on its surface and life.",
    emoji: "🌍",
    speed: 1.0,
  },
  {
    name: "Mars",
    radius: 6,
    orbitRadius: 160,
    color: "#e07040",
    glowColor: "#c0503a",
    realDiameter: "6,792 km",
    realDistance: "227.9 million km",
    orbitalPeriod: "687 days",
    description: "The Red Planet, home to the tallest volcano (Olympus Mons) and deepest canyon in the Solar System.",
    emoji: "♂",
    speed: 0.53,
  },
  {
    name: "Jupiter",
    radius: 18,
    orbitRadius: 215,
    color: "#d4a574",
    glowColor: "#c08050",
    realDiameter: "142,984 km",
    realDistance: "778.6 million km",
    orbitalPeriod: "11.86 years",
    description: "The largest planet — a gas giant with a Great Red Spot storm that has raged for centuries.",
    emoji: "♃",
    speed: 0.084,
  },
  {
    name: "Saturn",
    radius: 15,
    orbitRadius: 275,
    color: "#e8d5a0",
    glowColor: "#c9b070",
    realDiameter: "120,536 km",
    realDistance: "1,433.5 million km",
    orbitalPeriod: "29.46 years",
    description: "Famous for its spectacular ring system made of ice and rock particles.",
    emoji: "♄",
    speed: 0.034,
  },
  {
    name: "Uranus",
    radius: 11,
    orbitRadius: 330,
    color: "#7de0e0",
    glowColor: "#50b0b0",
    realDiameter: "51,118 km",
    realDistance: "2,872.5 million km",
    orbitalPeriod: "84.01 years",
    description: "An ice giant that rotates on its side. It has a blue-green color from methane in its atmosphere.",
    emoji: "♅",
    speed: 0.012,
  },
  {
    name: "Neptune",
    radius: 10,
    orbitRadius: 380,
    color: "#4070e0",
    glowColor: "#3050b0",
    realDiameter: "49,528 km",
    realDistance: "4,495.1 million km",
    orbitalPeriod: "164.8 years",
    description: "The windiest planet with speeds over 2,000 km/h. It's the farthest planet from the Sun.",
    emoji: "♆",
    speed: 0.006,
  },
];
