import gleam/io
import gleam/string
import simplifile.{read}

pub fn main() {
  let assert Ok(input) = read("./input/day1.txt")
  let lines = string.split(input, "\n")
  io.debug(add_lines(lines, 0))
}

fn add_lines(lines: List(String), acc: Int) {
  case lines {
    [head, ..tail] -> {
      let linenum = get_first_num(head) * 10 + get_last_num(head)
      let acc = acc + linenum
      add_lines(tail, acc)
    }
    _ -> acc
  }
}

fn get_first_num(line: String) -> Int {
  case line {
    "one" <> _ | "1" <> _ -> 1
    "two" <> _ | "2" <> _ -> 2
    "three" <> _ | "3" <> _ -> 3
    "four" <> _ | "4" <> _ -> 4
    "five" <> _ | "5" <> _ -> 5
    "six" <> _ | "6" <> _ -> 6
    "seven" <> _ | "7" <> _ -> 7
    "eight" <> _ | "8" <> _ -> 8
    "nine" <> _ | "9" <> _ -> 9
    "zero" <> _ | "0" <> _ -> 0
    "" -> panic
    _ -> get_first_num(string.drop_left(line, 1))
  }
}

fn get_last_num(line: String) -> Int {
  let line = string.reverse(line)
  get_last_num_impl(line)
}

fn get_last_num_impl(line: String) -> Int {
  case line {
    "eno" <> _ | "1" <> _ -> 1
    "owt" <> _ | "2" <> _ -> 2
    "eerht" <> _ | "3" <> _ -> 3
    "ruof" <> _ | "4" <> _ -> 4
    "evif" <> _ | "5" <> _ -> 5
    "xis" <> _ | "6" <> _ -> 6
    "neves" <> _ | "7" <> _ -> 7
    "thgie" <> _ | "8" <> _ -> 8
    "enin" <> _ | "9" <> _ -> 9
    "orez" <> _ | "0" <> _ -> 0
    "" -> panic
    _ -> get_last_num_impl(string.drop_left(line, 1))
  }
}
