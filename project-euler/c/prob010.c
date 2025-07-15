#include <stdio.h>
#include <stdlib.h>

#define PRIMES 2000000

typedef struct {
    long *items;
    int count;
    int capacity;
} prime_arr_t;

void append_prime(prime_arr_t *arr, long prime) {
    if (sizeof(long) * (arr->count + 1) > arr->capacity) {
        arr->capacity *= 2;
        arr->items = realloc(arr->items, arr->capacity);
        if (arr->items == NULL) exit(1);
    }
    arr->items[arr->count++] = prime;
}

int main() {
    prime_arr_t prime_arr = {
        malloc(512), 0, 512
    };
    append_prime(&prime_arr, 2);
    long sum = 2;
    long num = 3;
    while (num < PRIMES) {
        for (int i = 0; i < prime_arr.count; i++) {
            if (num % prime_arr.items[i] == 0) {
                goto next_num;
            }
        }
        sum += num;
        append_prime(&prime_arr, num);
next_num:
        num += 2;
    }
    printf("sum: %ld\n", sum);
    free(prime_arr.items);
}
