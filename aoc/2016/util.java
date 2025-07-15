import java.nio.file.Files;
import java.nio.file.Path;

public class util {
    public static String getStringDay(int day) {
        try {
            var path = Path.of(String.format("./day%d.in", day));
            return Files.readString(path);
        } catch (Exception e) {
            System.err.println(e);
            System.exit(1);
        }
        return "";
    }
}
