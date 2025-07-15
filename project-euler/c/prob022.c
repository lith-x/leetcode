#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

typedef struct str_array {
    size_t count;
    size_t capacity; // max item count, not bytes
    char **items;
} str_array;

str_array *array_create() {
    str_array *arr = malloc(sizeof(str_array));
    arr->capacity = 512;
    arr->items = malloc(arr->capacity * sizeof(char*));
    arr->count = 0;
    return arr;
}

void array_destroy(str_array *arr) {
    for (size_t i = 0; i < arr->count; i++)
        free(arr->items[i]);
    free(arr->items);
    free(arr);
}

void array_append(str_array *arr, char *str) {
    if (arr->count + 1 < arr->capacity)
        goto actually_append; // skip reallocation
    arr->capacity *= 2;
    arr->items = realloc(arr->items, arr->capacity * sizeof(char*));
    if (arr->items == NULL)
        exit(EXIT_FAILURE);
actually_append:
    arr->items[arr->count++] = str;
}

int strcmp_sort(const void *a, const void *b) {
    return strcmp(*(const char**)a, *(const char**)b);
}

int main() {
    FILE *names_file = fopen("./prob022_names.txt", "r");
    fseek(names_file, 0, SEEK_END);
    long fsize = ftell(names_file);
    fseek(names_file, 0, SEEK_SET);
    char *names_file_content = malloc(fsize + 1);
    if (fread(names_file_content, fsize, 1, names_file) == 0 && ferror(names_file))
        exit(EXIT_FAILURE);
    fclose(names_file);
    names_file_content[fsize] = '\0';

    str_array *arr = array_create();
    char *name = strtok(names_file_content, "\",\"");
    do {
        array_append(arr, strdup(name));
        name = strtok(NULL, "\",\"");
    } while (name != NULL);
    free(names_file_content);

    qsort(arr->items, arr->count, sizeof(char*), *strcmp_sort);

    long sum = 0;
    for (int i = 0; i < arr->count; i++) {
        long total = 0;
        for (int j = 0; arr->items[i][j] != '\0'; j++)
            total += arr->items[i][j] - 'A' + 1;
        sum += total * (i + 1);
    }
    array_destroy(arr);
    printf("%ld\n", sum);
    return 0;
}