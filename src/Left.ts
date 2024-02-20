import Either from "./Either";

export default class Left<A,B>implements Either<A,B>{
    constructor(private data:A){}
    getOrThrow(): A {
        return this.data;
    }
    getOr(_:A){
        return this.data;
    }
}

export const left=<A,B>(x:A):Either<A,B>=>new Left<A,B>(x);