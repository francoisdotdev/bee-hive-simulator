export enum Sex {
    male= 'Male',
    female= 'Female'
}

export enum Season {
    spring= 'Spring',
    summer= 'Summer',
    autumn= 'Autumn',
    winter= 'Winter'
}

export abstract class Bee {

    constructor(
        public age: number,
        public sex: Sex,
        public health: number,
        public maturity: number,
        public readonly maxLifespan: number
        ) {}
}

export class Queen extends Bee {
    constructor(
        age: number,
        health: number,
        maturity: number,
        public fertility: number,
        public pheromoneStrength: number,
        public isVirgin: boolean,
        public spermCount: number,
        public eggsLaidToday: number
    ) {
        super(age, Sex.female, health, maturity, 260)
    }
}

export class Worker extends Bee {
    constructor(
        age: number,
        health: number,
        maturity: number,
        season: Season
    ) {
        super(age, Sex.female, health, maturity, ( season === Season.spring || season === Season.summer ? 6 : 24))
    }
}

export class Drone extends Bee {
    constructor(
        age: number,
        health: number,
        maturity: number
    ) {
        super(age, Sex.male, health, maturity, 8)
    }
}