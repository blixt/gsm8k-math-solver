# mathsolver

To run, first make sure you have [Yarn](https://yarnpkg.com/) and [Ollama](https://ollama.com/) installed.

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