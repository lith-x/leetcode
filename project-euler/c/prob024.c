#include <gsl/gsl_permutation.h>

// thx gnu lol
int main() {
    gsl_permutation *perm = gsl_permutation_alloc(10);
    gsl_permutation_init(perm);
    for (int i = 0; i < 999999; i++)
        gsl_permutation_next(perm);
    gsl_permutation_fprintf(stdout, perm, "%u");
}