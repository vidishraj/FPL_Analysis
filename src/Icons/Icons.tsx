export const iconSrc: {
  [key: string]: {
    logo: string;
    colors: string[];
    textColor?: string;
    jerseyPicture?: string; // Adding jerseyPicture as an optional key
  };
} = {
  Arsenal: {
    logo: 'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3-110.webp',
    colors: ['#EF0107', '#FFFFFF', '#EF0107'], // Red, Blue, Silver
    textColor: 'black',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_3-110.webp', // Placeholder URL for jersey picture
  },
  'Aston Villa': {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t7.png',
    colors: ['#95BFE5', '#670E36', '#FEE505'], // Light Blue, Claret, Yellow
    textColor: 'white',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_7-110.webp',
  },
  Bournemouth: {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t91.png',
    colors: ['white', '#ed1c24', '#ffe5c7'], // Red, Black, Yellow
    textColor: '',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_91-66.webp',
  },
  Brentford: {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t94.png',
    colors: ['#e30613', 'white', 'black'], // Red, Yellow, Gray
    textColor: '',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_94-110.webp',
  },
  Brighton: {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t36.png',
    colors: ['#005daa', '#FFFFFF', '#fdb913'], // Blue, Yellow, White
    textColor: '',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_36-110.webp',
  },
  Chelsea: {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t8.png',
    colors: ['#FFFFFF', '#034694', '#FFFFFF'], // Blue, Gold, White
    textColor: '',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_8-66.webp',
  },
  'Crystal Palace': {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t31.png',
    colors: ['#FFFFFF', '#1B458F', '#A7A5A6'], // Blue, Red, White
    textColor: '',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_31-110.webp',
  },
  Everton: {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t11.png',
    colors: ['#003399', '#FFFFFF', '#FFFFFF'], // Blue, White, Yellow
    textColor: '',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_11-66.webp',
  },
  Fulham: {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t54.png',
    colors: ['#000000', '#FFFFFF', '#CC0000'], // Black, White, Red
    textColor: '',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_54-66.webp',
  },
  Ipswich: {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t40.png',
    colors: ['#3a64a3', '#FFFFFF', '#de2c37'], // Blue, White, Red
    textColor: '',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_40-66.webp',
  },
  Leicester: {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t13.png',
    colors: ['#003090', '#FFFFFF', '#FDBE11'], // Blue, Yellow, White
    textColor: '',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_13-66.webp',
  },
  Liverpool: {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t14.png',
    colors: ['#C8102E', '#FFFFFF', 'whitesmoke'], // Red, Teal, Yellow
    textColor: '',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_14-110.webp',
  },
  'Man City': {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t43.png',
    colors: ['#6CABDD', '#FFFFFF', '#D4A12A'], // Sky Blue, Navy, Yellow
    textColor: '',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_43-110.webp',
  },
  'Man Utd': {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t1.png',
    colors: ['#FBE122', '#DA291C', '#FFFFFF'], // Red, Yellow, Black
    textColor: 'white',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_1-66.webp',
  },
  Newcastle: {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t4.png',
    colors: ['whitesmoke', 'black', '#41B6E6'], // Black, Blue, Gold
    textColor: 'white',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_4-66.webp',
  },
  "Nott'm Forest": {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t17.png',
    colors: ['#DD0000', '#FFFFFF', '#DD0000'], // Red, White, Gray
    textColor: '',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_17-66.webp',
  },
  Southampton: {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t20.png',
    colors: ['#d71920', 'white', 'black'], // Red, Black, Yellow
    textColor: '',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_20-66.webp',
  },
  Spurs: {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t6.png',
    colors: ['#132257', '#FFFFFF', '#FFFFFF'], // Navy, White, Silver
    textColor: '',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_6-66.webp',
  },
  'West Ham': {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t21.png',
    colors: ['#7A263A', '#FFFFFF', '#F3D459'], // Claret, Blue, White
    textColor: '',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_21-66.webp',
  },
  Wolves: {
    logo: 'https://resources.premierleague.com/premierleague/badges/50/t39.png',
    colors: ['#FDB913', 'black', '#FFFFFF'], // Gold, Black, White
    textColor: '',
    jerseyPicture:
      'https://fantasy.premierleague.com/dist/img/shirts/standard/shirt_39-66.webp',
  },
  // Empty key for future use
  Empty: {
    logo: '',
    colors: ['', '', ''],
    textColor: '',
    jerseyPicture: '', // Empty for future use
  },
};
