#include <math.h>
#include <stdio.h>

long largest_prime(double n) {
    for (double i = ceil(sqrt(n)); i > 1; i -= 1.0)
        if (fmod(n, i) == 0.0 && largest_prime(i) == 1)
            return (long)i;
    return 1;
}

int main() {
    double num = 600851475143.0;
    long factor = largest_prime(num);
    printf("factor: %ld\n", factor);
}
