export type Exercise = {
  id: string;
  equipmentId: string;
  name: string;
  primaryMuscles: string;
  setup: string;
};

// Prototype content — requires review before public release
export const exercises: Exercise[] = [
  {
    id: 'dumbbell-curl',
    equipmentId: 'dumbbells',
    name: 'Dumbbell curl',
    primaryMuscles: 'Biceps',
    setup: 'Standing position with a dumbbell in each hand',
  },
  {
    id: 'dumbbell-lateral-raise',
    equipmentId: 'dumbbells',
    name: 'Dumbbell lateral raise',
    primaryMuscles: 'Lateral deltoids',
    setup: 'Standing position with a dumbbell beside each thigh',
  },
  {
    id: 'cable-pushdown',
    equipmentId: 'cable-station',
    name: 'Cable triceps pushdown',
    primaryMuscles: 'Triceps',
    setup: 'High pulley with a compatible rope attachment',
  },
  {
    id: 'machine-leg-press',
    equipmentId: 'leg-press',
    name: 'Machine leg press',
    primaryMuscles: 'Quadriceps and glutes',
    setup: 'Seat and backrest adjusted for the specific machine',
  },
  {
    id: 'barbell-curl',
    equipmentId: 'barbell',
    name: 'Barbell curl',
    primaryMuscles: 'Biceps',
    setup: 'Standing position with an underhand grip on the bar',
  },
  {
    id: 'machine-lat-pulldown',
    equipmentId: 'lat-pulldown',
    name: 'Lat pulldown',
    primaryMuscles: 'Latissimus dorsi',
    setup: 'Seated position with thigh pads adjusted and bar overhead',
  },
  {
    id: 'machine-chest-press',
    equipmentId: 'chest-press',
    name: 'Machine chest press',
    primaryMuscles: 'Pectorals',
    setup: 'Seat adjusted to align the handles with the chest',
  },
];