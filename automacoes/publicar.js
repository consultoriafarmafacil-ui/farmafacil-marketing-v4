'use strict';

/**
 * publicar.js
 * Farma Fácil · Renderiza slides com Puppeteer e publica carrossel no Instagram
 *
 * Uso:
 *   node publicar.js --dia 15
 */

const path  = require('path');
const fs    = require('fs');
const os    = require('os');

// Carrega .env se não estiver no GitHub Actions
if (!process.env.GITHUB_ACTIONS) {
  try {
    require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
  } catch (e) {
    console.warn('[AVISO] dotenv não disponível.');
  }
}

const axios  = require('axios');
const { execSync } = require('child_process');

// ─── Constantes ───────────────────────────────────────────────────────────────
const ASSET_ID     = process.env.ASSET_ID || '109761077453312';
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO         = 'consultoriafarmafacil-ui/farmafacil-marketing-v4';
const GRAPH_BASE   = 'https://graph.facebook.com';
const API_VERSION  = 'v20.0';

const ROOT_DIR     = path.join(__dirname, '..');
const HTML_PATH    = path.join(ROOT_DIR, 'sistema', 'farmafacil_sistema_v4.html');
const SLIDES_DIR   = path.join(ROOT_DIR, 'slides');

// ─── Helpers ─────────────────────────────────────────────────────────────────
function log(msg) {
  console.log('[' + new Date().toISOString().slice(0, 19).replace('T', ' ') + '] ' + msg);
}

function erro(msg, err) {
  console.error('[ERRO] ' + msg);
  if (err) console.error(err.message || err);
}

function sleep(ms) {
  return new Promise(function(resolve) { setTimeout(resolve, ms); });
}

// ─── Parse argumentos CLI ────────────────────────────────────────────────────
function parseArgs() {
  const args = process.argv.slice(2);
  const resultado = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--dia' && args[i + 1]) {
      resultado.dia = parseInt(args[i + 1], 10);
      i++;
    }
  }
  return resultado;
}

// ─── 1. Extrair dados do dia a partir do HTML ────────────────────────────────
function extrairDadosDia(dia) {
  log('Lendo HTML para extrair dados do dia ' + dia + '...');

  const html = fs.readFileSync(HTML_PATH, 'utf8');

  // Extrair bloco DIAS usando regex (sem eval)
  // Formato: var DIAS={1:{...},2:{...},...};
  const matchDias = html.match(/var DIAS=(\{[\s\S]*?\});[\s\n]*var /);
  if (!matchDias) {
    throw new Error('Não foi possível localizar "var DIAS={...}" no HTML.');
  }

  // Extrair apenas a entrada do dia específico usando regex mais precisa
  // Procura pelo padrão: "dia": {...}
  const regexDia = new RegExp('"?' + dia + '"?:\\s*\\{([^}]*(?:\\{[^}]*\\}[^}]*)*)\\}', 'g');

  // Extração segura de campos do dia via regex campo a campo
  const diaBloco = matchDias[1];

  // Localiza o objeto do dia específico
  // ex: 1:{titulo:'...',pilar:'...',tipo:'...',hora:'...',template:'...',legenda:'...',hashtags:'...'}
  const regexEntry = new RegExp(
    '(?:^|,)\\s*' + dia + '\\s*:\\s*(\\{[^{}]*\\})',
    'm'
  );
  const matchEntry = diaBloco.match(regexEntry);

  if (!matchEntry) {
    throw new Error('Dia ' + dia + ' não encontrado em DIAS.');
  }

  const entryStr = matchEntry[1];

  // Extrai campos individuais com regex
  function extrairCampo(str, campo) {
    // Tenta aspas simples e duplas
    const re = new RegExp(campo + "\\s*:\\s*'([^']*)'");
    const re2 = new RegExp(campo + '\\s*:\\s*"([^"]*)"');
    const m = str.match(re) || str.match(re2);
    return m ? m[1] : '';
  }

  const d = {
    dia:      dia,
    titulo:   extrairCampo(entryStr, 'titulo'),
    pilar:    extrairCampo(entryStr, 'pilar'),
    tipo:     extrairCampo(entryStr, 'tipo'),
    hora:     extrairCampo(entryStr, 'hora'),
    template: extrairCampo(entryStr, 'template'),
    legenda:  extrairCampo(entryStr, 'legenda'),
    hashtags: extrairCampo(entryStr, 'hashtags'),
    story:    extrairCampo(entryStr, 'story')
  };

  log('Dados do dia: ' + JSON.stringify({ titulo: d.titulo, pilar: d.pilar, template: d.template }));
  return d;
}

// ─── 2. Gerar HTML dos slides ─────────────────────────────────────────────────
function gerarHTMLSlide(diaData, slideIndex, htmlCompleto) {
  // Cria um HTML mínimo que renderiza apenas o slide específico
  // Extrai as funções de geração de slide do HTML original
  const tmpHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,700;1,700&family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { width: 1080px; height: 1350px; overflow: hidden; }
</style>
</head>
<body>
<script>
// Dados do dia injetados
var IMGS = {};
var d = ${JSON.stringify(diaData)};
</script>
<script>
// Funções de slide extraídas do HTML principal
${extrairFuncoesSlide(htmlCompleto)}
</script>
<script>
// Renderiza o slide solicitado
window.onload = function() {
  var slides = gt(d);
  var idx = ${slideIndex};
  if (slides && slides[idx]) {
    document.body.innerHTML = slides[idx];
  }
};
</script>
</body>
</html>`;

  return tmpHTML;
}

// Extrai apenas as funções de geração de slides do HTML principal
function extrairFuncoesSlide(html) {
  // Extrai bloco de funções entre "function hdC" e "function gt"
  const match = html.match(/(function hdC[\s\S]*?function gt\([\s\S]*?\})\s*function analisar/);
  if (match) return match[1];

  // Fallback: extrai todo o bloco de script principal
  const scripts = html.match(/<script>([\s\S]*?)<\/script>/g) || [];
  for (const s of scripts) {
    if (s.includes('function gt(') && s.includes('function s1(')) {
      return s.replace(/<\/?script>/g, '');
    }
  }
  return '';
}

// ─── 3. Capturar screenshots com Puppeteer ───────────────────────────────────
async function capturarSlides(dia, diaData) {
  log('Iniciando Puppeteer para capturar slides...');

  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch (e) {
    throw new Error('Puppeteer não instalado. Execute: npm install puppeteer');
  }

  const html = fs.readFileSync(HTML_PATH, 'utf8');

  // Diretório temporário para os slides
  const tmpDir = path.join(os.tmpdir(), 'slides');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu'
    ]
  });

  const caminhos = [];

  try {
    for (let i = 0; i < 6; i++) {
      log('Capturando slide ' + (i + 1) + '/6...');

      const page = await browser.newPage();
      await page.setViewport({ width: 1080, height: 1350 });

      const slideHTML = gerarHTMLSlide(diaData, i, html);
      const tmpFile   = path.join(tmpDir, 'slide_' + i + '_temp.html');
      fs.writeFileSync(tmpFile, slideHTML, 'utf8');

      await page.goto('file://' + tmpFile, { waitUntil: 'networkidle2', timeout: 30000 });

      // Aguarda fontes carregarem
      await sleep(2000);

      const caminho = path.join(tmpDir, 'dia_' + dia + '_slide_' + i + '.png');
      await page.screenshot({ path: caminho, type: 'png' });
      caminhos.push(caminho);

      await page.close();
      log('Slide ' + (i + 1) + ' salvo: ' + caminho);
    }
  } finally {
    await browser.close();
  }

  return caminhos;
}

// ─── 4. Commit + push dos slides para o repositório ─────────────────────────
function commitSlides(dia, caminhosTmp) {
  log('Copiando slides para pasta /slides/ do repositório...');

  if (!fs.existsSync(SLIDES_DIR)) {
    fs.mkdirSync(SLIDES_DIR, { recursive: true });
  }

  const caminhosFinal = [];
  caminhosTmp.forEach(function(src, i) {
    const dest = path.join(SLIDES_DIR, 'dia_' + dia + '_slide_' + i + '.png');
    fs.copyFileSync(src, dest);
    caminhosFinal.push(dest);
    log('Copiado: ' + path.basename(dest));
  });

  log('Fazendo git commit + push dos slides...');

  const opts = { cwd: ROOT_DIR, stdio: 'inherit' };
  try {
    execSync('git config user.name "Farma Fácil Bot"', opts);
    execSync('git config user.email "bot@farmafacil.com"', opts);
    execSync('git add slides/', opts);

    const diff = execSync('git diff --staged --name-only', { cwd: ROOT_DIR }).toString().trim();
    if (!diff) {
      log('Slides já commitados (sem mudança).');
      return caminhosFinal;
    }

    execSync('git commit -m "auto: slides dia ' + dia + '"', opts);
    execSync('git push', opts);
    log('Slides publicados no repositório.');
  } catch (e) {
    erro('Falha no git push dos slides.', e);
  }

  return caminhosFinal;
}

// ─── 5. Aguardar GitHub Pages indexar ───────────────────────────────────────
async function aguardarPages(dia) {
  const segundos = 45;
  log('Aguardando ' + segundos + 's para GitHub Pages indexar imagens...');
  await sleep(segundos * 1000);
}

// ─── 6. Enviar webhook para Make.com publicar no Instagram ───────────────────
async function publicarCarrossel(dia, diaData) {
  const MAKE_WEBHOOK = process.env.MAKE_WEBHOOK_URL;

  const baseUrl      = `https://raw.githubusercontent.com/${REPO}/main/slides`;
  const legendaFinal = (diaData.legenda || '') + '\n\n' + (diaData.hashtags || '');

  const images = [];
  for (let i = 0; i < 6; i++) {
    images.push(`${baseUrl}/dia_${dia}_slide_${i}.png`);
  }

  const payload = {
    dia:     dia,
    titulo:  diaData.titulo  || '',
    pilar:   diaData.pilar   || '',
    legenda: legendaFinal,
    image1:  images[0],
    image2:  images[1],
    image3:  images[2],
    image4:  images[3],
    image5:  images[4],
    image6:  images[5]
  };

  log('Payload para Make.com: ' + JSON.stringify({ dia, imagens: images.length }));

  if (!MAKE_WEBHOOK) {
    log('[AVISO] MAKE_WEBHOOK_URL não definido — pulando publicação.');
    log('Slides gerados e commitados. Publique manualmente usando as imagens em /slides/');
    return null;
  }

  log('Enviando webhook para Make.com...');
  try {
    const resp = await axios.post(MAKE_WEBHOOK, payload, { timeout: 30000 });
    log('Make.com respondeu: ' + resp.status + ' ' + JSON.stringify(resp.data));
  } catch (e) {
    const msg = e.response ? JSON.stringify(e.response.data) : e.message;
    throw new Error('Erro ao enviar webhook para Make.com: ' + msg);
  }

  log('=== Webhook enviado com sucesso! Make.com publicará no Instagram. ===');
  return images;
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  log('=== Farma Fácil · Publicar Post Instagram ===');

  const args = parseArgs();
  const dia  = args.dia;

  if (!dia || isNaN(dia)) {
    console.error('Uso: node publicar.js --dia <numero>');
    console.error('Exemplo: node publicar.js --dia 15');
    process.exit(1);
  }

  log('Publicando post do dia ' + dia + '...');

  try {
    // 1. Extrair dados do dia
    const diaData = extrairDadosDia(dia);

    // 2. Capturar screenshots dos 6 slides
    const caminhosTmp = await capturarSlides(dia, diaData);

    // 3. Commit + push para GitHub Pages
    commitSlides(dia, caminhosTmp);

    // 4. Aguardar indexação do GitHub Pages
    await aguardarPages(dia);

    // 5. Enviar webhook para Make.com → publica no Instagram
    await publicarCarrossel(dia, diaData);

    log('=== Publicação concluída! ===');
  } catch (e) {
    erro('Falha na publicação', e);
    process.exit(1);
  }
}

main();
