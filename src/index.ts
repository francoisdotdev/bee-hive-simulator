import { Queen, Season, Worker, Drone } from "./models/Bee";

console.log(`The Hive is alive !`);

const queen = new Queen(0, 10, 0, 0, 0, true, 0, 0);
const worker = new Worker(0, 10, 0, Season.winter);
const drone = new Drone(0, 10, 0)

console.log(queen);
console.log(worker);
console.log(drone);