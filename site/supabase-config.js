/* Configuração do Supabase do Maga Ateliê.
   Estas chaves são PÚBLICAS (seguras no navegador) — quem protege os dados é o
   RLS lá no banco: o público só LÊ; só a Maria logada consegue editar.
   Precisa carregar o supabase-js ANTES deste arquivo. */
window.SB_URL = 'https://wikszkwzlzafafbgluxt.supabase.co';
window.SB_KEY = 'sb_publishable_nqaoT5I31TPbv3Llwpubpg_xK1h3bFr';

window.sb = (window.supabase && window.supabase.createClient)
  ? window.supabase.createClient(window.SB_URL, window.SB_KEY)
  : null;
