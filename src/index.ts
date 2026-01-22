import { createQueen, createWorker, createDrone, createLarva } from "./models/Bee";
import { Season } from "./models/World";

console.log(`The Hive is alive !`);

const currentSeason = Season.Summer;
const queen = createQueen();
const worker = createWorker(currentSeason);
const drone = createDrone();
const larva = createLarva(true , false)

console.log(queen);
console.log(worker);
console.log(drone);
console.log(larva)