/*
abcba
^
abcba
-^-
abcba
--^--
abcba
  -^-
abcba
    ^
*/

#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int getBoundNum(int len, int pos) {
  int first = 2 * pos + 1;
  int second = 2 * (len - pos) - 2;
  return first > second ? second : first;
}

char *longestPalindrome(char *s) {
  int longest = 0;
  int currlen = 0;
  int begin, end, tb, te;
  int len = (int)strlen(s);
  for (int i = 0; i < len; i++) {
    for (int o = 0; o <= 1; o++) {
      for (int j = 0; j < len; j++) {
        tb = i - j;
        te = i + j + o;
        if (tb < 0 || te >= len || s[tb] != s[te])
          break;
        currlen = 2 * j + 1 + o;
        if (currlen <= longest)
          continue;
        longest = currlen;
        begin = tb;
        end = te;
      }
    }
  }
  s[end + 1] = '\0';
  return s + begin;
}

int main() {
  char *pal = longestPalindrome("babad");
  printf("%s", pal);
  free(pal);
  return 0;
}

/*
floor(i / 2)
ceil(i / 2.0)


*/