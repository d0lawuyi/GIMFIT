import test from 'node:test';
import assert from 'node:assert/strict';
import { filterEquipment } from '../src/data/equipment.ts';
test('search ignores casing and surrounding spaces', () => {
  assert.deepEqual(filterEquipment('  DUMBBELL  ', 'All').map(item => item.id), ['dumbbells']);
});
test('category and search must both match', () => {
  assert.deepEqual(filterEquipment('press', 'Machines').map(item => item.id), ['leg-press', 'chest-press']);
  assert.deepEqual(filterEquipment('press', 'Cables'), []);
});
test('aliases find equipment and unknown queries are empty', () => {
  assert.equal(filterEquipment('pulley', 'All')[0]?.id, 'cable-station');
  assert.deepEqual(filterEquipment('unlisted machine', 'All'), []);
});
