import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.function.Function;

public class Day7 {
    public static void main(String[] args) throws Exception {
        Day7.part1();
    }

    private static void part1() throws Exception {
        String[] lines = util.getStringDay(7).split("\n");
        int valid = 0;
        Function<String, Boolean> computeLine = (String line) -> {
            boolean thisIsValid = false;
            String[] parts = line.split("[\\[\\]]");
            List<String> outers = new ArrayList<>();
            List<String> inners = new ArrayList<>();
            for (int i = 0; i < parts.length; i += 2) {
                outers.add(parts[i]);
                if (i + 1 != parts.length)
                    inners.add(parts[i + 1]);
            }
            for (String outer : outers) {
                if (outer.matches(".*([a-zA-Z])(?!\\1)([a-zA-Z])\\2\\1.*")) {
                    thisIsValid = true;
                    break;
                }
            }
            for (String inner : inners) {
                if (inner.matches(".*([a-zA-Z])(?!\\1)([a-zA-Z])\\2\\1.*")) {
                    thisIsValid = false;
                    break;
                }
            }
            return thisIsValid;
        };

        var threadgroup = Executors.newWorkStealingPool();
        List<Future<Boolean>> results = new ArrayList<>();
        for (String line : lines) {
            results.add(threadgroup.submit(() -> computeLine.apply(line)));
        }
        while (results.size() > 0) {
            for (int i = 0; i < results.size(); i++) {
                if (results.get(i).isDone()) {
                    valid += results.get(i).get() ? 1 : 0;
                    results.remove(i);
                    i--;
                }
            }
        }
        threadgroup.shutdown();
        System.out.println(valid);
    }
}
