import java.security.MessageDigest;

public class Day5 {
    public static void main(String[] args) throws Exception {
        Day5.Part1();
        Day5.Part2();
    }

    private static void Part1() throws Exception {
        String input = util.getStringDay(5);
        long password = 0;
        int hitcount = 0;
        long suffix = 0;

        MessageDigest md5 = MessageDigest.getInstance("MD5");
        try_again: do {
            suffix++;
            byte[] hashed = md5.digest((input + suffix).getBytes());
            if (hashed[0] != 0 || hashed[1] != 0 || (hashed[2] & 0xF0) != 0)
                continue try_again;
            password += hashed[2] & 0x0F;
            hitcount++;
            password *= 16;
        } while (hitcount < 8);
        password /= 16;
        System.out.println(Long.toString(password, 16));
    }

    private static void Part2() throws Exception {
        String input = util.getStringDay(5);
        long password = 0;
        int hitcount = 0;
        long suffix = 0;

        MessageDigest md5 = MessageDigest.getInstance("MD5");
        int position;
        try_again: do {
            suffix++;
            byte[] hashed = md5.digest((input + suffix).getBytes());
            if (hashed[0] != 0 || hashed[1] != 0 || (hashed[2] & 0xF0) != 0)
                continue try_again;
            position = hashed[2] & 0x0F;
            long position_password = password >>> ((7 - position) * 4) & 0x0F;
            if (position > 7 || position_password != 0)
                continue try_again;
            long new_byte = (hashed[3] >> 4) & 0x0F;
            password += new_byte << ((7 - position) * 4);
            // String debug_line = "HIT:      %x // %d\nPASSWORD: %08x";
            // System.out.println(debug_line.formatted(new_byte, position, password));
            hitcount++;
        } while (hitcount < 8);
        System.out.println(String.format("%08x", password));
    }
}
