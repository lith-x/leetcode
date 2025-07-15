#include <gmp.h>
#include <stdio.h>

// gmp triggers a lot of false positives with windows defender, idk why.

int main() {
    mpz_t total = {0};
    mpz_t temp = {0};
    mpz_init_set_ui((mpz_ptr)&total, 1);
    mpz_init((mpz_ptr)&temp);
    for (long i = 2; i <= 100; i++) {
        mpz_set((mpz_ptr)&temp, (mpz_srcptr)&total);
        mpz_mul_ui((mpz_ptr)&total, (mpz_srcptr)&temp, i);
    }
    long sum = mpz_fdiv_q_ui((mpz_ptr)&temp, (mpz_ptr)&total, 10);
    while (mpz_cmp_si((mpz_ptr)&temp, 0) > 0) {
        mpz_set((mpz_ptr)&total, (mpz_srcptr)&temp);
        sum += mpz_fdiv_q_ui((mpz_ptr)&temp, (mpz_ptr)&total, 10);
    }
    printf("%ld\n", sum);
    return 0;
}