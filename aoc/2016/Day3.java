public class Day3 {
    public static void main(String[] args) {
        Day3.part1();
        Day3.part2();
    }

    private static void part1() {
        String[] lines = util.getStringDay(3).split("\n");
        int possible = 0;
        for (String line : lines) {
            int[] tri = new int[] {
                    Integer.parseInt(line.substring(0, 5).trim()),
                    Integer.parseInt(line.substring(5, 10).trim()),
                    Integer.parseInt(line.substring(10, 15).trim()) };
            if (tri[0] + tri[1] > tri[2] && tri[0] + tri[2] > tri[1] && tri[1] + tri[2] > tri[0])
                possible++;
        }
        System.out.println(possible);
    }

    private static void part2() {
        String[] lines = util.getStringDay(3).split("\n");
        int possible = 0;
        for (int i = 0; i < lines.length; i += 3) {
            for (int j = 0; j < 3; j++) {
                int[] tri = {
                        Integer.parseInt(lines[i].substring(j * 5, (j + 1) * 5).trim()),
                        Integer.parseInt(lines[i + 1].substring(j * 5, (j + 1) * 5).trim()),
                        Integer.parseInt(lines[i + 2].substring(j * 5, (j + 1) * 5).trim()),
                };
                if (tri[0] + tri[1] > tri[2] && tri[0] + tri[2] > tri[1] && tri[1] + tri[2] > tri[0])
                    possible++;
            }
        }
        System.out.println(possible);
    }
}
