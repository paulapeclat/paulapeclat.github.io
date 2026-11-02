local Players = game:GetService("Players")
local checkpoint = script.Parent

checkpoint.Touched:Connect(function(oQueTocou)
	local jogador = Players:GetPlayerFromCharacter(oQueTocou.Parent)

	if jogador then
		jogador.RespawnLocation = checkpoint
	end
end)
