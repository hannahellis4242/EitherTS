import Either from "./Either";

export default class Right<A,B> implements Either<A,B>{
    constructor(private data:B){}
    getOrThrow(): A {
        throw new Error("Either : Attempting to get a Left value from a Right instance");
    }
    getOr(x: A): A {
        return x;
    }
}

export const right=<A,B>(x:B):Either<A,B>=>new Right<A,B>(x);
