export default interface Either<A,B>{
    getOr(_:A):A;
    getOrThrow():A;
    swap():Either<B,A>;
    map(fn:(x:A)=>A):Either<A,B>;
}