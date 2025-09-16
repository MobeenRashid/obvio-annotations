import { Vehicle } from '@/lib/types';
import type { NextApiRequest, NextApiResponse } from 'next';

const makes = [
  'Toyota',
  'Honda',
  'Ford',
  'Chevrolet',
  'Tesla',
  'BMW',
  'Mercedes',
];

const models = [
  'Camry',
  'Civic',
  'F-150',
  'Malibu',
  'Model 3',
  'X5',
  'C-Class',
];

const colors = ['Red', 'Blue', 'Black', 'White', 'Silver', 'Green', 'Yellow'];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { plate } = req.query;

  if (!plate || typeof plate !== 'string') {
    return res.status(400).json({ error: 'License plate number is required' });
  }

  const vehicle: Vehicle = {
    plate: plate.toUpperCase(),
    make: getRandomItem(makes),
    model: getRandomItem(models),
    color: getRandomItem(colors),
  };

  return res.status(200).json(vehicle);
}
