import type { Season, FoodSource } from "./World";
import type { ValueOf } from "../types";



//* --- Const assertions ---

export const Bee = {
    Queen: 'queen',
    Worker: 'worker',
    Drone: 'drone'
} as const;

export const Sex = {
    Male: 'male',
    Female: 'female'
} as const;

//TODO Rôle basé sur l'age et les besoins de la ruche
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



//* --- Type aliases ---

type BaseBee = {
    age: number,
    health: number, // max = 100 (parfaite santé) min=0 (en train de mourir)
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
    juvenileHormone: number, //TODO si élevé -> vieillit + vite, devient butineuse, sort de la ruche, vieillit - longtemps
    vitellogenin: number, //TODO si élevé -> jeune physiologiquement, tache interieur, vit + longtemps, resiste mieux au stress
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

export type Larva = BaseBee & {
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



//* --- Factory functions ---

export function createQueen (): Queen {
    return { 
        age: 0,
        health: 100,
        stress: 0,
        sex: Sex.Female,
        maxLifeSpan: 1820,
        fertility: 0,
        isVirgin: true,
        pheromoneStrength: 0,
        spermCount: 0,
        laidEggsToday: 0
    }
}

export function createWorker (currentSeason : Season): Worker {
    return {
        age: 0,
        health: 100,
        stress: 0,
        sex: Sex.Female,
        maxLifeSpan: currentSeason === 'spring' || currentSeason === 'summer' ? 50 : 180 ,
        role: WorkerRole.Cleaner,
        juvenileHormone: 0,
        vitellogenin: 100,
        fatBodies: 0,
        foragingExperience: 0,
        knowFoodSources: []
    }
}

export function createDrone (): Drone {
    return {
        age: 0,
        health: 100,
        stress: 0,
        sex: Sex.Male,
        maxLifeSpan: 90,
        hasFlownToday: false,
        maturity: 0
    }
}

export function createLarva (isFertilized: boolean, fedRoyalJelly: boolean): Larva {
    return {
        age: 0,
        health: 100,
        stress: 0,
        stage: LarvaStage.Egg,
        daysInStage: 0,
        isFertilized,
        fedRoyalJelly,
        caste: !isFertilized ? Bee.Drone : (fedRoyalJelly ? Bee.Queen : Bee.Worker),
        temperature: 35
    }
}