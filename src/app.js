class Hello {
  constructor(name) {
    this.name = name
  }

  hi() {
    alert(`let's start p5!! ${this.name}`)
  }
}

const palm = new Hello('palm')

palm.hi()
