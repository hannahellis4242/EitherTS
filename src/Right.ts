import Either from "./Either";
import Left from "./Left";

export default class Right<A,B> implements Either<A,B>{
    constructor(private data:B){}
    teeBoth(_: (a: A) => void, fn: (b: B) => void): Either<A, B> {
        fn(this.data);
        return this;
    }
    teeRight(fn: (a: B) => void): Either<A, B> {
        fn(this.data);
        return this;
    }
    tee(_: (x: A) => void): Either<A, B> {
        return this;
    }
    promisify(): Promise<A> {
        return Promise.reject(this.data);
    }
    then<C>(_: (x: A) => Either<C, B>): Either<C, B> {
        return new Right(this.data);
    }
    map<C>(_: (x: A) => C): Either<C, B> {
        return new Right<C,B>(this.data);
    }
    swap(): Either<B, A> {
        return new Left<B,A>(this.data);
    }
    getOrThrow(): A {
        throw new Error("Either : Attempting to get a Left value from a Right instance");
    }
    getOr(x: A): A {
        return x;
    }
}

export const right=<A,B>(x:B):Either<A,B>=>new Right<A,B>(x);
