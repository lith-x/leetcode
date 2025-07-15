
// PUBLIC VARS
const base = 5;
const modulo = 23;

class CryptoAgent {
    private val: number;
    constructor(val: number) {
        this.val = val;
    }
}

const factors: (n: number) => number[] = (n: number) => {
    const factors = [];
    const maxcheck = Math.floor(Math.sqrt(n));
    for (let i = 2; i <= maxcheck; i++) {
        if (n % i == 0) {
            n /= i;
            factors.push(i);
            if (n == 1) break;
            i--;
        }
    }
    return factors;
};

// euclidean algorithm
const gcd = (a: number, b: number) => {
    const [h, l] = a > b ? [a, b] : [b, a];
    const c = h - l * Math.floor(h / l);
    if (c == 0) return l;
    return gcd(l, c);
};

const totient: (n: number) => number = (n: number) => {
    if (n < 1) return 0;
    if (n == 1) return 1;
    for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
        if (n % i == 0) {
            if (gcd(i, n / i) == 1) return totient(i) * totient(n / i);
        }
    }
    return n - 1;
};

const homomorphismCheck = <T, U>(f: (t: T) => U, g_a: (t1: T, t2: T) => T, g_b: (u1: U, u2: U) => U) => {
    //uh
};

const main = () => {
    console.log(factors(20));
};

main();

/*

assume x is an integer
if x fits the mold of 5n + 3, then 2x will always fit the mold of 5m + 1

3x == 1 mod 5

5 == 3(1) + 2
3 == 2(1) + 1
2 == 1(2) + 0

(no answer)


given:
f: A -> B
f(g(x,y)) == g(f(x),f(y))

then:
x in A
y in A
g_A: (A,A) -> A
g_B: (B,B) -> B

f(g_A(x,y)) <=> f(A) <=> B
g_B(f(x),f(y)) <=> g_B(B,B) <=> B

*/