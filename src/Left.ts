import Either from "./Either";
import Right from "./Right";

export default class Left<A,B>implements Either<A,B>{
    constructor(private data:A){}
    teeBoth(fn: (a: A) => void, _: (b: B) => void): Either<A, B> {
        fn(this.data);
        return this;
    }
    teeRight(_: (a: B) => void): Either<A, B> {
        return this;
    }
    tee(fn: (x: A) => void): Either<A, B> {
        fn(this.data);
        return this;
    }
    promisify(): Promise<A> {
        return Promise.resolve(this.data);
    }
    then<C>(fn: (x: A) => Either<C,B>): Either<C,B> {
        return fn(this.data);
    }
    swap(): Either<B, A> {
        return new Right<B,A>(this.data);
    }
    getOrThrow(): A {
        return this.data;
    }
    getOr(_:A){
        return this.data;
    }
    map<C>(fn:(x:A)=>C):Either<C,B>{
        return new Left(fn(this.data));
    }
}

export const left=<A,B>(x:A):Either<A,B>=>new Left<A,B>(x);