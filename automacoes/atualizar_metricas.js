'use strict';

/**
 * atualizar_metricas.js
 * Farma Fácil · Automação de métricas Instagram via Meta Graph API
 * Roda toda segunda-feira via GitHub Actions (metricas.yml)
 */

const path = require('path');
const fs   = require('fs');

// Carrega .env se não estiver no GitHub Actions
if (!process.env.GITHUB_ACTIONS) {
  try {
    require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
  } catch (e) {
    console.warn('[AVISO] dotenv não encontrado — usando variáveis de ambiente do sistema.');
  }
}

const axios = require('axios');
const { execSync } = require('child_process');

// ─── Constantes ───────────────────────────────────────────────────────────────
const ASSET_ID      = process.env.ASSET_ID || '109761077453312';
const ACCESS_TOKEN  = process.env.META_ACCESS_TOKEN;
const API_VERSION   = 'v20.0';
const GRAPH_BASE    = 'https://graph.facebook.com';

const ROOT_DIR      = path.join(__dirname, '..');
const HTML_PATH     = path.join(ROOT_DIR, 'sistema', 'farmafacil_sistema_v4.html');
const HIST_PATH     = path.join(ROOT_DIR, 'metricas', 'historico_2026.json');

// ─── Helpers ─────────────────────────────────────────────────────────────────
function log(msg) {
  console.log('[' + new Date().toISOString().slice(0, 19).replace('T', ' ') + '] ' + msg);
}

function erro(msg, err) {
  console.error('[ERRO] ' + msg);
  if (err) console.error(err.message || err);
}

// ─── 1. Buscar métricas na Meta Graph API ────────────────────────────────────
async function buscarMetricas() {
  if (!ACCESS_TOKEN) {
    throw new Error('META_ACCESS_TOKEN não definido. Configure em .env ou GitHub Secrets.');
  }

  log('Buscando métricas no Meta Graph API...');

  const metrics = 'impressions,reach,total_interactions,follower_count,profile_views,website_clicks';

  const url = `${GRAPH_BASE}/${API_VERSION}/${ASSET_ID}/insights`;

  let resposta;
  try {
    resposta = await axios.get(url, {
      params: {
        metric: metrics,
        period: 'month',
        access_token: ACCESS_TOKEN
      },
      timeout: 30000
    });
  } catch (e) {
    if (e.response) {
      throw new Error(
        'Erro API Meta ' + e.response.status + ': ' +
        JSON.stringify(e.response.data)
      );
    }
    throw e;
  }

  const data = resposta.data && resposta.data.data ? resposta.data.data : [];

  if (!data.length) {
    throw new Error('A API retornou lista vazia. Verifique permissões do token.');
  }

  // Extrair o valor mais recente de cada métrica
  const resultado = {
    vis:    0,
    alc:    0,
    int:    0,
    seg:    0,
    total:  0,
    cliques: 0
  };

  const mapa = {
    impressions:         'vis',
    reach:               'alc',
    total_interactions:  'int',
    follower_count:      'total',
    profile_views:       'seg',
    website_clicks:      'cliques'
  };

  data.forEach(function(metrica) {
    const chave = mapa[metrica.name];
    if (!chave) return;

    const valores = metrica.values || [];
    if (!valores.length) return;

    // Pegar o valor mais recente (último item)
    const ultimo = valores[valores.length - 1];
    resultado[chave] = (ultimo && ultimo.value != null) ? Number(ultimo.value) : 0;
  });

  log('Métricas obtidas: ' + JSON.stringify(resultado));
  return resultado;
}

// ─── 2. Atualizar HTML ───────────────────────────────────────────────────────
function atualizarHTML(metricas) {
  log('Lendo HTML: ' + HTML_PATH);

  if (!fs.existsSync(HTML_PATH)) {
    throw new Error('HTML não encontrado: ' + HTML_PATH);
  }

  let html = fs.readFileSync(HTML_PATH, 'utf8');

  const periodo = 'Último mês';

  const novoMET =
    'var MET={vis:' + metricas.vis +
    ',alc:' + metricas.alc +
    ',int:' + metricas.int +
    ',seg:' + metricas.seg +
    ',total:' + metricas.total +
    ',cliques:' + metricas.cliques +
    ",periodo:'" + periodo + "'};";

  const novoBase =
    'var BASE_MET={vis:' + metricas.vis +
    ',alc:' + metricas.alc +
    ',int:' + metricas.int +
    ',seg:' + metricas.seg +
    ',total:' + metricas.total +
    ',cliques:' + metricas.cliques +
    ",periodo:'" + periodo + "'};";

  // Substituir var MET={...}; — linha inteira começa com "var MET={"
  const regexMET  = /var MET=\{[^}]*\};/;
  const regexBase = /var BASE_MET=\{[^}]*\};/;

  if (!regexMET.test(html)) {
    throw new Error('Padrão "var MET={...};" não encontrado no HTML.');
  }
  if (!regexBase.test(html)) {
    throw new Error('Padrão "var BASE_MET={...};" não encontrado no HTML.');
  }

  html = html.replace(regexMET,  novoMET);
  html = html.replace(regexBase, novoBase);

  fs.writeFileSync(HTML_PATH, html, 'utf8');
  log('HTML atualizado com sucesso.');
}

// ─── 3. Salvar histórico JSON ────────────────────────────────────────────────
function salvarHistorico(metricas) {
  log('Salvando histórico em: ' + HIST_PATH);

  let historico = [];
  if (fs.existsSync(HIST_PATH)) {
    try {
      historico = JSON.parse(fs.readFileSync(HIST_PATH, 'utf8'));
      if (!Array.isArray(historico)) historico = [];
    } catch (e) {
      log('[AVISO] Histórico existente inválido — criando novo.');
      historico = [];
    }
  }

  const registro = Object.assign({}, metricas, {
    data: new Date().toISOString().slice(0, 10),
    periodo: 'Último mês'
  });

  historico.push(registro);

  fs.writeFileSync(HIST_PATH, JSON.stringify(historico, null, 2), 'utf8');
  log('Histórico salvo (' + historico.length + ' registros).');
}

// ─── 4. Git commit + push ────────────────────────────────────────────────────
function gitPush() {
  log('Fazendo git add + commit + push...');

  const hoje = new Date().toLocaleDateString('pt-BR');
  const opts  = { cwd: ROOT_DIR, stdio: 'inherit' };

  try {
    execSync('git config user.name "Farma Fácil Bot"', opts);
    execSync('git config user.email "bot@farmafacil.com"', opts);
    execSync('git add sistema/farmafacil_sistema_v4.html metricas/historico_2026.json', opts);

    // Verificar se há mudanças staged
    const diff = execSync('git diff --staged --name-only', { cwd: ROOT_DIR }).toString().trim();
    if (!diff) {
      log('Nenhuma mudança para commitar.');
      return;
    }

    execSync(
      'git commit -m "auto: métricas Instagram ' + hoje + '"',
      opts
    );
    execSync('git push', opts);
    log('Push realizado com sucesso.');
  } catch (e) {
    erro('Falha no git push — verifique permissões do token GITHUB_TOKEN.', e);
    // Não lança exceção para não marcar o workflow como falha por problema de git
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  log('=== Farma Fácil · Atualizar Métricas ===');

  try {
    const metricas = await buscarMetricas();
    atualizarHTML(metricas);
    salvarHistorico(metricas);

    // Só faz git push se não estiver no GitHub Actions
    // (o workflow cuida do commit/push)
    if (!process.env.GITHUB_ACTIONS) {
      gitPush();
    }

    log('=== Concluído com sucesso! ===');
  } catch (e) {
    erro('Falha na execução principal', e);
    process.exit(1);
  }
}

main();
