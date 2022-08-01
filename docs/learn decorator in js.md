# Basic example

A decorator can be used is `Class` and its members.

```ts
@classDecorator
class Person {
    @propertyDecorator
    public name: string;

    @accessorDecorator
    get fullName() {
        // ...
    }

    @methodDecorator
    printName(@parameterDecorator prefix: string) {
        // ...
    }
}
```

# Create class decorators

To create your own decorator, you have to create a function with the same name as your decorator.

```ts
@sealed
class Person {}

// function of decorator
function sealed(target: Function) {
    Object.seal(target);
    Object.seal(target.prototype);
}
```

# Create Decorator Factories

Here, your decoratorA function returns another function with the implementation of the decorator.

DecoratorA does not have the implementation directly, instead it returns a function that implements the decorator.

So DeocratorA is like a wrapper of the real decorator it returns.

```ts
const decoratorA = (someBooleanFlag: boolean) => {
    return (target: Function) => {};
};

@decoratorA(true)
class Person {}
```

# Create Property Decorators

```ts
const printMemberName = (target: any, memberName: string) => {
    console.log(memberName);
};

class Person {
    @printMemberName
    name: string = 'Jon';
}
```

you can use `Object.defineProperty()` to customize the property.

# Create Method Decorators

```ts
const enumerable = (value: boolean) => {
    return (
        target: any,
        memberName: string,
        propertyDescriptor: PropertyDescriptor
    ) => {
        propertyDescriptor.enumerable = value;
    };
};

class Person {
    firstName: string = 'Jon';
    lastName: string = 'Doe';

    @enumerable(true)
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
```
