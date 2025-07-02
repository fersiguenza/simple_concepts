---
title: "Dependency Injection: A Simple Guide"
author: "Fernando Sigüenza"
date: 2025-07-02
category: "Programming"
tags: ["programming", "design-patterns", "solid-principles"]
---

## What is it?

Dependency Injection is a programming technique where a class receives its dependencies from external sources rather than creating them itself.

## Simple Explanation

Imagine you're making a sandwich. You could go to the store, buy all the ingredients, prepare them, and then make your sandwich. But what if someone else brought you the prepared ingredients, and all you had to do was assemble them? That would be easier and more flexible, right?

That's dependency injection. Instead of a class creating or finding its own dependencies (like database connections, API clients, or services), those dependencies are "injected" from the outside.

There are three main ways to inject dependencies:
1. **Constructor Injection**: Dependencies are provided when the object is created
2. **Setter Injection**: Dependencies are provided through setter methods
3. **Interface Injection**: Dependencies are provided through interface methods

## Example

Let's look at a very simple example:

Without dependency injection:

```
class CoffeeMachine {
    // The coffee machine creates its own water heater
    constructor() {
        this.heater = new WaterHeater()
    }
    
    brewCoffee() {
        this.heater.heat()
        return "☕ Hot coffee ready!"
    }
}

// To make coffee
machine = new CoffeeMachine()
coffee = machine.brewCoffee()
```

With dependency injection:

```
class CoffeeMachine {
    // The coffee machine receives a water heater
    constructor(heater) {
        this.heater = heater
    }
    
    brewCoffee() {
        this.heater.heat()
        return "☕ Hot coffee ready!"
    }
}

// To make coffee
heater = new WaterHeater()
machine = new CoffeeMachine(heater)
coffee = machine.brewCoffee()

// For testing, we can use a fake heater that doesn't actually heat
testHeater = new FakeHeater()
testMachine = new CoffeeMachine(testHeater)
```

This simple example shows constructor injection. The main difference is that in the second example, the `CoffeeMachine` doesn't create its own heater - someone else gives it a heater to use.

It's like the difference between:
1. A coffee machine with a built-in heater that can't be replaced
2. A coffee machine where you can plug in different heaters

## Why it matters

Dependency injection makes your code:
1. **More testable**: You can easily substitute real dependencies with mocks or stubs
2. **More flexible**: You can swap implementations without changing the code
3. **More maintainable**: Classes have clearer responsibilities
4. **More aligned with SOLID principles**: Particularly the Dependency Inversion Principle

## Language-specific guides

Different languages have different patterns and frameworks for dependency injection:

- [Dependency Injection in Java](/explanations/programming/dependency-injection-java.md)
- [Dependency Injection in Go](/explanations/programming/dependency-injection-golang.md)
- [Dependency Injection in Python](/explanations/programming/dependency-injection-python.md)
- [Dependency Injection in JavaScript](/explanations/programming/dependency-injection-javascript.md)

## Related concepts

- [SOLID Principles](/explanations/programming/solid-principles.md)
- [Inversion of Control](/explanations/programming/inversion-of-control.md)
- [Unit Testing](/explanations/programming/unit-testing.md)
