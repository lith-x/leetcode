import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Day4 {
    public static void main(String[] args) {
        Day4.part1();
        Day4.part2();
    }

    private static void part1() {
        String[] lines = util.getStringDay(4).split("\n");
        int idsum = 0;
        roomstart: for (String line : lines) {
            // extract data from input text
            String[] parts = line.split("-");
            String[] sumpart = parts[parts.length - 1].split("\\[");
            int roomId = Integer.parseInt(sumpart[0]);
            char[] sum = sumpart[1].substring(0, sumpart[1].length() - 1).toCharArray();

            // get character counts
            Map<Character, Integer> charcount = new HashMap<>();
            for (int i = 0; i < parts.length - 1; i++)
                for (char c : parts[i].toCharArray())
                    charcount.put(c, charcount.getOrDefault(c, 0) + 1);

            // sort descending by count, if equal then alphabetical, pivot to list and
            // leverage java's timsort
            List<Map.Entry<Character, Integer>> list = new ArrayList<>(charcount.entrySet());
            list.sort((a, b) -> {
                int comp = b.getValue() - a.getValue();
                if (comp != 0)
                    return comp;
                return a.getKey() - b.getKey();
            });

            // check equality between checksum and counted characters
            List<Character> topfive = list.subList(0, 5).stream().map(x -> x.getKey()).toList();
            for (int i = 0; i < 5; i++) {
                if (!topfive.contains(sum[i])) {
                    continue roomstart;
                }
            }
            idsum += roomId;
        }
        System.out.println(idsum);
    }

    private static void part2() {
        String[] lines = util.getStringDay(4).split("\n");
        roomstart: for (String line : lines) {
            // extract data from input text
            String[] parts = line.split("-");
            String[] sumpart = parts[parts.length - 1].split("\\[");
            int roomId = Integer.parseInt(sumpart[0]);
            char[] sum = sumpart[1].substring(0, sumpart[1].length() - 1).toCharArray();

            // get character counts
            Map<Character, Integer> charcount = new HashMap<>();
            for (int i = 0; i < parts.length - 1; i++)
                for (char c : parts[i].toCharArray())
                    charcount.put(c, charcount.getOrDefault(c, 0) + 1);

            // sort descending by count, if equal then alphabetical, pivot to list and
            // leverage java's timsort
            List<Map.Entry<Character, Integer>> list = new ArrayList<>(charcount.entrySet());
            list.sort((a, b) -> {
                int comp = b.getValue().compareTo(a.getValue());
                if (comp != 0)
                    return comp;
                return a.getKey().compareTo(b.getKey());
            });

            // check equality between checksum and counted characters
            List<Character> topfive = list.subList(0, 5).stream().map(x -> x.getKey()).toList();
            for (int i = 0; i < 5; i++) {
                if (!topfive.contains(sum[i])) {
                    continue roomstart;
                }
            }
            String decrypted = line
                    .codePoints()
                    .map(x -> Character.isLowerCase(x) ? ((x - 97 + roomId) % 26) + 97 : x)
                    .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                    .toString()
                    .replace("-", " ");
            if (decrypted.contains("storage") && decrypted.contains("object")) {
                System.out.println(decrypted);
            }
        }
    }
}
