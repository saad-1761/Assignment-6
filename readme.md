## What is the difference between var, let, and const?

## Answer:

- var : Function-scoped, can be re-declared and updated, hoisted (but initialized with undefined)
- let : Block-scoped, can be updated but not re-declared in the same scope.
- const : Block-scoped, must be initialized at declaration, cannot be reassigned (but objects/arrays inside can still be modified).

## What is the difference between map(), forEach(), and filter()?

## Answer:

- map() : Returns a new array with transformed values (same length as original).

- forEach() : Loops through elements, executes a function, but returns undefined (used for side effects).

- filter() : Returns a new array containing elements that pass a given condition.

## What are arrow functions in ES6?

## Answer:

Arrow functions are a shorter way to write functions. They are more concise, especially for simple operations. The most important difference is how they handle 'this:' unlike normal functions, arrow functions do not create their own 'this' but instead use the one from their surrounding scope. This makes them very useful in cases like callbacks, where normal functions often cause issues with 'this'. They also support implicit return when the function has only one expression, making code cleaner.

## How does destructuring assignment work in ES6?

## Answer:

Destructuring allows you to take values out of arrays or properties from objects and assign them to variables in a single step. Instead of manually accessing each value, destructuring provides a cleaner syntax. You can also rename variables during destructuring, skip values you don’t need, and even assign default values if something is missing. This makes working with structured data much more convenient and reduces repetitive code.

## Explain template literals in ES6. How are they different from string concatenation?

## Answer:

Template literals are a modern way to build strings. They use 'backticks' instead of quotes and support embedding variables or expressions directly inside the string. They can also span multiple lines without special characters, which makes them more readable. Additionally, template literals support advanced customization through tagged templates, where you can process the string before it’s created. Overall, they make string handling more powerful and intuitive compared to traditional concatenation.
