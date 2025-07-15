import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map.Entry;

public class Day6 {
    public static void main(String[] args) {
        Day6.Part1();
        Day6.Part2();
    }

    private static void Part1() {
        String[] rawlines = util.getStringDay(6).split("\n");

        // transpose rows/columns
        String[] lines = new String[rawlines[0].length()];
        Arrays.fill(lines, "");
        for (String rawline : rawlines) {
            char[] chars = rawline.toCharArray();
            for (int i = 0; i < rawline.length(); i++) {
                lines[i] += chars[i];
            }
        }

        String msg = "";
        for (String line : lines) {
            HashMap<Character, Integer> charcount = new HashMap<>();
            for (char c : line.toCharArray())
                charcount.put(c, charcount.getOrDefault(c, 0) + 1);
            ArrayList<Entry<Character, Integer>> sorted = new ArrayList<>(charcount.entrySet());
            sorted.sort((a, b) -> b.getValue().compareTo(a.getValue()));
            msg += sorted.get(0).getKey();
        }

        System.out.println(msg);
    }

    private static void Part2() {
        String[] rawlines = util.getStringDay(6).split("\n");

        // transpose rows/columns
        String[] lines = new String[rawlines[0].length()];
        Arrays.fill(lines, "");
        for (String rawline : rawlines) {
            char[] chars = rawline.toCharArray();
            for (int i = 0; i < rawline.length(); i++) {
                lines[i] += chars[i];
            }
        }

        String msg = "";
        for (String line : lines) {
            HashMap<Character, Integer> charcount = new HashMap<>();
            for (char c : line.toCharArray())
                charcount.put(c, charcount.getOrDefault(c, 0) + 1);
            ArrayList<Entry<Character, Integer>> sorted = new ArrayList<>(charcount.entrySet());
            sorted.sort((a, b) -> a.getValue().compareTo(b.getValue()));
            msg += sorted.get(0).getKey();
        }

        System.out.println(msg);
    }
}
