

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* convert(char* s, int numRows) {
    int len = (int)strlen(s);
    if (numRows == 1 || len <= numRows) return strdup(s);
    char *zz = malloc(len + 1);
    int idx, a, b, inc, acc = -1;
    for (int i = 0; i < numRows; i++) {
        idx = i;
        zz[++acc] = s[idx];
        inc = (numRows - 1) * 2;
        b = 2 * i;
        a = inc - b;
        while (1) {
            idx += a;
            if (idx >= len) break;
            if (a) zz[++acc] = s[idx];
            idx += b;
            if (idx >= len) break;
            if (b) zz[++acc] = s[idx];
        }
    }
    zz[len] = '\0';
    return zz;
}

int main() {
    char *t = "PAYPALISHIRING";
    char *zz = convert(t, 3);
    printf("%s\n", t);
}

/*

5 -> 8

idx = i
factor = (numRows - 1) * 2



5
A       I       Q       Y <- +0,[+8,+0]*
B     H J     P R     X Z <- +1,[+6,+2]*
C   G   K   O   S   W     <- +2,[+4,+4]*
D F     L N     T V       <- +3,[+2,+6]*
E       M       U         <- +4,[+0,+8]*

- a b a b a b
B H J P R X Z
*/