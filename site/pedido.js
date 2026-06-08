/* Modal de pedido do Maga Ateliê.
   Abre ao clicar em "Pedir": a cliente escolhe comprar/alugar, preenche nome,
   medidas e data — e o botão final já redireciona pro WhatsApp com a mensagem
   montada, pronta pra enviar. Usado por index.html e vestido.html.
   Depende de dados.js (window.VESTIDOS, precoFmt, aluguelDe). */
(function(){
  const WHATS = "5511974235465";

  // ---- estilos (autossuficiente: usa as variáveis de cor das páginas, com fallback) ----
  const css = `
  .pedido-ov{position:fixed;inset:0;z-index:120;background:rgba(20,28,33,.66);backdrop-filter:blur(4px);
    display:none;align-items:center;justify-content:center;padding:20px;font-family:'Jost',sans-serif}
  .pedido-ov.open{display:flex}
  .pedido-card{background:var(--bg,#F8FAFB);border-radius:18px;width:100%;max-width:440px;max-height:92vh;
    overflow:auto;box-shadow:0 30px 80px rgba(0,0,0,.4);padding:30px 28px;position:relative;
    animation:pcUp .35s ease}
  @keyframes pcUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
  .pedido-card h3{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:1.7rem;
    color:var(--ink,#26323A);line-height:1.15}
  .pedido-card .pc-sub{font-size:.86rem;color:var(--ink-soft,#5d6b73);margin:4px 0 20px}
  .pc-close{position:absolute;top:12px;right:14px;background:none;border:0;font-size:1.7rem;line-height:1;
    color:var(--ink-soft,#5d6b73);cursor:pointer}
  .pc-close:hover{color:var(--ink,#26323A)}
  .pc-opcoes{display:flex;gap:10px;margin-bottom:18px}
  .pc-opcao{flex:1;border:1px solid var(--line,#d9e6ec);border-radius:12px;padding:12px 8px;cursor:pointer;
    text-align:center;transition:.2s;background:#fff}
  .pc-opcao input{position:absolute;opacity:0;width:0;height:0}
  .pc-opcao .t{display:block;font-weight:500;font-size:.78rem;letter-spacing:.04em;text-transform:uppercase;
    color:var(--ink,#26323A)}
  .pc-opcao .v{display:block;font-family:'Cormorant Garamond',serif;font-style:italic;font-size:1.2rem;
    color:var(--accent,#3F7D99);margin-top:2px}
  .pc-opcao.sel{border-color:var(--blue,#6FA3BD);box-shadow:0 0 0 2px rgba(111,163,189,.25)}
  .pc-field{margin-bottom:14px}
  .pc-field label{display:block;font-size:.72rem;letter-spacing:.06em;text-transform:uppercase;
    color:var(--ink-soft,#5d6b73);margin-bottom:6px}
  .pc-field input{width:100%;padding:12px 14px;border:1px solid var(--line,#d9e6ec);border-radius:10px;
    background:#fff;font-family:'Jost',sans-serif;font-size:.95rem;color:var(--ink,#26323A)}
  .pc-field input:focus{outline:0;border-color:var(--blue,#6FA3BD);box-shadow:0 0 0 3px rgba(111,163,189,.18)}
  .pc-medidas{display:grid;grid-template-columns:1fr 1fr;gap:0 12px}
  .pc-enviar{width:100%;margin-top:8px;background:#25D366;color:#fff;border:0;border-radius:50px;padding:15px;
    font-family:'Jost',sans-serif;font-weight:500;font-size:.9rem;letter-spacing:.04em;text-transform:uppercase;
    cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:.2s}
  .pc-enviar:hover{background:#1ebe5a}
  .pc-enviar svg{width:18px;height:18px;fill:#fff}
  .pc-note{font-size:.74rem;color:var(--ink-soft,#5d6b73);text-align:center;margin-top:12px}
  `;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const waSvg = '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

  // ---- markup do modal ----
  const ov = document.createElement('div');
  ov.className = 'pedido-ov';
  ov.innerHTML =
    '<div class="pedido-card" role="dialog" aria-modal="true">'
    + '<button class="pc-close" aria-label="Fechar" data-close>&times;</button>'
    + '<h3 id="pc-titulo">Pedir vestido</h3>'
    + '<p class="pc-sub" id="pc-sub"></p>'
    + '<div class="pc-opcoes" id="pc-opcoes"></div>'
    + '<div class="pc-field"><label>Seu nome</label><input id="pc-nome" placeholder="Como você se chama?"></div>'
    + '<div class="pc-medidas">'
    +   '<div class="pc-field"><label>Busto (cm)</label><input id="pc-busto" inputmode="numeric" placeholder="ex: 90"></div>'
    +   '<div class="pc-field"><label>Cintura (cm)</label><input id="pc-cintura" inputmode="numeric" placeholder="ex: 70"></div>'
    +   '<div class="pc-field"><label>Quadril (cm)</label><input id="pc-quadril" inputmode="numeric" placeholder="ex: 98"></div>'
    +   '<div class="pc-field"><label>Altura (cm)</label><input id="pc-altura" inputmode="numeric" placeholder="ex: 165"></div>'
    + '</div>'
    + '<div class="pc-field"><label>Data do evento</label><input id="pc-data" type="date"></div>'
    + '<button class="pc-enviar" id="pc-enviar">' + waSvg + ' Enviar no WhatsApp</button>'
    + '<p class="pc-note">A Maria confere as medidas na prova — pode mandar uma estimativa 💙</p>'
    + '</div>';
  document.body.appendChild(ov);

  let atualV = null;

  function fmt(n){ return window.precoFmt ? window.precoFmt(n) : ('R$ '+n); }
  function dataBR(iso){ // "2026-10-12" -> "12/10/2026"
    if(!iso) return '';
    const p = iso.split('-'); return p.length===3 ? (p[2]+'/'+p[1]+'/'+p[0]) : iso;
  }

  // abre o modal já preenchido com o vestido escolhido
  window.abrirPedido = function(id){
    const v = (window.VESTIDOS||[]).find(x=>x.id===id);
    if(!v){ window.open('https://wa.me/'+WHATS,'_blank'); return; }
    atualV = v;
    const aluguel = window.aluguelDe ? window.aluguelDe(v) : Math.round(v.preco*0.6);
    ov.querySelector('#pc-titulo').textContent = v.nome;
    ov.querySelector('#pc-sub').textContent = 'Coleção ' + v.colecao + ' · preencha e a Maria já recebe tudo';
    ov.querySelector('#pc-opcoes').innerHTML =
      '<label class="pc-opcao sel" data-op="Comprar"><input type="radio" name="pc-op" checked>'
      +   '<span class="t">Comprar</span><span class="v">'+fmt(v.preco)+'</span></label>'
      + '<label class="pc-opcao" data-op="Alugar"><input type="radio" name="pc-op">'
      +   '<span class="t">Alugar</span><span class="v">'+fmt(aluguel)+'</span></label>';
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function fechar(){ ov.classList.remove('open'); document.body.style.overflow = ''; }

  // seleção comprar/alugar
  ov.querySelector('#pc-opcoes').addEventListener('click', function(e){
    const op = e.target.closest('.pc-opcao'); if(!op) return;
    this.querySelectorAll('.pc-opcao').forEach(o=>o.classList.remove('sel'));
    op.classList.add('sel');
    const r = op.querySelector('input'); if(r) r.checked = true;
  });

  // fechar (× , clicar no fundo, Esc)
  ov.addEventListener('click', e=>{ if(e.target===ov || e.target.hasAttribute('data-close')) fechar(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape' && ov.classList.contains('open')) fechar(); });

  // montar mensagem e ir pro WhatsApp
  ov.querySelector('#pc-enviar').addEventListener('click', function(){
    const v = atualV; if(!v) return;
    const sel = ov.querySelector('.pc-opcao.sel');
    const opcao = sel ? sel.dataset.op : 'Comprar';
    const valor = opcao==='Alugar' ? (window.aluguelDe?window.aluguelDe(v):Math.round(v.preco*0.6)) : v.preco;
    const g = id => (ov.querySelector('#'+id).value || '').trim();
    const nome = g('pc-nome');

    let t = 'Olá, Maria! Tenho interesse no vestido "'+v.nome+'" (Coleção '+v.colecao+').\n\n';
    t += 'Quero: '+opcao+' — '+fmt(valor)+'\n';
    if(nome) t += '\nMeu nome: '+nome+'\n';
    const m = [];
    if(g('pc-busto'))   m.push('busto '+g('pc-busto'));
    if(g('pc-cintura')) m.push('cintura '+g('pc-cintura'));
    if(g('pc-quadril')) m.push('quadril '+g('pc-quadril'));
    if(g('pc-altura'))  m.push('altura '+g('pc-altura'));
    if(m.length) t += 'Minhas medidas (cm): '+m.join(', ')+'\n';
    const data = dataBR(g('pc-data'));
    if(data) t += 'Data do evento: '+data+'\n';

    window.open('https://wa.me/'+WHATS+'?text='+encodeURIComponent(t),'_blank');
    fechar();
  });
})();
