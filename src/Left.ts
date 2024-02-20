import Either from "./Either";
import Right from "./Right";

export default class Left<A,B>implements Either<A,B>{
    constructor(private data:A){}
    swap(): Either<B, A> {
        return new Right<B,A>(this.data);
    }
    getOrThrow(): A {
        return this.data;
    }
    getOr(_:A){
        return this.data;
    }
    map(fn:(x:A)=>A):Either<A,B>{
        return new Left(fn(this.data));
    }
}

export const left=<A,B>(x:A):Either<A,B>=>new Left<A,B>(x);