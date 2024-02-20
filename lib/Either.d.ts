export default interface Either<A, B> {
    getOr(_: A): A;
    getOrThrow(): A;
    swap(): Either<B, A>;
    map<C>(fn: (x: A) => C): Either<C, B>;
    then<C>(fn: (x: A) => Either<C, B>): Either<C, B>;
    promisify(): Promise<A>;
    tee(fn: (x: A) => void): Either<A, B>;
    teeRight(fn: (a: B) => void): Either<A, B>;
    teeBoth(fn: (a: A) => void, fn2: (b: B) => void): Either<A, B>;
}
