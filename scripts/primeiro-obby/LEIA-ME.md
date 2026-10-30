# Lista de espera · Crie o primeiro obby com seu filho(a)

Endereço final: **https://paulapeclat.github.io/primeiro-obby/**
(é o link que já está no livro, no Apêndice D, e nos READMEs do kit e da vitrine)

## 1. Publicação

A página mora em `primeiro-obby/` deste repositório e sai no ar sozinha a cada commit na `main`,
pelo workflow `.github/workflows/pages.yml`.

## 2. Ligar o formulário à planilha (10 min)

1. Crie uma planilha Google chamada "Lista de espera · Primeiro obby".
2. **Extensões → Apps Script**, apague o que houver e cole `scripts/primeiro-obby/apps-script.gs`.
3. **Implantar → Nova implantação → App da Web**. Executar como: *Eu*. Acesso: *Qualquer pessoa*.
4. Copie a URL e cole em `const ENDPOINT = "";` no `primeiro-obby/index.html`. Faça commit e push.
5. O Capítulo 5 (`capitulo-5-de-presente.pdf`) já está nesta pasta e o Apps Script já aponta para ele.
   Na primeira execução o Google pede permissão para enviar e-mails pela sua conta: autorize.
6. Teste com seu próprio e-mail: a linha aparece na aba `primeiro-obby` e o presente chega na caixa de entrada.

Enquanto o ENDPOINT estiver vazio, a página funciona e responde "a lista abre em breve".

## 3. Quando o livro sair

Troque o link do livro e dos READMEs pelo link da Amazon, ou mantenha esta página e
coloque um botão "Comprar" no topo. A planilha vira a lista de quem avisar no lançamento.

## O que a página já faz

- Uma lista **só deste livro** (campo `produto = primeiro-obby`), separada da lista geral
- Não duplica e-mail; campo-armadilha contra robôs; espera de 15 s entre envios
- Aceite LGPD obrigatório; protege a planilha contra injeção de fórmula
- Funciona no celular, contraste alto, foco visível no teclado
