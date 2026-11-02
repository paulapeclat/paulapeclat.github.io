local bloco = script.Parent

bloco.Touched:Connect(function(oQueTocou)
	local personagem = oQueTocou.Parent
	local humanoide = personagem:FindFirstChild("Humanoid")

	if humanoide then
		humanoide.Health = 0
	end
end)
