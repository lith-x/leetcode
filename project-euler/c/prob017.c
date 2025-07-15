#include <stdio.h>
#include <string.h>

int main() {

    char *digits[11] = {"",    "one",   "two",   "three", "four", "five",
                        "six", "seven", "eight", "nine",  "ten"};
    char *teens[9] = {"eleven",  "twelve",    "thirteen", "fourteen", "fifteen",
                      "sixteen", "seventeen", "eighteen", "nineteen"};
    char *tens[8] = {"twenty", "thirty",  "forty",  "fifty",
                     "sixty",  "seventy", "eighty", "ninety"};
    char *hundred = "hundred";
    char *and = "and";
    long sum = 11; // pre-counting one thousand
    char num_str[100];

    for (int h = 0; h <= 9; h++) {
        if (h > 0) {
            sum += strlen(digits[h]);
            sum += strlen(hundred);
        }

        // tens
        for (int i = 1; i <= 10; i++) {
            if (h > 0) {
                sum += strlen(digits[h]) + strlen(hundred) + strlen(and);
            }
            sum += strlen(digits[i]);
        }

        // teens
        for (int i = 0; i < 9; i++) {
            if (h > 0) {
                sum += strlen(digits[h]) + strlen(hundred) + strlen(and);
            }
            sum += strlen(teens[i]);
        }

        // rest of tens-place
        for (int i = 0; i < 8; i++) {
            for (int j = 0; j <= 9; j++) {
                if (h > 0) {
                    sum += strlen(digits[h]) + strlen(hundred) + strlen(and);
                }
                sum += strlen(tens[i]);
                sum += strlen(digits[j]);
            }
        }
    }
    printf("%ld\n", sum);
    return 0;
}

/*
s = [
one
...
nineteen

twenty
twenty one
twenty two
twenty three
twenty four
twenty five
twenty six
twenty seven
twenty eight
twenty nine
thirty
thirty one
...
ninety nine
]

one hundred
one hundred and [s]
two hundred
two hundred and [s]
...
nine hundred and [s]
one thousand

*/