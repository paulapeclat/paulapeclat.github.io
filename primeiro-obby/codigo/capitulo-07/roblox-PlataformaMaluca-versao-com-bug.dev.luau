local plataforma = script.Parent

plataforma.Touched:Connect(function(oQueTocou)
	local humanoide = oQueTocou.Parent:FindFirstChild("Humanoid")

	if humanoide then
		local velocidadeNormal = humanoide.WalkSpeed
		humanoide.WalkSpeed = 40
		task.wait(5)
		humanoide.WalkSpeed = velocidadeNormal
	end
end)
