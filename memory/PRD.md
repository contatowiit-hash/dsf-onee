# PRD — Desafio ONEE (Landing Page)

## Problem statement (original)
Landing page moderna, profissional e persuasiva para o produto educacional "Desafio ONEE", preparação INDEPENDENTE para a Olimpíada Nacional de Eficiência Energética. Público: estudantes do 8º/9º ano e responsáveis. Objetivo: capturar leads. Restrições: não se dizer oficial da ANEEL/ONEE, sem logos oficiais, sem promessa de medalha/aprovação, sem depoimentos/números inventados. Estilo: edtech moderno, energético, fundo claro, tipografia grande, animações sutis, responsivo, aparência premium. Estrutura: Hero, Problema, Solução, Como Funciona, Conteúdo, Lead Magnet (checklist por e-mail), Oferta, FAQ, CTA Final. Requisitos: performance, SEO básico, formulário funcional, pronto para integrar e-mail marketing depois.

## Decisões do usuário
- Leads salvos no banco de dados do próprio app (MongoDB) — integração com e-mail marketing fica para depois.
- Estilo edtech energético definido pelo especialista de design (fundo claro + acentos volt/amarelo elétrico).
- Botão de compra → link placeholder de checkout externo (Hotmart/Kiwify), fácil de trocar.
- Oferta agressiva: preço de lançamento R$ 27,93 (usuário sobrescreveu o R$ 19,90 do briefing) + "assistência profissional" inclusa.
- Usuário mencionou interesse futuro em API do Grok (pendente de chave).

## Arquitetura
- Frontend: React 19 + Tailwind + framer-motion (scroll reveals, hero cinético com masked line reveal) + lenis (smooth scroll) + canvas customizado de partículas elétricas com parallax de mouse.
- Backend: FastAPI + MongoDB (motor). Rotas: POST /api/leads (dedupe por e-mail, validação EmailStr), GET /api/leads/count, GET /api/.
- Checkout: constante CHECKOUT_URL em src/components/Offer.jsx apontando para placeholder Hotmart.

## Personas
- Estudante do 8º/9º ano que quer se preparar para a ONEE.
- Responsável que busca material organizado e confiável para o filho/a.

## Requisitos atendidos (2026-09-05)
- 9 seções completas com a copy do briefing (Hero, Problema, Solução, Como Funciona, Conteúdo c/ 9 temas, Lead Magnet, Oferta R$ 27,93, FAQ c/ 6 perguntas, CTA Final).
- Captura de leads funcional salvando em MongoDB, com dedupe e mensagem de sucesso.
- Disclaimers legais (badge "preparação independente", FAQ e rodapé) — sem promessas de resultado, sem logos oficiais, sem números inventados.
- SEO básico (title, meta description, og tags, lang pt-BR), responsividade completa, microinterações hover/active, marquee editorial, capítulos numerados.

## Verificado
- curl: POST /api/leads (novo, duplicado, e-mail inválido 422), GET /api/leads/count.
- Screenshot e2e: hero, navegação por âncoras, envio do formulário com mensagem de sucesso, oferta, FAQ, CTA final, menu mobile hamburger, sem overflow horizontal.

## Pendências / NÃO implementado
- Envio real do checklist por e-mail (leads ficam salvos; a mensagem de sucesso menciona e-mail — envio depende de integração futura com e-mail marketing).
- Checkout real (botão aponta para placeholder Hotmart — substituir pela URL real).
- Exportação/visualização dos leads capturados (não há tela admin).

## Backlog priorizado
- P0: Trocar CHECKOUT_URL pelo link real de pagamento (Hotmart/Kiwify).
- P0: Integrar ferramenta de e-mail marketing para enviar o checklist automaticamente.
- P1: Página/endpoint admin simples para exportar leads (CSV).
- P1: Assistente de estudos com IA (Grok) quando o usuário obtiver a chave de API.
- P2: Pixel de conversão (Meta/Google Ads) e OG image.
