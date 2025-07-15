local common = require("common")

---@type function
local factor

---@param n integer
factor = function(n)
    local tab = {}
    if n <= 1 then return tab end
    for i = 2, math.ceil(math.sqrt(n)) do
        if n % i == 0 then
            tab[i] = true
            for val in pairs(factor(n / i)) do
                if not tab[val] then
                    tab[val] = true
                end
            end
            print("factors: " .. table.concat(tab, " "))
        end
    end
    return tab
end

local main = function()
    local n = 600851475143
    print(factor(n))
end

main()