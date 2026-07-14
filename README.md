# Maga Ateliê

Site e painel de gestão de um ateliê de alta costura sob medida. **No ar:** [magaatelie.vercel.app](https://magaatelie.vercel.app)

---

## O que é

Não é só uma landing page. São **duas coisas**:

**1. O site público** — vitrine dos vestidos, coleção, página individual de cada peça e contato direto por WhatsApp. É o que a noiva vê.

**2. Um painel privado** (`/painel`) — onde a dona do ateliê, sozinha e sem depender de mim, **cadastra vestidos, sobe fotos, edita preços e gerencia pedidos**. Sem precisar mexer em código.

O objetivo era esse desde o começo: entregar um site que ela pudesse **manter sem mim**.

## Arquitetura

- **Front-end estático** — HTML, CSS e JavaScript puro. Sem framework, sem build. Carrega rápido em 4G, que é como a maioria das clientes acessa.
- **Supabase** como backend — banco Postgres + Storage pras imagens dos vestidos.
- **Autenticação** — só a dona logada acessa o painel.

### Segurança: RLS, não "chave escondida"

A chave do Supabase que vai no navegador é a **publishable/anon** — ela é pública por natureza, e esconder não é proteção.

Quem protege os dados é o **Row Level Security (RLS)** no Postgres. As políticas estão em [`supabase/`](supabase/):

- **Público:** só `SELECT` nos vestidos e na configuração da vitrine
- **Dona autenticada:** `INSERT`, `UPDATE` e `DELETE`
- **Storage:** leitura pública das fotos, escrita só autenticada

Tabelas cobertas: `vestidos`, `config`, `contratos`, `precos_config`, `precificacao` — todas com `ENABLE ROW LEVEL SECURITY` e política explícita.

## Performance

O desafio real não era layout — era manter o **vídeo do hero** (que é o que mostra o trabalho manual e segura a visitante) sem pesar no celular.

- **Imagens otimizadas: ~74% de redução de peso** — o hero caiu de **3,3 MB para 0,46 MB**
- Vídeo do hero **preservado**
- `lazy loading` + `fetchpriority` nas imagens
- `robots.txt` e `sitemap.xml` pra indexação

## Stack

`HTML5` · `CSS3` · `JavaScript` (vanilla) · `Supabase` (Postgres + Storage + Auth + RLS) · `Vercel`

---

<sub>Desenvolvido por <a href="https://github.com/GabrielPasini02">Gabriel Pasini</a> · <a href="https://orbion-ia.vercel.app">Orbion</a></sub>
