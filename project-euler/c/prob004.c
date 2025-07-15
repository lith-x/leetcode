#include <math.h>
#include <stdio.h>

int is_palindrome(int n) {
    int digits = (int)log10((double)n);
    char nstr[20];
    snprintf(nstr, 20, "%d", n);
    for (int i = 0; i <= digits / 2; i++) {
        if (nstr[i] != nstr[digits - i])
            return 0;
    }
    return 1;
}

int main() {
    // maybe just generate the palindromes next time
    for(int i = 999999; i >= 100000; i--) {
        if (!is_palindrome(i)) continue;
        for (int j = 100; j <= 999; j++) {
            int quot = i / j;
            if (i % j == 0 && quot >= 100 && quot <= 999) {
                printf("%d x %d = %d\n", i / j, j, i);
                goto done;
            }
        }
    }
done:;
}

