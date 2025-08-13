# Reposit test

## Build

This was written with node v24.5.0, if you are having issues on earlier versions, consider updating to this one.

Built using npm. Run `npm i` to install project dependencies.

## Run

Each function has an instance in `playground.ts` that can be run using `node playground.ts`. Feel free to edit the values in the arguments to test out the function

## Tests

The tests are simple unit tests written in jest. They are not exhaustive but check the main functionality of the project.
`npm test` to run the tests.

## Additional notes

- I converted the csv dataset into json for ease of use
- An error occurs on the running `node playground.ts` relating to the module vs commonjs syntax. I've opted not to deal with this given time constraints.
