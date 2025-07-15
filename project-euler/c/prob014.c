#include <stdio.h>
#include <stdlib.h>

// numbers checked: 1 to ARRAY_SIZE-1
#define ARRAY_SIZE 100000000

int main() {
    // idea: index is starting number, store sequence length there woohoo
    int *array = calloc(ARRAY_SIZE, sizeof(int));
    array[1] = 1;
    int longest_len = 0;
    int longest_start = 0;

    for (long sequence_start = 2; sequence_start < ARRAY_SIZE; sequence_start += 1) {
        long sequence_num = sequence_start;
        int sequence_len = 0;

        while (sequence_num != 1) {
            // relevant math, if (n % 2 == 0) n = 3n+1, else n = n/2
            sequence_num = sequence_num & 1 ? (sequence_num << 1) + sequence_num + 1 : sequence_num >> 1;
            sequence_len += 1;

            // if we're in range, check if sequence length is already there
            if (sequence_num < ARRAY_SIZE && array[sequence_num] > 0) {
                array[sequence_start] = array[sequence_num] + sequence_len;
                break;
            }
        }

        if (array[sequence_start] > longest_len) {
            longest_len = array[sequence_start];
            longest_start = sequence_start;
        }
    }

    free(array);
    printf("%d: %d\n", longest_start, longest_len);
    return 0;
}