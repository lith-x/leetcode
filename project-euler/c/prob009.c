#include <stdio.h>

int main() {
    // exactly one pythagorean triplet where a + b + c = 1000
    // "exactly one" makes me think it's primitive
    // a = m^2 - n^2
    // b = 2mn
    // c = m^2 + n^2
    // m^2 - n^2 + 2mn + m^2 + n^2 == 1000
    // 2m^2 + 2mn = 1000
    // m > n, both positive
    // wolfram-alpha: m = 20, n = 5
    // a = 20^2 - 5^2 = 375
    // b = 2(20)(5) = 200
    // c = 20^2 + 5^2 = 425
    // 375 * 200 * 425 = 31875000
    printf("hi\n");
}
