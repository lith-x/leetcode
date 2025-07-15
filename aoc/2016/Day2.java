import java.util.List;
import java.util.Map;
import java.util.function.Function;

public class Day2 {
    public static void main(String[] args) {
        Day2.part1();
        Day2.part2();
    }

    private static void part1() {
        Map<Character, Function<Integer, Integer>> coolmap = Map.of(
                'U', num -> num > 3 ? num - 3 : num,
                'D', num -> num < 7 ? num + 3 : num,
                'R', num -> num % 3 != 0 ? num + 1 : num,
                'L', num -> num % 3 != 1 ? num - 1 : num);

        String[] lines = util.getStringDay(2).split("\n");
        int num = 5;
        String out = "";
        for (String line : lines) {
            for (char c : line.toCharArray()) {
                num = coolmap.get(c).apply(num);
            }
            out += Integer.toString(num);
        }
        System.out.println(out);
    }

    private static void part2() {
        List<Integer> up = List.of(1, 2, 4, 5, 9);
        List<Integer> down = List.of(5, 9, 10, 12, 13);
        List<Integer> left = List.of(1, 2, 5, 10, 13);
        List<Integer> right = List.of(1, 4, 9, 12, 13);

        Map<Character, Function<Integer, Integer>> coolmap = Map.of(
                'U', num -> up.contains(num) ? num : (num == 3 || num == 13 ? num - 2 : num - 4),
                'D', num -> down.contains(num) ? num : (num == 1 || num == 11 ? num + 2 : num + 4),
                'L', num -> left.contains(num) ? num : num - 1,
                'R', num -> right.contains(num) ? num : num + 1);

        String[] lines = util.getStringDay(2).split("\n");
        int num = 5;
        String out = "";
        for (String line : lines) {
            for (char c : line.toCharArray()) {
                num = coolmap.get(c).apply(num);
            }
            out += Integer.toString(num, 16);
        }
        System.out.println(out);
    }
}
