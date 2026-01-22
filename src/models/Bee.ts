import type { Season, FoodSource } from "./World";
import type { ValueOf } from "../types";

// type Bee = Queen | Worker | Drone;
// type Sex = 'male' | 'female';
// type WorkerRole = 'cleaner' | 'larvaeNurse' | 'queenNurse' | 'builder'| 'handler' | 'fan' | 'guardian' | 'forager';

const Bee = {
    Queen: 'queen',
    Worker: 'worker',
    Drone: 'drone'
} as const;

const Sex = {
    Male: 'male',
    Female: 'female'
} as const;

//Rôle basé sur l'age et les besoins de la ruche
const WorkerRole = {
    Cleaner: 'cleaner',
    LarvaeNurse: 'larvaeNurse',
    QueenNurse: 'queenNurse',
    Builder: 'builder',
    Handle: 'handler',
    Fan: 'fan',
    Guardian: 'guardian',
    Forage: 'forager'
} as const;

const LarvaStage = {
    Egg: 'egg',
    Larva: 'larva',
    Nymph: 'nymph'
} as const;

type BaseBee = {
    age: number,
    health: number,
    stress: number
}

type Queen = BaseBee & {
    sex: typeof Sex.Female,
    maxLifeSpan: 1820, // (5 ans, 260 weeks)
    fertility: number,
    isVirgin: boolean,
    pheromoneStrength: number,
    spermCount: number,
    laidEggsToday: number

}

type Worker = BaseBee & {
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
type Drone = BaseBee & {
    sex: typeof Sex.Male,
    maxLifeSpan: 90,
    hasFlownToday: boolean,
    maturity: number
}

type Larvae = BaseBee & {
    stage: ValueOf<typeof LarvaStage>,
    daysInStage: number,
    isFertilized: boolean,
    caste: ValueOf<typeof Bee>,
    fedRoyalJelly: boolean,
    temperature: number
}

type WaggleDance = {
    direction: number, //angle
    distance: number, //metre
    duration: number, //seconde
    quality: number, // 0-1
    foodSource: FoodSource,
    followers: Worker[]
}