#include <gmp.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    long *items;
    size_t count;
    size_t capacity;
} PrimeArray;

// standard "double capacity when we've reached capacity" dynamic array
static inline void _primes_append(PrimeArray *arr, long prime) {
    if (sizeof(long) * (arr->count + 1) > arr->capacity) {
        arr->capacity *= 2;
        arr->items = (long *)realloc(arr->items, arr->capacity);
        if (arr->items == NULL) {
            fprintf(stderr, "Could not acquire memory for prime array.");
            exit(1);
        }
    }
    arr->items[arr->count++] = prime;
}

static inline void primes_init(PrimeArray *arr, size_t init_capacity) {
    arr->count = 0;
    arr->capacity = init_capacity;
    arr->items = (long *)calloc(init_capacity, sizeof(long));
}

static inline void primes_next(PrimeArray *arr, long *next) {
    if (arr->count == 0) {
        _primes_append(arr, 2);
        *next = 2;
    }

    long next_prime = arr->items[arr->count - 1];
    // most graceful way to start sequence w/ 2,3,...
    // while still being able to only consider odds (+= 2) 
    if (next_prime == 2)
        next_prime = 1;

    int is_prime;
    while (true) {
        is_prime = 1;
        next_prime += 2;
        for (int i = 0; i < arr->count; i++) {
            if (!(next_prime % arr->items[i])) {
                is_prime = 0;
                break;
            }
        }
        if (is_prime)
            break;
    }
    _primes_append(arr, next_prime);
    *next = next_prime;
}

static inline void destroy_primes(PrimeArray *arr) {
    free(arr->items);
    arr->items = NULL;
    arr->count = arr->capacity = 0;
}

// Pretty much the exact same as above, just all
// arithmetic is swapped out with gmp-equivalents.

typedef struct {
    mpz_t *items;
    size_t count;
    size_t capacity;
} ArbPrimeArray;

static inline void arb_primes_init(ArbPrimeArray *arr, size_t init_capacity) {
    arr->count = 0;
    arr->capacity = init_capacity;
    arr->items = (mpz_t *)malloc(init_capacity * sizeof(mpz_t));
    for (size_t i = 0; i < init_capacity; i++) {
        mpz_init(arr->items[i]);
    }
}

static inline void _arb_primes_append(ArbPrimeArray *arr, mpz_srcptr value) {
    if (arr->count == arr->capacity) {
        size_t new_capacity = arr->capacity * 2;
        arr->items = (mpz_t *)realloc(arr->items, new_capacity * sizeof(mpz_t));
        if (!arr->items) {
            fprintf(stderr, "Could not acquire memory for arbitrary-precision "
                            "prime array.");
            exit(1);
        }

        for (size_t i = arr->capacity; i < new_capacity; i++) {
            mpz_init(arr->items[i]);
        }
        arr->capacity = new_capacity;
    }
    mpz_set(arr->items[arr->count], value);
    arr->count++;
}

static inline void arb_primes_next(ArbPrimeArray *arr, mpz_ptr next) {
    mpz_t next_prime;
    mpz_init(next_prime);
    if (arr->count == 0) {
        mpz_set_ui(next_prime, 2);
        _arb_primes_append(arr, next_prime);
        mpz_set(next, next_prime);
        return;
    }

    mpz_set(next_prime, arr->items[arr->count - 1]);
    if (!mpz_cmp_ui(next_prime, 2))
        mpz_sub_ui(next_prime, next_prime, 1);

    int is_prime;
    while (true) {
        is_prime = 1;
        mpz_add_ui(next_prime, next_prime, 2);
        for (int i = 0; i < arr->count; i++) {
            if (mpz_divisible_p(next_prime, arr->items[i])) {
                is_prime = 0;
                break;
            }
        }
        if (is_prime)
            break;
    }
    _arb_primes_append(arr, next_prime);
    mpz_set(next, next_prime);
}

static inline void arb_primes_clear(ArbPrimeArray *arr) {
    for (size_t i = 0; i < arr->capacity; i++) {
        mpz_clear(arr->items[i]);
    }
    free(arr->items);
    arr->items = NULL;
    arr->count = arr->capacity = 0;
}