class Person {
    static title = '人类'
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    description() {
        console.log(`${Person.title} ${this.name}, 今年${this.age}岁.`);
    }
}

export {Person}