type Pilot = {
  name: string;
  gates: string[];
};

export const pilots: Pilot[] = [
  {
    name: 'Długa nazwa pilota 1',
    gates: [
      'Szlaban Grzybowska 1',
      'Brama Garażowa 1',
      'Brama Wyjazdowa Śląska',
      'Szlaban Pomorska 32',
      'Test',
    ],
  },
  {
    name: 'Pilot 2',
    gates: ['Brama Główna', 'Brama Boczna', 'Szlaban Wjazdowy', 'Brama Serwisowa'],
  },
  {
    name: 'Pilot 3',
    gates: ['Brama Zachodnia', 'Brama Wschodnia', 'Szlaban Centralny'],
  },
  {
    name: 'Pilot 4',
    gates: ['Brama Północna', 'Brama Południowa', 'Szlaban Gościnny', 'Brama Awaryjna'],
  },
];
