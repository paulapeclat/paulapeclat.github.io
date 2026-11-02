local plataforma = script.Parent

local VELOCIDADE_TURBO = 40
local DURACAO = 5
local emTurbo = {} -- lista de quem já está correndo rápido

plataforma.Touched:Connect(function(oQueTocou)
	local humanoide = oQueTocou.Parent:FindFirstChild("Humanoid")

	if humanoide and not emTurbo[humanoide] then
		emTurbo[humanoide] = true
		local velocidadeNormal = humanoide.WalkSpeed

		humanoide.WalkSpeed = VELOCIDADE_TURBO
		task.wait(DURACAO)
		humanoide.WalkSpeed = velocidadeNormal

		emTurbo[humanoide] = nil
	end
end)
