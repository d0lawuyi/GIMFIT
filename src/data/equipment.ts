export const categories = ['All', 'Free weights', 'Machines', 'Cables'] as const;
export type Category = (typeof categories)[number];
export type Equipment = {
  id: string;
  name: string;
  category: Exclude<Category, 'All'>;
  description: string;
  searchTerms: string[];
};

// Sample browsing data. Exercise guidance will be reviewed separately.
export const equipment: Equipment[] = [
  { id: 'dumbbells', name: 'Dumbbells', category: 'Free weights', description: 'A pair of handheld weights, fixed or adjustable.', searchTerms: ['dumbbell', 'weights'] },
  { id: 'cable-station', name: 'Cable station', category: 'Cables', description: 'Pulleys with a weight stack and interchangeable handles.', searchTerms: ['pulley', 'cable machine'] },
  { id: 'leg-press', name: 'Leg press', category: 'Machines', description: 'A seated machine with a large platform for your feet.', searchTerms: ['press', 'sled'] },
  { id: 'barbell', name: 'Barbell', category: 'Free weights', description: 'A long bar that holds weight plates at either end.', searchTerms: ['bar', 'plates'] },
  { id: 'lat-pulldown', name: 'Lat pulldown', category: 'Machines', description: 'A seated station with an overhead bar and thigh pads.', searchTerms: ['pulldown', 'pull down'] },
  { id: 'chest-press', name: 'Chest press', category: 'Machines', description: 'A seated station with handles positioned in front of you.', searchTerms: ['press machine'] },
];

export function filterEquipment(query: string, category: Category): Equipment[] {
  const normalized = query.trim().toLowerCase();
  return equipment.filter((item) =>
    (category === 'All' || item.category === category) &&
    [item.name, item.description, ...item.searchTerms].some((text) => text.toLowerCase().includes(normalized)),
  );
}
