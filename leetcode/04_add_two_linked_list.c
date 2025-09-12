#include <math.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

struct ListNode {
  int val;
  struct ListNode *next;
};

struct ListNode *addTwoNumbers(struct ListNode *l1, struct ListNode *l2) {
  struct ListNode *sum = malloc(sizeof(struct ListNode));
  struct ListNode *current = sum;
  int minor, carry = 0;
  while (true) {
    minor = carry;
    if (l1) {
      minor += l1->val;
      l1 = l1->next;
    }
    if (l2) {
      minor += l2->val;
      l2 = l2->next;
    }
    current->val = minor % 10;
    carry = minor / 10;
    if (!l1 && !l2) {
      current->next = NULL;
      break;
    }
    current->next = malloc(sizeof(struct ListNode));
    current = current->next;
  }
  if (carry) {
    current->next = malloc(sizeof(struct ListNode));
    current->next->next = NULL;
    current->next->val = carry;
  }
  return sum;
}

struct ListNode *make_list(int num) {
  struct ListNode *head = malloc(sizeof(struct ListNode));
  struct ListNode *current = head;
  int curr_num = num;
  int iter = log10(num);
  for (int i = 0; i < log10(num); i++) {
    current->val = curr_num % 10;
    if (i >= iter) {
      current->next = NULL;
      break;
    }
    current->next = malloc(sizeof(struct ListNode));
    current = current->next;
    curr_num /= 10;
  }
  return head;
}
void print_list(struct ListNode *node) {
  while (node) {
    printf("%c", node->val + '0');
    node = node->next;
  }
  printf("\n");
}

int main() {
  struct ListNode *num1 = make_list(9999999);
  struct ListNode *num2 = make_list(9999);
  struct ListNode *sum = addTwoNumbers(num1, num2);
  print_list(sum);
  free(num1);
  free(num2);
  free(sum);
}