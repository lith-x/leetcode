local M = {}

---@type number[]
M.cached_primes = { 2 }

---@param n integer
---@return boolean
function M:is_prime(n)
    self.cache_primes(self, math.ceil(math.sqrt(n)))
    for _, prime in ipairs(self.cached_primes) do
        if n % prime == 0 then
            return false
        end
    end
    return true
end

---@param n integer
function M:cache_primes(n)
    local num = self.cached_primes[#self.cached_primes]
    while self.cached_primes[#self.cached_primes] < n do
        for _, prime in ipairs(self.cached_primes) do
            if num % prime == 0 then
                goto next_num
            end
        end
        table.insert(self.cached_primes, num)
        ::next_num::
        num = num + 1
    end
    print("primes cached!")
end

return M