local sum = 0

local a = 0
local b = 1

while a < 4000000 do
    if a % 2 == 0 then
        sum = sum + a
    end
    b = a + b
    a = b - a
end

print(sum)