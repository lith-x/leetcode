#!/bin/bash
# Usage: ./build.sh 1 a b c
# Runs: gcc prob001.c -la -lb -lc -o prob001

num=$(printf "%03d" "$1")
shift

libs=""
for lib in "$@"; do
  libs="$libs -l$lib"
done

gcc "prob${num}.c" $libs -O3 -o "prob${num}"