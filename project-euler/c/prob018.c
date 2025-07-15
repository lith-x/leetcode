#include <stdio.h>

#define ROWS 15

const int triangle[] = {
                                75, 
                              95, 64,
                            17, 47, 82,
                          18, 35, 87, 10,
                        20,  4, 82, 47, 65,
                      19,  1, 23, 75,  3, 34,
                    88,  2, 77, 73,  7, 63, 67,
                  99, 65,  4, 28,  6, 16, 70, 92,
                41, 41, 26, 56, 83, 40, 80, 70, 33,
              41, 48, 72, 33, 47, 32, 37, 16, 94, 29,
            53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14,
          70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57,
        91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48,
      63, 66,  4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31,
     4, 62, 98, 27, 23, 9,  70, 98, 73, 93, 38, 53, 60,  4, 23
};

static inline int tri_num(int row, int col) {
    // arithmetic series n(n+1)/2 (divide by 2 is equiv to ">> 1"), column is additional offset
    return triangle[((row * (row + 1)) >> 1) + col];
}

int main() {
    int largest_sum = 0;
    // idea: choice to go left or right is encoded as a bit in an integer,
    // go through all choice combinations i.e. integers
    for (int bitfield = 0; bitfield < (1 << ROWS); bitfield++) {
        int path_sum = 0;
        int col = 0;
        for (int row = 0; row < ROWS; row++)
            // if bit = 0, go left, else, go right (postfix since we have to start at column 0)
            path_sum += tri_num(row, (bitfield >> row) & 1 ? col : col++);
        if (path_sum > largest_sum)
            largest_sum = path_sum;
    }
    printf("%d\n", largest_sum);
    return 0;
}