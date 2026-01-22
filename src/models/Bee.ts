import type { Season, FoodSource } from "./World";
import type { ValueOf } from "../types";

export const Bee = {
    Queen: 'queen',
    Worker: 'worker',
    Drone: 'drone'
} as const;

export const Sex = {
    Male: 'male',
    Female: 'female'
} as const;

//Rôle basé sur l'age et les besoins de la ruche
export const WorkerRole = {
    Cleaner: 'cleaner',
    LarvaeNurse: 'larvaeNurse',
    QueenNurse: 'queenNurse',
    Builder: 'builder',
    Handle: 'handler',
    Fan: 'fan',
    Guardian: 'guardian',
    Forage: 'forager'
} as const;

export const LarvaStage = {
    Egg: 'egg',
    Larva: 'larva',
    Nymph: 'nymph'
} as const;

type BaseBee = {
    age: number,
    health: number,
    stress: number
}

export type Queen = BaseBee & {
    sex: typeof Sex.Female,
    maxLifeSpan: 1820, // (5 ans, 260 weeks)
    fertility: number,
    isVirgin: boolean,
    pheromoneStrength: number,
    spermCount: number,
    laidEggsToday: number

}

export type Worker = BaseBee & {
    sex: typeof Sex.Female,
    role: ValueOf<typeof WorkerRole>,
    maxLifeSpan: number,
    juvenileHormone: number, //si élevé -> vieillit + vite, devient butineuse, sort de la ruche, vieillit - longtemps
    vitellogenin: number, //si élevé -> jeune physiologiquement, tache interieur, vit + longtemps, resiste mieux au stress
    fatBodies: number,
    foragingExperience: number,
    knowFoodSources: FoodSource[]
}
/* 
Jeune abeille    →    VG haute, JH basse    →    Nourrice
↓ avec l'âge
Abeille mature   →    VG basse, JH haute    →    Butineuse
*/
export type Drone = BaseBee & {
    sex: typeof Sex.Male,
    maxLifeSpan: 90,
    hasFlownToday: boolean,
    maturity: number
}

export type Larvae = BaseBee & {
    stage: ValueOf<typeof LarvaStage>,
    daysInStage: number,
    isFertilized: boolean,
    caste: ValueOf<typeof Bee>,
    fedRoyalJelly: boolean,
    temperature: number
}

export type WaggleDance = {
    direction: number, //angle
    distance: number, //metre
    duration: number, //seconde
    quality: number, // 0-1
    foodSource: FoodSource,
    followers: Worker[]
}