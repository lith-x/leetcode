#include <gmp.h>
#include <stdio.h>

// using my own library to generate primes, responsible
// for PrimeArray and primes_* functions
#include "get_prime.h"

// https://mathworld.wolfram.com/FullReptendPrime.html
// p is a full reptend prime when
//    10^k % p == 1
//    ONLY if k == p-1, where k is in range [1..p-1]

// assuming length of the cyclic number increases with the full reptend
// prime that's responsible, just find largest full reptend prime < 1000

int main() {
    PrimeArray primes = {0};
    primes_init(&primes, 256);
    
    long prime, largest_reptend = -1;
    primes_next(&primes, &prime); // get first prime num into "prime" variable
    
    // using gmp, an arbitrary precision math lib, cuz 10^p probably blows past
    // anything that can be held in a single variable.
    mpz_t tenpower, modulo_p;
    mpz_init(tenpower);
    mpz_init(modulo_p);

    while (prime < 1000) {
        // check every power x for result of (10^x % p), if
        // anything but the very last iteration (p-1) is 1,
        // skip, otherwise, new top result.
        mpz_set_ui(tenpower, 1);
        for (int i = 1; i < prime; i++) {
            mpz_mul_ui(tenpower, tenpower, 10);
            mpz_mod_ui(modulo_p, tenpower, prime);
            if (!mpz_cmp_ui(modulo_p, 1)) {
                if (i == prime - 1) {
                    largest_reptend = prime;
                }
                break;
            }
        }
        primes_next(&primes, &prime);
    }
    printf("%ld\n", largest_reptend);
    return 0;
}