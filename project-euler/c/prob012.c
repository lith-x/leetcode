#include <limits.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>

// number of factors = prime factorization (p_1^x)(p_2^y)(p_2^z)... -> (x + 1)(y + 1)(z + 1)...
// nth triangular number = n(n+1)/2
//
// question: smallest n where n(n+1)/2 has factorization s.t. (x+1)(y+1)... > 500
typedef struct {
    long *items;
    int capacity;
    int count;
} arr_t;

void arr_append(arr_t *arr, long num) {
    if (arr->capacity == 0) {
        arr->capacity = 512;
        arr->items = malloc(arr->capacity);
    } else if (sizeof(long) * (arr->count + 1) > arr->capacity) {
        arr->capacity *= 2;
        arr->items = realloc(arr->items, arr->capacity);
        if (arr->items == NULL) exit(1);
    }
    arr->items[arr->count++] = num;
}

void arr_destroy(arr_t *arr) {
    free(arr->items);
    arr->items = NULL;
    arr->count = 0;
    arr->capacity = 0;
}

int main() {
    long ans = 2;
    long triangular;
    arr_t num_arr = {0};
    while (1) {
        triangular = ans * (ans + 1) / 2;
        int num_sqrt = (int)sqrt((double)triangular);
        for (int i = 1; i <= num_sqrt; i++) {
            if (triangular % i == 0) {
                arr_append(&num_arr, i);
                if (i != num_sqrt)
                    arr_append(&num_arr, triangular / i);
            }
        }
        if (num_arr.count > 500) break;
        ans += 1;
        arr_destroy(&num_arr);
        if (triangular >= LONG_MAX / 4 * 3)
            break; // emergency killswitch
    }
    if (num_arr.capacity > 0) arr_destroy(&num_arr);
    printf("%ld\n", triangular);
}
