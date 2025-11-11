import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { Rocket, Code2, Users, Globe, ExternalLink, Wallet, ChevronRight } from 'lucide-react'

function StatCard({ title, value, percent, delay = 0 }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 p-5 shadow-[inset_0_0_10px_#1E293B]">
      <div className="flex items-center justify-between">
        <span className="text-slate-300 text-sm">{title}</span>
        <span className="text-slate-100 font-semibold">{value}</span>
      </div>
      <div className="mt-3 h-2 w-full rounded-full bg-slate-800/80 border border-slate-700/30 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay }}
          className="h-full bg-gradient-to-r from-slate-400 via-blue-500 to-blue-600 shadow-[0_0_12px_#3B82F6]"
        />
      </div>
      <div className="mt-2 text-right text-xs text-slate-400">{percent}%</div>
    </div>
  )
}

export default function App() {
  const [account, setAccount] = useState(null)
  const [ethAmount, setEthAmount] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)

  const rate = 1200 // mock rate: 1 ETH = 1200 NST (for preview only)
  const tokens = useMemo(() => {
    const n = parseFloat(ethAmount || '0')
    if (Number.isNaN(n)) return 0
    return Math.max(0, n * rate)
  }, [ethAmount])

  useEffect(() => {
    // Optional: try to read existing account if already connected
    async function checkConnection() {
      if (window.ethereum?.request) {
        try {
          const accs = await window.ethereum.request({ method: 'eth_accounts' })
          if (accs && accs.length) setAccount(accs[0])
        } catch {}
      }
    }
    checkConnection()
  }, [])

  const connectWallet = async () => {
    if (!window.ethereum?.request) {
      window.open('https://metamask.io/download/', '_blank')
      return
    }
    try {
      setIsConnecting(true)
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(accounts?.[0] ?? null)
    } catch (e) {
      console.error(e)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] via-[#111827] to-[#0b1220] text-slate-100 selection:bg-blue-500/30">
      {/* Top nav */}
      <div className="fixed inset-x-0 top-0 z-40 backdrop-blur-xl bg-slate-900/40 border-b border-slate-700/30">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-slate-200 to-slate-500 shadow-[inset_0_0_10px_#1E293B] ring-1 ring-white/10" />
            <span className="text-slate-100 font-semibold tracking-wide">Nusarithm</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-slate-300">
            <a href="#about" className="hover:text-white transition-all duration-300 ease-in-out">About</a>
            <a href="#tokenomics" className="hover:text-white transition-all duration-300 ease-in-out">Tokenomics</a>
            <a href="#how" className="hover:text-white transition-all duration-300 ease-in-out">How to Buy</a>
            <a href="#roadmap" className="hover:text-white transition-all duration-300 ease-in-out">Roadmap</a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="#buy" className="px-4 py-2 rounded-md bg-blue-500/90 hover:bg-blue-500 text-white shadow-[0_0_20px_#3B82F6] transition-all duration-300">Buy Token</a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 h-[1200px] w-[1200px] rounded-full bg-gradient-to-br from-[#1F2937] to-[#3B82F6] blur-[120px] opacity-30 pointer-events-none" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-semibold leading-tight text-slate-100"
            >
              Own the Future of Digital Assets
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-slate-300 text-lg max-w-xl"
            >
              Join our Ethereum-powered token sale and shape decentralized finance.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a href="#buy" className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-3 text-white shadow-[0_0_24px_#3B82F6] hover:bg-blue-500/90 transition-all duration-300">
                Buy Token <ChevronRight size={18} />
              </a>
              <a href="#whitepaper" className="inline-flex items-center gap-2 rounded-lg border border-slate-700/40 bg-white/5 px-5 py-3 text-slate-100 hover:bg-white/10 transition-all duration-300">
                Whitepaper <ExternalLink size={18} />
              </a>
            </motion.div>
          </div>
          <div className="relative h-[420px] md:h-[520px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[inset_0_0_10px_#1E293B]">
            <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
          </div>
        </div>
      </section>

      {/* About Token */}
      <section id="about" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-8 shadow-[inset_0_0_10px_#1E293B]">
              <h3 className="text-2xl font-semibold">About Token</h3>
              <p className="mt-3 text-slate-300 max-w-2xl">
                Nusarithm Token ($NST) is an ERC‑20 asset designed for utility, governance, and liquidity on the Ethereum network.
                Built with a focus on sustainability and real-world adoption.
              </p>
              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-slate-400 text-sm">Name</div>
                  <div className="text-slate-100 font-medium">Nusarithm Token</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-slate-400 text-sm">Symbol</div>
                  <div className="text-slate-100 font-medium">$NST</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-slate-400 text-sm">Total Supply</div>
                  <div className="text-slate-100 font-medium">1,000,000,000</div>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <div className="text-slate-400 text-sm">Network</div>
                  <div className="text-slate-100 font-medium">Ethereum (ERC‑20)</div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#etherscan" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                  View on Etherscan <ExternalLink size={16} />
                </a>
                <a href="#presale" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                  Join Presale <ChevronRight size={16} />
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-8 shadow-[inset_0_0_10px_#1E293B]">
              <h4 className="text-lg font-medium text-slate-200">Smart Contract</h4>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between text-slate-400"><span>Standard</span><span>ERC‑20</span></div>
                <div className="flex justify-between text-slate-400"><span>Chain</span><span>Ethereum</span></div>
                <div className="flex justify-between text-slate-400"><span>Contract</span><span className="font-mono text-slate-300">0xABC...1234</span></div>
                <div className="flex justify-between text-slate-400"><span>Audited</span><span className="text-emerald-400">Yes</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics */}
      <section id="tokenomics" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-semibold">Tokenomics</h3>
            <p className="text-slate-400 mt-2">Balanced distribution to fuel growth and community.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Public Sale" value="40%" percent={40} delay={0.05} />
            <StatCard title="Team" value="15%" percent={15} delay={0.1} />
            <StatCard title="Liquidity" value="25%" percent={25} delay={0.15} />
            <StatCard title="Reserve" value="20%" percent={20} delay={0.2} />
          </div>
        </div>
      </section>

      {/* How to Buy */}
      <section id="how" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-semibold">How to Buy</h3>
            <p className="text-slate-400 mt-2">Three simple steps to join the sale.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-8 shadow-[inset_0_0_10px_#1E293B]">
              <ol className="space-y-5">
                <li className="flex gap-4">
                  <div className="mt-1 h-8 w-8 shrink-0 rounded-lg bg-blue-500/20 border border-blue-500/40 grid place-items-center text-blue-300 shadow-[0_0_20px_#3B82F6]">1</div>
                  <div>
                    <div className="font-medium">Connect Wallet (MetaMask)</div>
                    <div className="text-slate-400 text-sm">Authorize your Ethereum wallet to participate.</div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 h-8 w-8 shrink-0 rounded-lg bg-blue-500/20 border border-blue-500/40 grid place-items-center text-blue-300 shadow-[0_0_20px_#3B82F6]">2</div>
                  <div>
                    <div className="font-medium">Enter Amount</div>
                    <div className="text-slate-400 text-sm">Specify how much ETH you want to contribute.</div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 h-8 w-8 shrink-0 rounded-lg bg-blue-500/20 border border-blue-500/40 grid place-items-center text-blue-300 shadow-[0_0_20px_#3B82F6]">3</div>
                  <div>
                    <div className="font-medium">Buy Token</div>
                    <div className="text-slate-400 text-sm">Confirm the transaction in your wallet.</div>
                  </div>
                </li>
              </ol>
            </div>

            <div id="buy" className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-8 shadow-[inset_0_0_10px_#1E293B]">
              <div className="flex items-center justify-between">
                <div className="text-slate-300 text-sm">Sale is live on Ethereum</div>
                <a href="#etherscan" className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center gap-1">View on Etherscan <ExternalLink size={14} /></a>
              </div>
              <div className="mt-6 grid gap-4">
                <button onClick={connectWallet} disabled={isConnecting}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white shadow-[0_0_20px_#3B82F6] hover:bg-blue-500/90 transition-all duration-300">
                  <Wallet size={18} /> {account ? `Connected: ${account.slice(0,6)}...${account.slice(-4)}` : (isConnecting ? 'Connecting...' : 'Connect Wallet')}
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-300">Amount (ETH)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={ethAmount}
                      onChange={(e)=>setEthAmount(e.target.value)}
                      placeholder="0.25"
                      className="mt-1 w-full rounded-lg border border-slate-700/40 bg-slate-900/40 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300">You receive (NST)</label>
                    <input
                      readOnly
                      value={tokens}
                      className="mt-1 w-full rounded-lg border border-slate-700/40 bg-slate-900/40 px-3 py-2 text-slate-100"
                    />
                  </div>
                </div>
                <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700/40 bg-gradient-to-br from-slate-700/40 to-slate-800/60 px-5 py-3 text-slate-100 hover:from-slate-600/40 hover:to-slate-800/60 transition-all duration-300">
                  Buy Token
                </button>
                <p className="text-xs text-slate-400">Rate: 1 ETH = {rate} NST • This is a preview UI. Connect wallet to proceed in a real deployment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="relative py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-semibold">Roadmap</h3>
            <p className="text-slate-400 mt-2">Milestones to build, expand, and decentralize.</p>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[720px] grid grid-cols-4 gap-6">
              <motion.div initial={{ y: 16, opacity: 0 }} whileInView={{ y:0, opacity:1 }} viewport={{ once: true }} transition={{ duration: .5 }}
                className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6">
                <div className="flex items-center gap-3 text-blue-300"><Rocket size={18}/> Q1 Launch</div>
                <p className="mt-2 text-slate-300 text-sm">Token generation, presale, and initial liquidity.</p>
              </motion.div>
              <motion.div initial={{ y: 16, opacity: 0 }} whileInView={{ y:0, opacity:1 }} viewport={{ once: true }} transition={{ duration: .5, delay: .05 }}
                className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6">
                <div className="flex items-center gap-3 text-blue-300"><Code2 size={18}/> Q2 Exchange Listing</div>
                <p className="mt-2 text-slate-300 text-sm">Centralized and decentralized exchange listings.</p>
              </motion.div>
              <motion.div initial={{ y: 16, opacity: 0 }} whileInView={{ y:0, opacity:1 }} viewport={{ once: true }} transition={{ duration: .5, delay: .1 }}
                className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6">
                <div className="flex items-center gap-3 text-blue-300"><Users size={18}/> Q3 Governance</div>
                <p className="mt-2 text-slate-300 text-sm">Introduce staking and on-chain voting mechanisms.</p>
              </motion.div>
              <motion.div initial={{ y: 16, opacity: 0 }} whileInView={{ y:0, opacity:1 }} viewport={{ once: true }} transition={{ duration: .5, delay: .15 }}
                className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6">
                <div className="flex items-center gap-3 text-blue-300"><Globe size={18}/> Q4 DAO Setup</div>
                <p className="mt-2 text-slate-300 text-sm">Full DAO structure and treasury transparency.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111827] border-t border-slate-800/60">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-sm">
          <div>© 2025 Nusarithm Token Project</div>
          <div className="flex items-center gap-6">
            <a className="hover:text-slate-200 transition" href="#terms">Terms</a>
            <a className="hover:text-slate-200 transition" href="#etherscan">Etherscan</a>
            <a className="hover:text-slate-200 transition" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
