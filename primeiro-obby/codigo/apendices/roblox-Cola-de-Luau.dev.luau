--!strict                       -- tipagem estrita opcional, no topo do arquivo
local nome: string = "Bia"      -- anotação de tipo opcional
local lista = {"a", "b", "c"}    -- array: lista[1] == "a"
local mapa = { vida = 100 }     -- dicionário: mapa.vida ou mapa["vida"]

for i, item in lista do         -- iteração genérica
	print(i, item)
end

local function dobro(n: number): number
	return n * 2
end

print(`Oi {nome}, #lista = {#lista}`)  -- interpolação e tamanho

local Players = game:GetService("Players")  -- serviços do motor
Players.PlayerAdded:Connect(function(jogador)
	print(jogador.Name .. " entrou")        -- concatenação
end)

task.wait(1)     -- pausa sem travar o jogo
task.spawn(fn)   -- roda em paralelo (corrotina)
task.delay(5, fn) -- agenda
