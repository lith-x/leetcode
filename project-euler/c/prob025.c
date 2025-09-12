#include <gmp.h>
#include <stdio.h>

int main() {
    char bignum_str[1001];
    bignum_str[0] = '1';
    for (int i = 1; i < 1000; i++)
        bignum_str[i] = '0';
    bignum_str[1000] = '\0';
    mpz_t a, b, quotient, thousand_digit, zero;
    mpz_init_set_ui(a, 1);
    mpz_init_set_ui(b, 0);
    mpz_init_set_ui(quotient, 0);
    mpz_init_set_str(thousand_digit, bignum_str, 10);
    mpz_init_set_ui(zero, 0);
    int iter = 1;
    while (!mpz_cmp(quotient, zero)) {
        mpz_add(a, a, b);
        mpz_sub(b, a, b);
        mpz_div(quotient, a, thousand_digit);
        iter += 1;
    }
    printf("%d\n", iter);
}