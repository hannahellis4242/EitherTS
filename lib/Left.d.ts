import Either from "./Either";
export default class Left<A, B> implements Either<A, B> {
    private data;
    constructor(data: A);
    then(fn: (x: A) => Either<A, B>): Either<A, B>;
    swap(): Either<B, A>;
    getOrThrow(): A;
    getOr(_: A): A;
    map<C>(fn: (x: A) => C): Either<C, B>;
}
export declare const left: <A, B>(x: A) => Either<A, B>;
