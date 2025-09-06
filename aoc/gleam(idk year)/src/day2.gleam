import gleam/dict
import gleam/int
import gleam/list
import gleam/string

pub fn main() {
  0
}

fn lines_fn(lines: List(String)) {
  lines_fn_impl(lines, 0)
}

fn lines_fn_impl(lines: List(String), acc: Int) {
  case lines {
    [head, ..tail] -> {
      let acc = acc + id_if_twelve(head)
      lines_fn_impl(tail, acc)
    }
    _ -> acc
  }
}

fn id_if_twelve(line: String) -> Int {
  case string.split_once(line, ":") {
    Ok(#("Game " <> id, second)) -> {
      list.each(string.split(second, ";"), fn(list_of_games) { todo })
      ""
    }
    _ -> ""
  }
  0
}

fn rgb_twelve(games_list: List(String)) {
  let split_games_list: List(List(String)) = list.new()
  list.each(games_list, fn(a) {
    list.append(split_games_list, [string.split(a, ";")])
  })
  rgb_twelve_impl(split_games_list, -1, -1, -1)
}

fn rgb_twelve_impl(games_list: List(List(String)), rgbmax: Dict(String, Int)) {
  case games_list {
    _ if rmax > 12 && bmax > 13 && gmax > 14 -> True
    _ -> False
  }
}
