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
            test("getting a left value from a left is the same value",()=>{
                const obj = {someStuff:"stuff"};
                const value = left<object,string>(obj);
                const result = value.getOr({});
                expect(result).toBe(obj);
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
    describe("swap",()=>{
        test("swapping a left gives a right",()=>{
            const value = left<number,string>(42);
            const result = value.swap();
            expect(result).toBeInstanceOf(Right);
            expect(result.getOr("hello")).toBe("hello");
        })
        test("swapping a right gives a left",()=>{
            const value = right<number,string>("42");
            const result = value.swap();
            expect(result).toBeInstanceOf(Left);
            expect(result.getOr("hello")).toBe("42");
        })
    })
    describe("map",()=>{
        test("mapping a left gives a left",()=>{
            const value = left(42);
            const result = value.map((x)=>x*x);
            expect(result).toBeInstanceOf(Left);
            expect(result.getOrThrow()).toBe(1764);
        })
        test("mapping a right gives back a new right",()=>{
            const value = right<number,string>("42");
            const result = value.map((x)=>x*x);
            expect(result).toBeInstanceOf(Right);
            expect(result.getOr(0)).toBe(0);
            const swapped = value.swap();
            expect(swapped.getOrThrow()).toBe("42");
        })
        test("mapping a left gives a left with an object",()=>{
            const wrapped = {value:52,message:"stuff"};
            const value = left(wrapped);
            const result = value.map((x)=>x.message);
            expect(result).toBeInstanceOf(Left);
            expect(result.getOrThrow()).toBe(wrapped.message);
        })
        test("mapping a right gives back a new right but keeps ref to object",()=>{
            const wrapped = {value:52,message:"stuff"};
            const value = right<number,object>(wrapped);
            const result = value.map((x)=>x*x);
            expect(result).toBeInstanceOf(Right);
            expect(result.getOr(0)).toBe(0);
            const swapped = value.swap();
            expect(swapped.getOrThrow()).toBe(wrapped);
        })
    })
    describe("then",()=>{
        test("then with a function that gives a left on a left gives a new left",()=>{
            const value = left(42);
            const result = value.then((_)=>left(21));
            expect(result).toBeInstanceOf(Left);
            expect(result.getOrThrow()).toBe(21);
        })
        test("then with a function that gives a right on a left gives a new right",()=>{
            const value = left(42);
            const result = value.then((_)=>right("right"));
            expect(result).toBeInstanceOf(Right);
            expect(result.getOr(0)).toBe(0);
            const swapped = result.swap();
            expect(swapped.getOrThrow()).toBe("right")
        })
        test("then with a function that gives a left on a right give back the same right",()=>{
            const value = right(42);
            const result = value.then((_)=>left(21));
            expect(result).toBeInstanceOf(Right);
            expect(result).toBe(value);
            expect(result.getOr(0)).toBe(0);
        })
        test("then with a function that gives a right on a right gives back the same right",()=>{
            const value = right(42);
            const result = value.then((_)=>right(1));
            expect(result).toBeInstanceOf(Right);
            expect(result).toBe(value);
            expect(result.getOr(0)).toBe(0);
            const swapped = result.swap();
            expect(swapped.getOrThrow()).toBe(42)
        })
    })
    describe("promisify",()=>{
        test("left goes to resolve",async ()=>{
            const value = left(42);
            const result = await value.promisify();
            expect(result).toBe(42);
        })
        test("right goes to reject",async()=>{
            const value = right("Error");
            try{
                const result = await value.promisify();
                fail(`got result ${result}`);
            }
            catch(e){
                expect(e).toBe("Error");
            }
        })
    })
    describe("tee",()=>{
        test("tee on a left",()=>{
            const value = left(99);
            const fn = jest.fn();
            const result = value.tee(fn);
            expect(result).toBe(value);
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn).toHaveBeenCalledWith(99);
        })
        test("tee on a right",()=>{
            const value = right(99);
            const fn = jest.fn();
            const result = value.tee(fn);
            expect(result).toBe(value);
            expect(fn).not.toHaveBeenCalled();
        })
        test("teeRight on a left",()=>{
            const value = left(99);
            const fn = jest.fn();
            const result = value.teeRight(fn);
            expect(result).toBe(value);
            expect(fn).not.toHaveBeenCalled();
        })
        test("teeRight on a right",()=>{
            const value = right(99);
            const fn = jest.fn();
            const result = value.teeRight(fn);
            expect(result).toBe(value);
            expect(fn).toHaveBeenCalledTimes(1);
            expect(fn).toHaveBeenCalledWith(99);
        })
    })
})