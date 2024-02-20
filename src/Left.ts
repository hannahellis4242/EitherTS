import Either from "./Either";
import Right from "./Right";

export default class Left<A,B>implements Either<A,B>{
    constructor(private data:A){}
    promisify(): Promise<A> {
        return Promise.resolve(this.data);
    }
    then(fn: (x: A) => Either<A, B>): Either<A, B> {
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