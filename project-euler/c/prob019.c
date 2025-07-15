#include <stdio.h>

int monthdays[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

int main() {
    int sundays = 0;
    int weekday = 2; // Jan. 1st, 1901 is a Tuesday
    for (int year = 1901; year <= 2000; year++) {
        // manually do months until feb. for less branch-missing :)
        weekday += monthdays[0];
        sundays += !(weekday % 7);
        weekday += monthdays[1];
        if (year % 4 == 0 && (year % 400 == 0 || year % 100 != 0))
            weekday += 1;
        sundays += !(weekday % 7);
        for (int month = 2; month < 12; month++) {
            weekday += monthdays[month];
            sundays += !(weekday % 7);
        }
        weekday %= 7;
    }
    printf("%d\n", sundays);
    return 0;
}