#include <stdio.h>

// note: i broke it trying to optimize, oops

#define ABUNDANT_MAX 28123
#define ABUNDANT_MIN 12

int is_abundant(int n) {
    int num = n;
    int divisor_sum = 0;
    for (int i = n / 2; i >= 1; i--) {
        if (!(num % i)) {
            divisor_sum += i;
        }
    }
    return divisor_sum > n;
}

int main() {
    int abundants[ABUNDANT_MAX] = {0};
    for (int i = ABUNDANT_MIN; i < ABUNDANT_MAX; i++)
        abundants[i] = is_abundant(i);

    char sums_lookup[ABUNDANT_MAX] = {0};
    for (int i = ABUNDANT_MIN; i < ABUNDANT_MAX; i++) {
        if (!abundants[i]) continue;
        for (int j = i; j < ABUNDANT_MAX; j++) {
            if (!abundants[j]) continue;
            int sum = abundants[i] + abundants[j];
            if (sum >= ABUNDANT_MAX) goto next_num;
            sums_lookup[sum] = 1;
        }
        next_num:;
    }

    long result = 0;
    for (int i = 1; i < ABUNDANT_MAX; i++) {
        result += sums_lookup[i] ? 0 : i;
    }
    printf("%ld\n", result);
}