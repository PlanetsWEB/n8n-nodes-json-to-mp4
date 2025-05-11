// run-script.js
const { execSync } = require('child_process');

try {
  console.log('🔧 Executando: npm run build');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('📁 Entrando na pasta ./dist');
  process.chdir('./dist');

  console.log('🔗 Executando: npm link');
  execSync('npm link', { stdio: 'inherit' });

  console.log('📁 Indo para ~/.n8n/custom');
  process.chdir(`${process.env.HOME}/.n8n/custom`);

  console.log('🔗 Executando: npm link n8n-nodes-json-to-mp4');
  execSync('npm link n8n-nodes-json-to-mp4', { stdio: 'inherit' });

  console.log('📁 Voltando para ~/Documents/GitHub/n8n-nodes-json-to-mp4');
  process.chdir(`${process.env.HOME}/Documents/GitHub/n8n-nodes-json-to-mp4`);

  console.log('🚀 Iniciando n8n');
  execSync(' n8n', { stdio: 'inherit' });

} catch (err) {
  console.error('❌ Erro durante a execução dos comandos:', err.message);
  process.exit(1);
}
