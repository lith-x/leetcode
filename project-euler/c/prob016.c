#include <stdio.h>
#include <stdlib.h>

// 1,523 => [3] -> [2] -> [5] -> [1]
typedef struct node_t {
    char val;
    struct node_t *next;
} node_t;

typedef struct bignum_t {
    node_t *least;
    node_t *most;
} bignum_t;

void mult(bignum_t *bignum, char num) {}

int main() {
    node_t *head = malloc(sizeof(node_t));
    head->val = 1;
    head->next = NULL;
    bignum_t bignum = {.least = head, .most = head};
    for (int i = 0; i < 1000; i++) {
        node_t *node = head;
        char carry = 0;
        while (node != NULL) {
            char new_val = node->val * 2 + carry;
            node->val = new_val % 10;
            carry = new_val / 10;
            node = node->next;
        }
        while (carry > 0) {
            node_t *new_tail = malloc(sizeof(node_t));
            new_tail->val = carry;
            new_tail->next = NULL;
            bignum.most->next = new_tail;
            bignum.most = new_tail;
            carry /= 10;
        }
    }
    node_t *node = bignum.least;
    int digit_sum = 0;
    while (node != NULL) {
        digit_sum += node->val;
        node_t *prev = node;
        node = node->next;
        free(prev);
    }
    printf("sum: %d\n", digit_sum);
    return 0;
}