const day = process && process.argv && process.argv[2];

if (!day) {
  console.log("Please provide a day number");
  process.exit(1);
}

if (!day.match(/^\d\d_\d\d$/)) {
  console.log("Please provide a day number in the format 01_01");
  process.exit(1);
}

console.log(`Running day ${day}...`);

const solve = require(`./problems/${day}/${day}`)[`solve${day}`];
const input = require(`./problems/${day}/fixtures/input`)[`problemInput${day}`];

console.log(solve(input));
