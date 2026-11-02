local TweenService = game:GetService("TweenService")
local plataforma = script.Parent

local DISTANCIA = 12 -- quantos studs ela anda
local TEMPO = 3      -- segundos para ir

local destino = plataforma.Position + Vector3.new(DISTANCIA, 0, 0)
local jeito = TweenInfo.new(TEMPO, Enum.EasingStyle.Sine, Enum.EasingDirection.InOut, -1, true)

TweenService:Create(plataforma, jeito, { Position = destino }):Play()
