interface Either<A,B>{
    getOr(_:A):A;
}

class Left<A,B>implements Either<A,B>{
    constructor(private data:A){}
    getOr(_:A){
        return this.data;
    }
}

class Right<A,B> implements Either<A,B>{
    constructor(private data:B){}
    getOr(x: A): A {
        return x;
    }
}

const left=<A,B>(x:A):Either<A,B>=>new Left<A,B>(x);
const right=<A,B>(x:B):Either<A,B>=>new Right<A,B>(x);

describe("Either",()=>{
    describe("Construction",()=>{
        test("can use left to construct left instance",()=>{
            const result = left<number,string>(42);
            expect(result).toBeInstanceOf(Left);
        })
        test("can use right to construct right instance",()=>{
            const result = right<Number,string>("42");
            expect(result).toBeInstanceOf(Right);
        })
    })
    describe("getting",()=>{
        describe("getOr",()=>{
            describe("getting a left value from a left",()=>{
                const value = left<number,string>(42);
                const result = value.getOr(0);
                expect(result).toBe(42);
            })
        })
    })
})