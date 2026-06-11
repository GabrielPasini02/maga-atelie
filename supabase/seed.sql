-- ============================================================
--  Maga Ateliê — Carga inicial dos vestidos (rodar 1x)
--  Rode o schema.sql ANTES. Depois cole isto no SQL Editor e Run.
--  (Se rodar de novo, não duplica — ignora os que já existem.)
-- ============================================================

insert into public.vestidos (id, nome, colecao, tag, preco, descricao, fotos, em_destaque, ativo, ordem) values
('classico-1','Jasmim','Jardim','Clássico',2600,'Clássico atemporal para o grande dia.','["imagens/catalogo/classico-1/1.jpg","imagens/catalogo/classico-1/2.jpg","imagens/catalogo/classico-1/3.jpg"]',false,true,1),
('classico-3','Hortênsia','Jardim','Clássico',2700,'Sobriedade e brilho num clássico inesquecível.','["imagens/catalogo/classico-3/1.jpg","imagens/catalogo/classico-3/2.jpg"]',false,true,2),
('minimalista-1','Lírio','Jardim','Minimalista',2200,'Linhas limpas e elegância que dispensa excessos.','["imagens/catalogo/minimalista-1/1.jpg","imagens/catalogo/minimalista-1/2.jpg"]',false,true,3),
('minimalista-2','Magnólia','Jardim','Minimalista',2300,'O minimalismo numa leitura sóbria e atual.','["imagens/catalogo/minimalista-2/1.jpg","imagens/catalogo/minimalista-2/2.jpg","imagens/catalogo/minimalista-2/3.jpg"]',false,true,4),
('minimalista-3','Camélia','Jardim','Minimalista',2400,'Pureza de formas, do corpete à barra.','["imagens/catalogo/minimalista-3/1.jpg","imagens/catalogo/minimalista-3/2.jpg","imagens/catalogo/minimalista-3/3.jpg","imagens/catalogo/minimalista-3/4.jpg"]',false,true,5),
('sereia-pala','Orquídea','Jardim','Sereia',2900,'Pala removível — dois looks num só vestido.','["imagens/catalogo/sereia-pala/1.jpg","imagens/catalogo/sereia-pala/2.jpg"]',false,true,6),
('classico-2','Acácia','Jardim','Clássico',2500,'Elegância clássica do jeito que a noiva sonha.','["imagens/catalogo/classico-2/1.jpg","imagens/catalogo/classico-2/2.jpg"]',false,true,7),
('sereia','Íris','Maré','Sereia',2400,'Caimento que marca as curvas com delicadeza.','["imagens/catalogo/sereia/1.jpg"]',false,true,8),
('semissereia-drapeado','Dália','Maré','Semissereia',2300,'Drapeado suave que valoriza o corpo.','["imagens/catalogo/semissereia-drapeado/1.jpg"]',false,true,9),
('gode-drapeado','Peônia','Maré','Godê',2500,'Godê duplo e drapeado: volume com movimento.','["imagens/catalogo/gode-drapeado/1.jpg","imagens/catalogo/gode-drapeado/2.jpg"]',false,true,10),
('fluido-1','Lavanda','Brisa','Fluido',1800,'Leveza e movimento em cada passo.','["imagens/catalogo/fluido-1/1.jpg"]',false,true,11),
('fluido-2','Alecrim','Brisa','Fluido',1800,'A versão fluida, ainda mais aérea.','["imagens/catalogo/fluido-2/1.jpg"]',false,true,12),
('tule','Gardênia','Brisa','Tule',2000,'Camadas de tule para um ar romântico.','["imagens/catalogo/tule/1.jpg","imagens/catalogo/tule/2.jpg"]',false,true,13),
('georgette','Margarida','Brisa','Georgette',1700,'Georgette de caimento impecável e toque suave.','["imagens/catalogo/georgette/1.jpg"]',false,true,14),
('fuccia-1','Tulipa','Florescer','Fúcsia',1900,'Fúcsia vibrante para brilhar na festa.','["imagens/catalogo/fuccia-1/1.jpg"]',false,true,15),
('fuccia-2','Petúnia','Florescer','Fúcsia',1900,'Outra leitura do fúcsia — cor que não passa despercebida.','["imagens/catalogo/fuccia-2/1.jpg"]',false,true,16),
('casual-chique','Violeta','Florescer','Casual',1500,'Confortável sem abrir mão do charme.','["imagens/catalogo/casual-chique/1.jpg"]',false,true,17),
('longo','Cerejeira','Estação','Longo',1800,'Comprimento longo com presença e fluidez.','["imagens/catalogo/longo/1.jpg"]',false,true,18),
('madrinha','Girassol','Estação','Madrinha',1700,'Pensado para madrinhas que querem se destacar com elegância.','["imagens/catalogo/madrinha/1.jpg"]',false,true,19),
('destaque','Dama-da-Noite','Destaque','Obra-prima',3000,'Vestido de noiva boho em renda e tule, todo trabalhado à mão.','["imagens/car-1.jpg","imagens/car-2.jpg","imagens/car-3.jpg","imagens/car-4.jpg","imagens/car-5.jpg"]',true,true,0)
on conflict (id) do nothing;

-- destaque da home
update public.config set
  destaque_id     = 'destaque',
  destaque_titulo = 'O vestido que nasceu pra ser lembrado.',
  destaque_texto  = 'Cada drapeado deste vestido foi pensado à mão, pra abraçar o corpo e revelar a elegância de quem o veste. É a peça onde coloco tudo o que aprendi no ateliê.'
where id = 1;
