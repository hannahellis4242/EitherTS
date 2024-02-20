import Either from "./Either";
export default class Left<A, B> implements Either<A, B> {
    private data;
    constructor(data: A);
    teeBoth(fn: (a: A) => void, _: (b: B) => void): Either<A, B>;
    teeRight(_: (a: B) => void): Either<A, B>;
    tee(fn: (x: A) => void): Either<A, B>;
    promisify(): Promise<A>;
    then(fn: (x: A) => Either<A, B>): Either<A, B>;
    swap(): Either<B, A>;
    getOrThrow(): A;
    getOr(_: A): A;
    map<C>(fn: (x: A) => C): Either<C, B>;
}
export declare const left: <A, B>(x: A) => Either<A, B>;
