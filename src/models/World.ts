import type { ValueOf } from "../types";

export const FoodType = {
    Nectar: 'nectar',
    Pollen: 'pollen',
    Water: 'water',
    Propolis: 'propolis'
} as const;

export const Season = {
    Spring: 'spring',
    Summer: 'summer',
    Autumn: 'autumn',
    Winter: 'winter'
} as const;

export type Season =  ValueOf<typeof Season>;

export type FoodSource = {
    foodType: ValueOf<typeof FoodType>,
    position: [direction: number, distance: number],
    quantity: number
}