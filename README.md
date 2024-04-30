# gsm8k-math-solver

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

(680) The elevator in Jack's building supports a maximum load of 700 kg. An
adult weighs an average of 80 kg. If Jack rides the elevator with 8 other
adults, by how much will they have exceeded the maximum load of the elevator?

### Solution 1 by Llama 3 70B 🟢

```javascript
const maxLoad = 700 // [1] 700
const adultWeight = 80 // [2] 80
const totalAdults = 9 // [3] 9 (Jack + 8 others)
const totalWeight = totalAdults * adultWeight // [4] 9 * 80 === 720
const excessLoad = totalWeight - maxLoad // [5] 720 - 700 === 20
console.log(`They will have exceeded the maximum load by ${excessLoad} kg.`) // [6] "They will have exceeded the maximum load by 20 kg."
```

Note that both the code and the comments have been generated by the LLM. In
theory this code can also be run to verify that the LLM "evaluated" the code
correctly.

### Question 2

(1103) A jellyfish tank has numerous jellyfish in it. A fifth of the jellyfish
are large, and a third of the large jellyfish change color from green to blue
under UV light. The other jellyfish are small and always stay blue. When a UV
light turned on, 6 jellyfish changed color. How many jellyfish are in the tank?

### Solution 2 by Llama 3 70B 🟡

In this solution, the LLM chose to use a loop to search for the answer, which
made the output very verbose. Most likely this could've been done much more
elegantly. Note that the `(...)` is also generated by the LLM.

Note that it doesn't always solve this question.

```javascript
let totalJellyfish = 0; // [1] 0
while (true) { // [2] (true)
    const largeJellyfish = totalJellyfish / 5; // [3] totalJellyfish / 5 === (totalJellyfish is unknown)
    const blueLargeJellyfish = largeJellyfish / 3; // [4] largeJellyfish / 3 === (largeJellyfish is unknown)
    if (blueLargeJellyfish === 6) { // [5] (blueLargeJellyfish === 6) === false
        break; // [6] n/a
    }
    totalJellyfish++; // [7] totalJellyfish + 1 === (totalJellyfish is unknown)
}
// Loop continues:
// [2] while (true) === true
// [3] largeJellyfish = totalJellyfish / 5 === 15 / 5 === 3
// [4] blueLargeJellyfish = 3 / 3 === 1
// [5] if (1 === 6) === false
// [6] n/a
// [7] totalJellyfish = 15 + 1 === 16
// (...)
// Loop continues:
// [2] while (true) === true
// [3] largeJellyfish = totalJellyfish / 5 === 30 / 5 === 6
// [4] blueLargeJellyfish = 6 / 3 === 2
// [5] if (2 === 6) === false
// [6] n/a
// [7] totalJellyfish = 30 + 1 === 31
// (...)
// Loop continues:
// [2] while (true) === true
// [3] largeJellyfish = totalJellyfish / 5 === 45 / 5 === 9
// [4] blueLargeJellyfish = 9 / 3 === 3
// [5] if (3 === 6) === false
// [6] n/a
// [7] totalJellyfish = 45 + 1 === 46
// (...)
// Loop continues:
// [2] while (true) === true
// [3] largeJellyfish = totalJellyfish / 5 === 60 / 5 === 12
// [4] blueLargeJellyfish = 12 / 3 === 4
// [5] if (4 === 6) === false
// [6] n/a
// [7] totalJellyfish = 60 + 1 === 61
// (...)
// Loop continues:
// [2] while (true) === true
// [3] largeJellyfish = totalJellyfish / 5 === 75 / 5 === 15
// [4] blueLargeJellyfish = 15 / 3 === 5
// [5] if (5 === 6) === false
// [6] n/a
// [7] totalJellyfish = 75 + 1 === 76
// (...)
// Loop continues:
// [2] while (true) === true
// [3] largeJellyfish = totalJellyfish / 5 === 90 / 5 === 18
// [4] blueLargeJellyfish = 18 / 3 === 6
// [5] if (6 === 6) === true
// [6] break
// Loop ended.
console.log(`There are ${totalJellyfish} jellyfish.`); // [8] "There are 90 jellyfish."
```

### Question 3

(1176) A teacher uses a 5-inch piece of chalk to write math equations on a
chalkboard for his students. The teacher likes to conserve chalk, so he tries to
only use 20% of the chalk each day. Since the teacher cannot write with a very
small piece of chalk, he recycles the chalk when it is smaller than 2 inches. On
Monday the teacher used a new piece of chalk. His students need extra help that
day, so he ended up writing more than usual. He used up 45% of the chalk by the
end of the day. If the teacher goes back to using only 20% of the chalk each
day, how many days does he have before he has to recycle this piece?

### Solution 3 by Llama 3 70B 🔴

While the code below does output the correct answer (2 days), the LLM failed to
"evaluate" the code correctly. Furthermore, the LLM often fails to solve this
problem as it tends to miss that the chalk length should decrease by 20% of its
current length, not the original length.

```javascript
const originalChalkLength = 5 // [1] 5
let chalkLength = originalChalkLength // [2] 5
chalkLength *= (1 - 0.45) // [3] 5 * (1 - 0.45) === 2.75
let daysBeforeRecycling = 0 // [4] 0

while (chalkLength >= 2) { // [5] while (2.75 >= 2) === true
    chalkLength *= (1 - 0.20) // [6] 2.75 * (1 - 0.20) === 2.2
    daysBeforeRecycling++ // [7] 0 + 1 === 1
    // Loop continues:
    // [5] while (2.2 >= 2) === true
    // [6] 2.2 * (1 - 0.20) === 1.76
    // [7] 1 + 1 === 2
    // (...);
    // Loop continues:
    // [5] while (1.42 >= 2) === false
    // [8] break;
    // Loop ended.
}
console.log(`The teacher has ${daysBeforeRecycling} days before he has to recycle this piece.`); // [9] "The teacher has 3 days before he has to recycle this piece."
```
