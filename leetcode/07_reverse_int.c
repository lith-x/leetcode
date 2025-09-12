#include <math.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

int reverse(int x) {
    if (x == 0) return 0;
    char intstr[512] = {0};
    long lx = x;
    int minus = 0;
    if (x < 0) {
        intstr[0] = '-';
        minus = 1;
        lx *= -1;
    }
    int digits = (int)log10l(lx) + 1;
    for (int i = minus; i < digits + minus; i++) {
        intstr[i] = (lx % 10) + '0';
        x /= 10;
    }
    intstr[digits + 1] = '\0';
    long res = strtol(intstr, NULL, 10);
    return res > INT32_MAX || res < INT32_MIN ? 0 : (int)res;
}

int main() {
    int num = -123;
    int rev = reverse(num);
    printf("%d : %d\n", num, rev);
}