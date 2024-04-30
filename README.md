# mathsolver

To run, first make sure you have [Yarn](https://yarnpkg.com/) and
[Ollama](https://ollama.com/) installed.

Then, clone the repository with submodules:

```sh
git clone --recurse-submodules https://github.com/blixt/gsm8k-math-solver.git
```

Install dependencies:

```sh
yarn install
```

Finally, open the folder in VS Code, go to "Run and Debug" and then "Run" and
you should see output in the Debug Console.

If you don't use VS Code, just compile with `yarn run tsc` then `node index.js`.

## The theory

By making the LLM write executable JavaScript and also show how that code
evaluates step by step, we can solve more complex problems because code
naturally splits them up into logical units, and the LLM has seen a lot of code
to be able to predict its behavior.

## Examples

### Question 1

The elevator in Jack's building supports a maximum load of 700 kg. An adult
weighs an average of 80 kg. If Jack rides the elevator with 8 other adults, by
how much will they have exceeded the maximum load of the elevator?

### Solution 1 by Llama 3 70B ✅

```javascript
const maxLoad = 700 // (1) 700
const adultWeight = 80 // (2) 80
const totalAdults = 9 // (3) 9 (including Jack)
const totalWeight = totalAdults * adultWeight // (4) 9 * 80 === 720
const excessLoad = totalWeight - maxLoad // (5) 720 - 700 === 20
console.log(`They will have exceeded the maximum load of the elevator by ${excessLoad} kg.`) // (6) "They will have exceeded the maximum load of the elevator by 20 kg."
```

### Question 2

A jellyfish tank has numerous jellyfish in it. A fifth of the jellyfish are
large, and a third of the large jellyfish change color from green to blue under
UV light. The other jellyfish are small and always stay blue. When a UV light
turned on, 6 jellyfish changed color. How many jellyfish are in the tank?

### Solution 2 by Llama 3 70B ✅

In this solution, the LLM chose to use a loop to search for the answer, which
made the output very verbose. Most likely this could've been done much more
elegantly.

```javascript
let totalJellyfish = 0; // (1) 0
while (true) {
    const largeJellyfish = totalJellyfish / 5; // (2) 0 / 5 === 0
    const colorChangingJellyfish = largeJellyfish / 3; // (3) 0 / 3 === 0
    if (colorChangingJellyfish === 6) { // (4) 0 === 6 === false
        break; // (5) no break
    }
    totalJellyfish++; // (6) 0 + 1 === 1
}
// Loop continues:
// (2) 1 / 5 === 0.2
// (3) 0.2 / 3 === 0.0667...
// (4) 0.0667... !== 6 === false
// (5) no break
// (6) 1 + 1 === 2
// (...)
// Loop continues:
// (2) 18 / 5 === 3.6
// (3) 3.6 / 3 === 1.2
// (4) 1.2 !== 6 === false
// (5) no break
// (6) 18 + 1 === 19
// (...)
// Loop continues:
// (2) 33 / 5 === 6.6
// (3) 6.6 / 3 === 2.2
// (4) 2.2 !== 6 === false
// (5) no break
// (6) 33 + 1 === 34
// (...)
// Loop continues:
// (2) 42 / 5 === 8.4
// (3) 8.4 / 3 === 2.8
// (4) 2.8 !== 6 === false
// (5) no break
// (6) 42 + 1 === 43
// (...)
// Loop continues:
// (2) 51 / 5 === 10.2
// (3) 10.2 / 3 === 3.4
// (4) 3.4 !== 6 === false
// (5) no break
// (6) 51 + 1 === 52
// (...)
// Loop continues:
// (2) 60 / 5 === 12
// (3) 12 / 3 === 4
// (4) 4 !== 6 === false
// (5) no break
// (6) 60 + 1 === 61
// (...)
// Loop continues:
// (2) 72 / 5 === 14.4
// (3) 14.4 / 3 === 4.8
// (4) 4.8 !== 6 === false
// (5) no break
// (6) 72 + 1 === 73
// (...)
// Loop continues:
// (2) 84 / 5 === 16.8
// (3) 16.8 / 3 === 5.6
// (4) 5.6 !== 6 === false
// (5) no break
// (6) 84 + 1 === 85
// (...)
// Loop continues:
// (2) 90 / 5 === 18
// (3) 18 / 3 === 6
// (4) 6 === 6 === true
// (5) break
console.log(`There are ${totalJellyfish} jellyfish.`); // (7) "There are 90 jellyfish."
```
