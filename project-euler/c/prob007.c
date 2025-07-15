#include <math.h>
#include <stdio.h>

#define GOAL 10001

int main() {
    int primes[GOAL] = {2,0};
    int count = 1;
    int num = 3;
    while (count < GOAL) {
        int upper = (int)ceil(sqrt((double)num));
        for (int i = 0; i < count; i++) {
            if (num % primes[i] == 0) {
                goto next_num;
            }
        }
        primes[count++] = num;
next_num:
        num++;
    }
    printf("%d prime: %d\n", GOAL, primes[GOAL - 1]);
}
