# Endividômetro

Monitore a velocidade das suas dívidas

## Como iniciar?

```bash
git clone https://github.com/TMTecnologia/endividometro.git
cd endividometro
npm install
npx prisma db push
npm run dev
```

### Problemas Comuns

- Caso a lista de gitmojis esteja desatualizada, tente usar `scripts/fetch-gitmojis`: script node para buscar a lista de gitmojis de gitmoji.dev no github.

### Variáveis de Ambiente

- `GOOGLE_CLIENT_{ID,SECRET}`: Informações do cliente OAuth 2.0, recuperadas através do site <https://console.developers.google.com/apis/credentials>.
- `NEXTAUTH_SECRET`: Sugerido utilizar [@sandrinodimattia/generate-secret](https://github.com/sandrinodimattia/generate-secret) para gerar um valor aleatório. Leia mais na documentação do [NextAuth](https://next-auth.js.org/configuration/options#secret)

## Licença

Esse projeto foi licenciado pela MIT License - ver [LICENSE](LICENSE) para mais detalhes
