import Either from "./Either";
export default class Right<A, B> implements Either<A, B> {
    private data;
    constructor(data: B);
    then(_: (x: A) => Either<A, B>): Either<A, B>;
    map<C>(_: (x: A) => C): Either<C, B>;
    swap(): Either<B, A>;
    getOrThrow(): A;
    getOr(x: A): A;
}
export declare const right: <A, B>(x: B) => Either<A, B>;
