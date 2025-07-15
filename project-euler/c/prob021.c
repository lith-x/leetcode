#include <math.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

#define NUMS 10001

int sum_of_divisors(int num) {
    int sum = 1;
    int upper_div = (int)floorf(sqrtf((float)num));
    for (int i = 2; i <= upper_div; i++) {
        if (num % i == 0) {
            sum += i + num / i;
        }
    }
    return sum;
}

int main() {
    uint8_t *num_lookup = calloc(NUMS, sizeof(uint8_t));
    for (int num = 1; num < NUMS; num++) {
        if (num_lookup[num] == 1)
            continue;
        int divisor_sum = sum_of_divisors(num);
        if (divisor_sum == num)
            continue;
        if (sum_of_divisors(divisor_sum) == num) {
            num_lookup[num] = 1;
            num_lookup[divisor_sum] = 1;
        }
    }
    int sum = 0;
    for (int i = 1; i < NUMS; i++) {
        if (num_lookup[i]) {
            sum += i;
        }
    }
    printf("%d\n", sum);
    free(num_lookup);
    return 0;
}