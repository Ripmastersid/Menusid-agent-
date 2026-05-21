import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Calculator,
  Check,
  Clock3,
  ClipboardList,
  Handshake,
  MessageCircle,
  Megaphone,
  PlugZap,
  QrCode,
  ReceiptText,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  UtensilsCrossed,
  Workflow,
  Zap,
} from 'lucide-react'

type MenuItem = {
  name: string
  description: string
  price: number
  tag: string
}

const menu: MenuItem[] = [
  {
    name: 'Burger Artesanal da Casa',
    description: 'Blend 180g, queijo, bacon crocante e molho secreto.',
    price: 36.9,
    tag: 'Mais vendido',
  },
  {
    name: 'Risoto de Camarão Cremoso',
    description: 'Arroz arbóreo, parmesão, limão siciliano e ervas.',
    price: 58.5,
    tag: 'Sugestão da IA',
  },
  {
    name: 'Combo Família Express',
    description: '2 pratos principais, 2 bebidas e sobremesa compartilhada.',
    price: 119.9,
    tag: 'Ticket alto',
  },
]

const benefits = [
  'Pedidos por WhatsApp, QR Code, site e redes sociais em uma só fila',
  'Agente de IA recomenda pratos, tira dúvidas e aumenta o ticket médio',
  'Cardápio digital com pagamento, status do pedido e relatórios em tempo real',
]

const stats = [
  { value: '24/7', label: 'atendimento automático' },
  { value: '+38%', label: 'mais pedidos sem equipe extra' },
  { value: '3 min', label: 'para publicar o cardápio' },
]

const features = [
  {
    icon: MessageCircle,
    title: 'Agente IA que vende',
    text: 'Conversa com clientes, entende preferências, oferece adicionais e confirma pedidos com linguagem natural.',
  },
  {
    icon: ReceiptText,
    title: 'Pedidos organizados',
    text: 'Cada pedido chega com itens, observações, endereço, pagamento e tempo estimado para a cozinha.',
  },
  {
    icon: QrCode,
    title: 'Cardápio via QR Code',
    text: 'Perfeito para salão, delivery e retirada. Atualize preços e disponibilidade em segundos.',
  },
  {
    icon: BarChart3,
    title: 'Painel de performance',
    text: 'Veja pratos campeões, horários de pico, conversão do agente e oportunidades de upsell.',
  },
]

const salesSteps = [
  {
    icon: Store,
    title: 'Escolha nichos fáceis de fechar',
    text: 'Comece por pizzarias, lanchonetes, marmitarias, pensões e restaurantes de bairro que já recebem pedidos pelo WhatsApp.',
  },
  {
    icon: Megaphone,
    title: 'Venda o problema, não a tecnologia',
    text: 'Mostre mensagens perdidas, demora no atendimento, erro em pedidos e falta de upsell como dinheiro ficando na mesa.',
  },
  {
    icon: Handshake,
    title: 'Faça uma oferta simples',
    text: 'Landing page + cardápio digital + agente IA configurado + suporte mensal. Cobre implantação e mensalidade recorrente.',
  },
  {
    icon: Calculator,
    title: 'Prove o retorno',
    text: 'Use uma conta direta: se o agente recuperar 10 pedidos por mês ou vender adicionais, a mensalidade já se paga.',
  },
]

const integrationSteps = [
  {
    icon: ClipboardList,
    title: '1. Levantamento do cardápio',
    text: 'Reúna produtos, preços, adicionais, horários, formas de pagamento, taxa de entrega, bairros atendidos e regras da casa.',
  },
  {
    icon: Bot,
    title: '2. Treinamento do agente',
    text: 'Crie uma base de conhecimento com tom de voz, respostas frequentes, política de trocas, sugestões e combos rentáveis.',
  },
  {
    icon: PlugZap,
    title: '3. Conexão com canais',
    text: 'Integre WhatsApp Business API, botão da landing page, QR Code de mesa e, quando necessário, planilha ou sistema de pedidos.',
  },
  {
    icon: Workflow,
    title: '4. Fluxo de pedido',
    text: 'O agente coleta itens, observações, endereço, pagamento e envia um resumo para cozinha, balcão ou atendente humano aprovar.',
  },
  {
    icon: Settings2,
    title: '5. Testes e ajustes',
    text: 'Simule pedidos reais, corrija respostas, defina transferência para humano e acompanhe conversão semanalmente.',
  },
]

const offerPackages = [
  { name: 'Implantação', price: 'R$ 497 a R$ 1.500', detail: 'Landing page, cardápio, QR Code e configuração inicial do agente.' },
  { name: 'Mensalidade', price: 'R$ 197 a R$ 697/mês', detail: 'Hospedagem, ajustes, relatórios, suporte e evolução do agente.' },
  { name: 'Performance', price: '5% a 10%', detail: 'Opcional: comissão sobre pedidos gerados ou recuperados pela IA.' },
]

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

const whatsappLink = 'https://wa.me/5521966053200?text=Ol%C3%A1%2C%20quero%20o%20Menusid%20AI%20Menu%20Agent%20para%20meu%20restaurante.'

function App() {
  const [cart, setCart] = useState<MenuItem[]>([menu[0]])
  const [message, setMessage] = useState('')
  const [monthlyOrders, setMonthlyOrders] = useState(180)
  const [chat, setChat] = useState([
    { from: 'ai', text: 'Olá! Sou a Luna, agente IA do seu restaurante. Quer uma sugestão para hoje?' },
    { from: 'guest', text: 'Quero algo rápido e com boa margem.' },
    { from: 'ai', text: 'Recomendo o Combo Família Express. Posso oferecer bebida extra e sobremesa por +R$ 24,90.' },
  ])

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart])
  const projectedRevenue = useMemo(() => monthlyOrders * 7.5 + 890, [monthlyOrders])

  const addToCart = (item: MenuItem) => {
    setCart((current) => [...current, item])
    setChat((current) => [
     ...current,
      { from: 'guest', text: `Adicionar ${item.name}` },
      { from: 'ai', text: `Perfeito! ${item.name} entrou no pedido. Quer que eu sugira um acompanhamento?` },
    ])
  }

  const sendMessage = () => {
    const trimmed = message.trim()
    if (!trimmed) return

    setChat((current) => [
     ...current,
      { from: 'guest', text: trimmed },
      {
        from: 'ai',
        text: 'Entendi. Vou responder como atendente, confirmar detalhes do pedido e sugerir o melhor adicional para aumentar a venda.',
      },
    ])
    setMessage('')
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#1A3A3A] text-[#F4E9CD]">
      <section className="relative px-5 pb-20 pt-6 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,#2A9D8F30,transparent_34%),radial-gradient(circle_at_80%_20%,#D97D5430,transparent_28%),linear-gradient(135deg,#1A3A3A_0%,#1E1E1E_55%,#1A3A3A_100%)]" />
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center justify-between rounded-full border border-[#4A2C2A] bg-[#1E1E1E]/70 px-4 py-3 shadow-sm backdrop-blur">
            <div className="flex items-center gap-3">
              <img src="/logo-agent.png" alt="Menusid Logo" className="h-11 w-11 rounded-full object-cover" />
              <div>
                <p className="text-lg font-black tracking-tight text-[#F4E9CD]">MENUSID</p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2A9D8F]">AI MENU AGENT</p>
              </div>
            </div>
            <div className="hidden items-center gap-8 text-sm font-bold text-[#F4E9CD]/80 md:flex">
              <a href="#recursos" className="transition hover:text-[#D97D54]">Recursos</a>
              <a href="#vender" className="transition hover:text-[#D97D54]">Como vender</a>
              <a href="#integracao" className="transition hover:text-[#D97D54]">Integração</a>
              <a href="#demo" className="transition hover:text-[#D97D54]">Demo</a>
              <a href="#planos" className="transition hover:text-[#D97D54]">Planos</a>
            </div>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="rounded-full bg-[#2A9D8F] px-5 py-3 text-sm font-black text-[#1A3A3A] shadow-lg shadow-[#2A9D8F]/25 transition hover:-translate-y-0.5 hover:bg-[#D97D54] hover:text-white">
              Quero o Menusid
            </a>
          </nav>

          <div className="grid items-center gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-24">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#4A2C2A] bg-[#1E1E1E]/80 px-4 py-2 text-sm font-extrabold text-[#2A9D8F] shadow-sm"
              >
                <Sparkles size={18} /> Agente de IA para atender e vender mais
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-[#F4E9CD] sm:text-6xl lg:text-7xl"
              >
                Pedidos online com uma IA que atende como seu melhor garçom.
              </motion.h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#F4E9CD]/75 sm:text-xl">
                Transforme WhatsApp, QR Code e delivery em um fluxo inteligente: o cliente conversa, escolhe, paga e acompanha o pedido sem filas ou mensagens perdidas.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2A9D8F] px-7 py-4 font-black text-[#1A3A3A] shadow-xl shadow-[#2A9D8F]/20 transition hover:-translate-y-1 hover:bg-[#D97D54] hover:text-white">
                  Quero o Menusid <ArrowRight className="transition group-hover:translate-x-1" size={20} />
                </a>
                <a href="#recursos" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#4A2C2A] bg-[#1E1E1E]/70 px-7 py-4 font-black text-[#F4E9CD] transition hover:-translate-y-1 hover:bg-[#4A2C2A]">
                  <UtensilsCrossed size={20} /> Conhecer recursos
                </a>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-[#4A2C2A] bg-[#1E1E1E]/65 p-5 shadow-sm">
                    <p className="text-3xl font-black text-[#D97D54]">{stat.value}</p>
                    <p className="mt-1 text-sm font-bold text-[#F4E9CD]/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.15 }}
              id="demo"
              className="relative"
            >
              <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-[#2A9D8F] blur-3xl" />
              <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-[#D97D54]/40 blur-3xl" />
              <div className="relative rounded-[2.2rem] border border-[#4A2C2A] bg-[#1E1E1E] p-3 shadow-2xl shadow-black/40">
                <div className="rounded-[1.7rem] bg-[#1A3A3A] p-5">
                  <div className="flex items-center justify-between border-b border-[#4A2C2A] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#2A9D8F] text-[#1A3A3A]">
                        <Bot size={26} />
                      </div>
                      <div>
                        <p className="font-black">Luna IA</p>
                        <p className="flex items-center gap-1 text-xs font-bold text-emerald-400"><span className="h-2 w-2 rounded-full bg-emerald-400" /> online agora</p>
                      </div>
                    </div>
                    <div className="rounded-full bg-[#4A2C2A] px-3 py-1 text-xs font-black text-[#D97D54]">Mesa 12</div>
                  </div>

                  <div className="mt-4 h-72 space-y-3 overflow-y-auto pr-1">
                    {chat.map((item, index) => (
                      <div key={`${item.text}-${index}`} className={`flex ${item.from === 'guest'? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[82%] rounded-3xl px-4 py-3 text-sm font-semibold leading-6 ${item.from === 'guest'? 'bg-[#4A2C2A] text-[#F4E9CD]' : 'bg-[#2A9D8F]/20 text-[#F4E9CD]'}`}>
                          {item.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex gap-2 rounded-2xl border border-[#4A2C2A] bg-[#1E1E1E] p-2">
                    <input
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
                      placeholder="Digite uma pergunta do cliente..."
                      className="min-w-0 flex-1 bg-transparent px-3 text-sm font-semibold text-[#F4E9CD] outline-none placeholder:text-[#F4E9CD]/40"
                    />
                    <button onClick={sendMessage} className="rounded-xl bg-[#D97D54] px-4 py-2 text-sm font-black text-white transition hover:bg-[#2A9D8F] hover:text-[#1A3A3A]">
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="recursos" className="bg-[#1E1E1E] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#2A9D8F]/10 px-4 py-2 text-sm font-black text-[#2A9D8F]"><Zap size={18} /> Operação sem caos</p>
              <h2 className="text-4xl font-black tracking-[-0.04em] text-[#F4E9CD] sm:text-5xl">Da conversa ao preparo, tudo conectado.</h2>
              <div className="mt-8 space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex gap-3 rounded-3xl border border-[#4A2C2A] bg-[#1A3A3A]/60 p-4">
                    <Check className="mt-1 shrink-0 text-[#2A9D8F]" size={20} />
                    <p className="font-semibold leading-7 text-[#F4E9CD]/82">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="rounded- border border-[#4A2C2A] bg-[#1A3A3A]/70 p-6 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:bg-[#1A3A3A]">
                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#2A9D8F] text-[#1A3A3A]">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-black text-[#F4E9CD]">{feature.title}</h3>
                    <p className="mt-3 leading-7 text-[#F4E9CD]/72">{feature.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 font-black uppercase tracking-[0.22em] text-[#D97D54]">Cardápio inteligente</p>
              <h2 className="text-4xl font-black tracking-[-0.04em] text-[#F4E9CD] sm:text-5xl">Monte pedidos em tempo real.</h2>
            </div>
            <div className="rounded-3xl border border-[#4A2C2A] bg-[#1E1E1E] p-5 shadow-sm">
              <p className="text-sm font-bold text-[#F4E9CD]/70">Total do pedido</p>
              <p className="text-3xl font-black text-[#D97D54]">{formatCurrency(total)}</p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {menu.map((item) => (
              <div key={item.name} className="group rounded- border border-[#4A2C2A] bg-[#1E1E1E] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30">
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full bg-[#2A9D8F]/20 px-3 py-1 text-xs font-black text-[#2A9D8F]">{item.tag}</span>
                  <ShoppingBag className="text-[#D97D54]" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-[#F4E9CD]">{item.name}</h3>
                <p className="mt-3 min-h-16 leading-7 text-[#F4E9CD]/70">{item.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-2xl font-black text-[#F4E9CD]">{formatCurrency(item.price)}</p>
                  <button onClick={() => addToCart(item)} className="rounded-full bg-[#4A2C2A] px-5 py-3 text-sm font-black text-[#F4E9CD] transition group-hover:bg-[#D97D54] group-hover:text-white">
                    Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vender" className="bg-[#1E1E1E] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="sticky top-6 rounded- border border-[#4A2C2A] bg-[#1A3A3A] p-7 shadow-xl shadow-black/30">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#2A9D8F] px-4 py-2 text-sm font-black text-[#1A3A3A]"><Handshake size={18} /> Guia comercial</p>
              <h2 className="text-4xl font-black tracking-[-0.04em] text-[#F4E9CD] sm:text-5xl">Como vender para restaurantes locais.</h2>
              <p className="mt-5 leading-8 text-[#F4E9CD]/75">Use a landing page como demonstração visual e venda um pacote recorrente: presença digital, automação de pedidos e atendimento com IA.</p>

              <div className="mt-7 rounded-3xl bg-[#1E1E1E] p-5 text-[#F4E9CD]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-[#F4E9CD]/70">Pedidos/mês do cliente</p>
                    <p className="text-3xl font-black text-[#D97D54]">{monthlyOrders}</p>
                  </div>
                  <Calculator className="text-[#D97D54]" size={34} />
                </div>
                <input
                  type="range"
                  min="40"
                  max="600"
                  step="20"
                  value={monthlyOrders}
                  onChange={(event) => setMonthlyOrders(Number(event.target.value))}
                  className="mt-5 w-full accent-[#D97D54]"
                />
                <p className="mt-4 text-sm font-semibold leading-6 text-[#F4E9CD]/75">Exemplo de argumento: recuperando poucos pedidos perdidos e vendendo adicionais, o restaurante pode gerar cerca de <strong className="text-[#F4E9CD]">{formatCurrency(projectedRevenue)}</strong> em valor adicional estimado.</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {salesSteps.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="rounded- border border-[#4A2C2A] bg-[#1A3A3A] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30">
                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#D97D54] text-white"><Icon size={24} /></div>
                    <h3 className="text-xl font-black text-[#F4E9CD]">{step.title}</h3>
                    <p className="mt-3 leading-7 text-[#F4E9CD]/70">{step.text}</p>
                  </div>
                )
              })}
              <div className="sm:col-span-2 rounded- bg-[#4A2C2A] p-6 text-[#F4E9CD]">
                <h3 className="text-2xl font-black">Script rápido de abordagem</h3>
                <p className="mt-3 leading-8 text-[#F4E9CD]/78">“Vi que vocês recebem muitos pedidos pelo WhatsApp. Posso montar uma página com cardápio e um atendente de IA que responde clientes, tira dúvidas, sugere adicionais e envia o pedido organizado para sua equipe. Quer ver uma demo com o cardápio de vocês?”</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="integracao" className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 font-black uppercase tracking-[0.22em] text-[#D97D54]">Integração do agente</p>
            <h2 className="text-4xl font-black tracking-[-0.04em] text-[#F4E9CD] sm:text-5xl">Como conectar a IA no restaurante, pizzaria ou pensão.</h2>
            <p className="mt-5 text-lg leading-8 text-[#F4E9CD]/75">O caminho mais seguro é começar com atendimento assistido: a IA monta o pedido e a equipe confirma. Depois, você automatiza pagamento, impressão e cozinha.</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-5">
            {integrationSteps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="rounded- border border-[#4A2C2A] bg-[#1E1E1E] p-6 shadow-sm">
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[#2A9D8F]/20 text-[#2A9D8F]"><Icon size={24} /></div>
                  <h3 className="text-lg font-black text-[#F4E9CD]">{step.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#F4E9CD]/70">{step.text}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {offerPackages.map((offer) => (
              <div key={offer.name} className="rounded- bg-[#4A2C2A] p-6 text-[#F4E9CD]">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#D97D54]">{offer.name}</p>
                <p className="mt-3 text-3xl font-black">{offer.price}</p>
                <p className="mt-3 leading-7 text-[#F4E9CD]/72">{offer.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="planos" className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[2.5rem] bg-[#D97D54] p-6 text-white shadow-2xl shadow-[#D97D54]/20 lg:grid-cols-[1fr_0.8fr] lg:p-10">
          <div className="rounded- bg-black/20 p-8">
            <div className="mb-6 flex items-center gap-2 text-[#F4E9CD]">
              {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={20} fill="currentColor" />)}
            </div>
            <h2 className="max-w-2xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Pronto para receber pedidos sem perder clientes?</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/84">Lance uma operação digital com agente de IA, cardápio online e painel de pedidos. Ideal para restaurantes, hamburguerias, pizzarias, cafeterias e dark kitchens.</p>
          </div>
          <div className="rounded- bg-[#1A3A3A] p-8 text-[#F4E9CD]">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-black text-emerald-300"><ShieldCheck size={18} /> Implantação assistida</p>
            <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-[#2A9D8F]">A partir de</p>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-5xl font-black tracking-tight text-white">R$ 197</span>
              <span className="pb-2 font-bold text-[#F4E9CD]/70">/mês</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm font-bold text-[#F4E9CD]/80">
              <li className="flex gap-2"><Clock3 className="text-[#D97D54]" size={18} /> Atendimento automático 24h</li>
              <li className="
