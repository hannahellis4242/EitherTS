import Left,{left} from "../src/Left";
import Right,{right} from "../src/Right";

describe("Either",()=>{
    describe("Construction",()=>{
        test("can use left to construct left instance",()=>{
            const result = left<number,string>(42);
            expect(result).toBeInstanceOf(Left);
        })
        test("can use right to construct right instance",()=>{
            const result = right<Number,string>("42");
            expect(result).toBeInstanceOf(Right);
        })
    })
    describe("getting",()=>{
        describe("getOr",()=>{
            test("getting a left value from a left",()=>{
                const value = left<number,string>(42);
                const result = value.getOr(0);
                expect(result).toBe(42);
            })
            test("getting a left value from a right",()=>{
                const value = right<number,string>("42");
                const result = value.getOr(0);
                expect(result).toBe(0);
            })
        })
        describe("getOrThrow",()=>{
            test("getting a left value from a left",()=>{
                const value = left<number,string>(42);
                const result = value.getOrThrow();
                expect(result).toBe(42);
            })
            test("getting a left value from a right",()=>{
                const value = right<number,string>("42");
                expect(()=>value.getOrThrow()).toThrow(Error("Either : Attempting to get a Left value from a Right instance"));
            })
        })
    })
})