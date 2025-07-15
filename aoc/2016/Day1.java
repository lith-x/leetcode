import java.util.ArrayList;
import java.util.List;

public class Day1 {
    public static void main(String[] args) throws Exception {
        Day1.part1();
        Day1.part2();
    }

    private static void part1() throws Exception {
        String input = util.getStringDay(1);
        String[] dirs = input.split(", ");
        var position = new Object() {
            int x = 0;
            int y = 0;
        };
        int facing = 0; // 0=north,1=east,2=south,3=west
        for (String dir : dirs) {
            facing = (facing + (dir.charAt(0) == 'L' ? 3 : 1)) % 4;
            int dist = Integer.parseInt(dir.substring(1));
            switch (facing) {
                case 0:
                    position.y -= dist;
                    break;
                case 1:
                    position.x += dist;
                    break;
                case 2:
                    position.y += dist;
                    break;
                case 3:
                    position.x -= dist;
                    break;
                default:
                    throw new Exception("UNREACHABLE");
            }
        }
        System.out.println(Math.abs(position.x) + Math.abs(position.y));
    }

    private static void part2() throws Exception {
        String input = util.getStringDay(1);
        String[] dirs = input.split(", ");
        List<int[]> path = new ArrayList<>();
        path.add(new int[] { 0, 0 });
        int facing = 0; // 0=north,1=east,2=south,3=west
        for (String dir : dirs) {
            facing = (facing + (dir.charAt(0) == 'L' ? 3 : 1)) % 4;
            int dist = Integer.parseInt(dir.substring(1));
            for (int i = 0; i < dist; i++) {
                int[] newPos = path.get(path.size() - 1).clone();
                switch (facing) {
                    case 0:
                        newPos[1]--;
                        break;
                    case 1:
                        newPos[0]++;
                        break;
                    case 2:
                        newPos[1]++;
                        break;
                    case 3:
                        newPos[0]--;
                        break;
                    default:
                        throw new Exception("UNREACHABLE");
                }
                for (int[] pos : path) {
                    if (newPos[0] == pos[0] && newPos[1] == pos[1]) {
                        System.out.println(Math.abs(pos[0]) + Math.abs(pos[1]));
                        return;
                    }
                }
                path.add(newPos);
            }
        }
        throw new Exception("COULDN'T FIND LOL BOZO");
    }
}
