#!/bin/bash

echo "Instalando dependências..."
cd backend
npm install

echo "Executando testes unitários e de API..."
npm test

cd ../tests-e2e
echo "Instalando Playwright (se necessário)..."
npx playwright install

echo "Executando testes E2E..."
npx playwright test
