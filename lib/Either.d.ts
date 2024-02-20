export default interface Either<A, B> {
    getOr(_: A): A;
    getOrThrow(): A;
    swap(): Either<B, A>;
    map<C>(fn: (x: A) => C): Either<C, B>;
    then(fn: (x: A) => Either<A, B>): Either<A, B>;
}