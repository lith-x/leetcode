#include <stdio.h>

int main() {
    int a = 0;
    int b = 1;
    int c = 1;
    int sum = 0;
    while (c < 4000000) {
        if (c % 2 == 0)
            sum += c;
        c = a + b;
        a = b;
        b = c;
    }
    printf("%d\n", sum);
}
