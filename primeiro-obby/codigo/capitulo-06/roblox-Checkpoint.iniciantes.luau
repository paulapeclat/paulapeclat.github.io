local checkpoint = script.Parent
local Players = game:GetService("Players")

checkpoint.Touched:Connect(function(oQueTocou)
	local jogador = Players:GetPlayerFromCharacter(oQueTocou.Parent)

	if jogador then
		jogador.RespawnLocation = checkpoint
	end
end)
