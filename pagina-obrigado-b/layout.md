# Layout - JT Engenharia (Página de Agradecimento)

**Aesthetic Identity:** Industrial Minimal Craft — Uma composição clean e minimalista que reflete a precisão e a sobriedade industrial da marca, mantendo a sobriedade e o tom amigável.

---

## 1. CORE DESIGN SYSTEM

### Palette
- **Primary (Carbon):** #1A1A1A — Cor principal de texto e elementos de marca — Usar para a headline e estrutura forte.
- **Accent (Ouro):** #F5C518 — Amarelo ouro icônico da JT Engenharia — Usar em detalhes sutis (borda superior do card, destaque de marca).
- **Background (Surface Light):** #F7F7F5 — Fundo claro e limpo — Usar como background da página inteira para um visual amigável.
- **Card Background:** #FFFFFF — Branco puro — Usar para o container da mensagem central.
- **Text Muted:** #6B6B6B — Cinza médio — Usar para o subtítulo/mensagem secundária.
- **Border Light:** rgba(26, 26, 26, 0.08) — Cinza ultra-sutil — Usar para delimitar o card central.

### Typography
- **Headings:** 'Space Grotesk', sans-serif (Bold 700) — Tipografia industrial moderna para o título principal.
- **Body:** 'Inter Tight', sans-serif (Regular 400) — Tipografia neutra e de alta legibilidade para a mensagem e o rodapé.

### Visual Texture
- **Noise Background:** Fundo com textura sutil de ruído via SVG embutido no CSS (opacity 0.02) para dar profundidade e o mesmo aspecto industrial da landing page principal.
- **Border-radius system:** `--radius-sm` (4px) para pequenos detalhes, `--radius-md` (8px) para o card central de mensagens.
- **Shadow system:** Sombra suave e difusa no card central: `box-shadow: 0 12px 40px rgba(0, 0, 0, 0.03)`.
- **Spacing base:** Sistema baseado em grid de 8px (margins/paddings de 8px, 16px, 24px, 32px, 48px, 64px, etc.).

---

## 2. COMPONENT ARCHITECTURE & BEHAVIOR

### A. NAVBAR (The Quiet Identity)
**Visuals:** Fundo totalmente transparente. Contém apenas a marca oficial da JT Engenharia centralizada horizontalmente. Sem links de navegação para manter o foco total na mensagem.
**Layout:** Posicionado no topo absoluto da página. Altura fixa de 80px. Logo centralizado com altura máxima de 48px.
**Responsividade:** Mobile (375px): Logo com altura máxima de 36px para melhor proporção na tela compacta.

### B. HERO SECTION (The Clean Message)
**Visuals:** Ocupa 100svh (toda a altura da tela). O fundo utiliza a cor `#F7F7F5` com a textura de ruído SVG. No centro da tela, há um card físico branco (`#FFFFFF`) com borda arredondada (`8px`), uma borda superior amarela (`4px` de espessura, usando `#F5C518`), e contorno sutil nas outras extremidades (`1px solid rgba(26, 26, 26, 0.08)`).
**Layout:** Flexbox com alinhamento vertical e horizontal totalmente centralizado. O card central possui largura máxima de 580px e padding de 48px (desktop).
**Typography:**
- Headline ("Agradecemos o seu contato.") em 'Space Grotesk' 700, 40px desktop, cor `#1A1A1A`, line-height 1.2, margin-bottom 16px.
- Subheadline ("No momento, não estamos atendendo essa demanda.") em 'Inter Tight' 400, 18px desktop, cor `#6B6B6B`, line-height 1.6.
**Animation:** O Hero deve carregar de forma instantânea. Sem animação de entrada com opacidade zero ou atrasos visuais, garantindo excelente tempo de LCP.
**Interaction:** Ao passar o mouse sobre o card central, ele recebe uma transição sutil de elevação: `transform: translateY(-2px)` e a sombra aumenta levemente para `box-shadow: 0 16px 48px rgba(0, 0, 0, 0.05)`, com transição suave de `0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
**Responsividade:** Mobile (375px): Headline reduz para 28px, Subheadline reduz para 15px. O card ocupa 100% da largura útil disponível com margem de 16px nas laterais, e o padding interno do card passa para 24px.

### C. FOOTER (The Minimal Base)
**Visuals:** Texto simples e minimalista em cinza médio (`#6B6B6B`). 
**Layout:** Fixo na base da tela, com padding inferior de 24px.
**Typography:** 'Inter Tight' 400, 12px, letter-spacing 0.02em.
**Responsividade:** Centralizado em todas as resoluções.

---

## 3. TECHNICAL REQUIREMENTS
- **Bibliotecas CDN:** Nenhuma biblioteca de animação complexa (como GSAP ou AOS) é requerida, pois a página é 100% focada na mensagem estática e rápida exibição.
- **Micro-interações globais:** Transição suave para o hover do card central (`transition: transform 0.3s, box-shadow 0.3s`).
- **Diretiva de qualidade:** Código HTML5 semântico com validação sem avisos, CSS vanilla estruturado com variáveis CSS de acordo com o design do site principal.
