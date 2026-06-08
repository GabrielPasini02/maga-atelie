/* Base de vestidos do Maga Ateliê.
   Cada vestido tem as fotos em imagens/catalogo/<id>/1.jpg ... N.jpg
   Usado pelo catálogo (index.html) e pela página de cada vestido (vestido.html).
   Nomes: tema Flores & Natureza. O "tag" é o estilo (aparece como etiqueta).
   "preco" = valor de COMPRA (R$). O ALUGUEL é calculado: 60% da compra. */

window.COLECOES = [
  'Jardim',      // noivas
  'Maré',        // sereia & drapeados
  'Brisa',       // fluidos & leves
  'Florescer',   // coloridos
  'Estação'      // clássicos / madrinha
];

window.VESTIDOS = [
  // --- Jardim (noivas) ---
  { id:'classico-1', nome:'Jasmim',    colecao:'Jardim', tag:'Clássico', n:3, preco:2600,
    desc:'Clássico atemporal para o grande dia.' },
  { id:'classico-3', nome:'Hortênsia', colecao:'Jardim', tag:'Clássico', n:2, preco:2700,
    desc:'Sobriedade e brilho num clássico inesquecível.' },
  { id:'minimalista-1', nome:'Lírio',     colecao:'Jardim', tag:'Minimalista', n:2, preco:2200,
    desc:'Linhas limpas e elegância que dispensa excessos.' },
  { id:'minimalista-2', nome:'Magnólia',  colecao:'Jardim', tag:'Minimalista', n:3, preco:2300,
    desc:'O minimalismo numa leitura sóbria e atual.' },
  { id:'minimalista-3', nome:'Camélia',   colecao:'Jardim', tag:'Minimalista', n:4, preco:2400,
    desc:'Pureza de formas, do corpete à barra.' },
  { id:'sereia-pala', nome:'Orquídea', colecao:'Jardim', tag:'Sereia', n:2, preco:2900,
    desc:'Pala removível — dois looks num só vestido.' },
  { id:'classico-2', nome:'Acácia',    colecao:'Jardim', tag:'Clássico', n:2, preco:2500,
    desc:'Elegância clássica do jeito que a noiva sonha.' },

  // --- Maré (sereia & drapeados) ---
  { id:'sereia', nome:'Íris', colecao:'Maré', tag:'Sereia', n:1, preco:2400,
    desc:'Caimento que marca as curvas com delicadeza.' },
  { id:'semissereia-drapeado', nome:'Dália', colecao:'Maré', tag:'Semissereia', n:1, preco:2300,
    desc:'Drapeado suave que valoriza o corpo.' },
  { id:'gode-drapeado', nome:'Peônia', colecao:'Maré', tag:'Godê', n:2, preco:2500,
    desc:'Godê duplo e drapeado: volume com movimento.' },

  // --- Brisa (fluidos & leves) ---
  { id:'fluido-1', nome:'Lavanda', colecao:'Brisa', tag:'Fluido', n:1, preco:1800,
    desc:'Leveza e movimento em cada passo.' },
  { id:'fluido-2', nome:'Alecrim', colecao:'Brisa', tag:'Fluido', n:1, preco:1800,
    desc:'A versão fluida, ainda mais aérea.' },
  { id:'tule', nome:'Gardênia', colecao:'Brisa', tag:'Tule', n:2, preco:2000,
    desc:'Camadas de tule para um ar romântico.' },
  { id:'georgette', nome:'Margarida', colecao:'Brisa', tag:'Georgette', n:1, preco:1700,
    desc:'Georgette de caimento impecável e toque suave.' },

  // --- Florescer (coloridos) ---
  { id:'fuccia-1', nome:'Tulipa', colecao:'Florescer', tag:'Fúcsia', n:1, preco:1900,
    desc:'Fúcsia vibrante para brilhar na festa.' },
  { id:'fuccia-2', nome:'Petúnia', colecao:'Florescer', tag:'Fúcsia', n:1, preco:1900,
    desc:'Outra leitura do fúcsia — cor que não passa despercebida.' },
  { id:'casual-chique', nome:'Violeta', colecao:'Florescer', tag:'Casual', n:1, preco:1500,
    desc:'Confortável sem abrir mão do charme.' },

  // --- Estação (clássicos / madrinha) ---
  { id:'longo', nome:'Cerejeira', colecao:'Estação', tag:'Longo', n:1, preco:1800,
    desc:'Comprimento longo com presença e fluidez.' },
  { id:'madrinha', nome:'Girassol', colecao:'Estação', tag:'Madrinha', n:1, preco:1700,
    desc:'Pensado para madrinhas que querem se destacar com elegância.' },

  // --- Obra em destaque (não entra na grade do catálogo; colecao fora de COLECOES) ---
  // É a obra-prima da Giovanna. Usada pelo modal de pedido na seção "Destaque".
  { id:'destaque', nome:'Dama-da-Noite', colecao:'Destaque', tag:'Obra-prima', n:5, preco:3000,
    desc:'Vestido de noiva boho em renda e tule, todo trabalhado à mão.' }
];

// Caminho das fotos de um vestido
window.fotosDe = function(v){
  const arr = [];
  for(let i=1;i<=v.n;i++) arr.push('imagens/catalogo/'+v.id+'/'+i+'.jpg');
  return arr;
};

// Valor do aluguel = 60% da compra
window.aluguelDe = function(v){ return Math.round(v.preco * 0.6); };

// Formata um valor em reais: 2200 -> "R$ 2.200"
window.precoFmt = function(n){ return 'R$ ' + Number(n).toLocaleString('pt-BR'); };

// Monta a mensagem de WhatsApp já com vestido, opção de compra/aluguel e medidas
window.msgPedido = function(v){
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
