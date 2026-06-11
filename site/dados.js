/* Fonte de dados do Maga Ateliê.
   Agora os vestidos vêm do BANCO (Supabase), administrado pela Maria no painel.
   Mantém o MESMO formato de antes (window.VESTIDOS, window.COLECOES, helpers),
   só que carregado de forma assíncrona — as páginas esperam `window.dadosReady`.

   Requer: supabase-js + supabase-config.js carregados antes deste arquivo. */

window.COLECOES = ['Jardim', 'Maré', 'Brisa', 'Florescer', 'Estação'];

/* Resolve o caminho de uma foto:
   - URL completa (foto nova no Storage) → usa como está
   - caminho relativo (foto antiga no repositório) → prefixa com a base da página
     (vazia no site; '../' no painel, que fica uma pasta mais fundo). */
window.MIDIA_BASE = window.MIDIA_BASE || '';
window.midiaURL = function (f) {
  if (!f) return '';
  return /^https?:\/\//.test(f) ? f : (window.MIDIA_BASE + f);
};

window.fotosDe   = function (v) { return (v.fotos || []).map(window.midiaURL); };
window.aluguelDe = function (v) { return Math.round((v.preco || 0) * 0.6); };
window.precoFmt  = function (n) { return 'R$ ' + Number(n || 0).toLocaleString('pt-BR'); };

window.msgPedido = function (v) {
  return (
'Olá, Maria! Tenho interesse no vestido "' + v.nome + '" (Coleção ' + v.colecao + ').\n\n' +
'Quero:\n' +
'( ) Comprar — ' + window.precoFmt(v.preco) + '\n' +
'( ) Alugar — ' + window.precoFmt(window.aluguelDe(v)) + '\n\n' +
'Minhas medidas (cm):\n' +
'• Busto: \n' +
'• Cintura: \n' +
'• Quadril: \n' +
'• Altura: \n\n' +
'Data do evento: '
  );
};

function _mapVestido(r) {
  return {
    id: r.id, nome: r.nome, colecao: r.colecao, tag: r.tag,
    preco: r.preco, desc: r.descricao,
    fotos: Array.isArray(r.fotos) ? r.fotos : [],
    n: Array.isArray(r.fotos) ? r.fotos.length : 0,
    em_destaque: r.em_destaque, ordem: r.ordem
  };
}

window.VESTIDOS = [];
window.DESTAQUE = null;
window.CONFIG   = {};

/* Carrega tudo do Supabase via REST (fetch leve — sem a biblioteca pesada).
   Sempre resolve (mesmo com erro), pra nunca travar a página. */
window.dadosReady = (async function () {
  try {
    const base = window.SB_URL, key = window.SB_KEY;
    if (!base || !key) throw new Error('Config do Supabase ausente');
    const headers = { apikey: key, Authorization: 'Bearer ' + key };
    const [vRes, cRes] = await Promise.all([
      fetch(base + '/rest/v1/vestidos?select=*&ativo=eq.true&order=ordem.asc', { headers }),
      fetch(base + '/rest/v1/config?id=eq.1&select=*', { headers })
    ]);
    if (!vRes.ok) throw new Error('HTTP ' + vRes.status);
    const vest = await vRes.json();
    let cfg = {};
    if (cRes.ok) { const arr = await cRes.json(); cfg = (Array.isArray(arr) && arr[0]) || {}; }

    const rows = (vest || []).map(_mapVestido);
    window.CONFIG = cfg;

    // catálogo = tudo que não é da coleção "Destaque"
    window.VESTIDOS = rows.filter(v => v.colecao !== 'Destaque');

    // destaque da home = o escolhido na config (ou o marcado, ou o da coleção Destaque)
    let dest = rows.find(v => v.id === cfg.destaque_id)
            || rows.find(v => v.em_destaque)
            || rows.find(v => v.colecao === 'Destaque')
            || null;
    if (dest) {
      dest = Object.assign({}, dest, {
        titulo: cfg.destaque_titulo || 'O vestido que nasceu pra ser lembrado.',
        texto:  cfg.destaque_texto  || dest.desc || ''
      });
    }
    window.DESTAQUE = dest;
  } catch (err) {
    console.warn('[dados] não consegui carregar do Supabase:', err && err.message);
  }
  return { VESTIDOS: window.VESTIDOS, DESTAQUE: window.DESTAQUE, COLECOES: window.COLECOES };
})();
