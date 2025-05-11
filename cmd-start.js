// run-script.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  console.log('🔧 Apagando pasta dist');
  fs.rmSync('./dist', { recursive: true, force: true });

  console.log('🔧 Executando: npm run build');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('📁 Entrando na pasta ./dist');
  process.chdir('./dist');

  console.log('🔗 Executando: npm link');
  execSync('npm link', { stdio: 'inherit' });

  const customPath = path.join(process.env.HOME, '.n8n', 'custom');

  if (!fs.existsSync(customPath)) {
    console.log('📂 Pasta ~/.n8n/custom não existe. Criando...');
    fs.mkdirSync(customPath, { recursive: true });
  }

  console.log('📁 Indo para ~/.n8n/custom');
  process.chdir(customPath);

  console.log('🔗 Executando: npm link n8n-nodes-json-to-mp4');
  execSync('npm link n8n-nodes-json-to-mp4', { stdio: 'inherit' });

  const projectPath = path.join(process.env.HOME, 'Documents', 'GitHub', 'n8n-nodes-json-to-mp4');
  console.log('📁 Voltando para ~/Documents/GitHub/n8n-nodes-json-to-mp4');
  process.chdir(projectPath);

  console.log('🚀 Iniciando n8n');
  execSync('npx --yes n8n start', { stdio: 'inherit' });

} catch (err) {
  console.error('❌ Erro durante a execução dos comandos:', err.message);
  process.exit(1);
}
