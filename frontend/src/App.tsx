import { useState, type FormEvent, type ReactNode } from 'react'

type IconName = 'flame' | 'search' | 'plus' | 'chevron' | 'arrow' | 'github' | 'code' | 'shield' | 'spark' | 'branch' | 'clock' | 'close' | 'check' | 'grid' | 'book' | 'external' | 'filter' | 'logout'
function Icon({ name, size = 20, ...props }: { name: IconName; size?: number; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    flame: <path d="M13 2c1 6-5 6-3 11 2-1 3-3 3-5 4 3 6 6 5 9a7 7 0 0 1-13-1c-1-5 4-8 4-12 2 1 3 3 3 5 2-2 2-5 1-7Z" />,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    chevron: <path d="m8 10 4 4 4-4" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    github: <><path d="M9 20c-5 1-5-2-7-2m14 4v-4c0-1-.3-2-1-2.5 4-.5 6-2.5 6-6 0-1.5-.5-3-1.5-4 .3-1 .3-2-.2-3-1.5 0-3 .8-4 1.5a14 14 0 0 0-7 0C7.3 3.3 5.8 2.5 4.3 2.5c-.5 1-.5 2-.2 3C3 6.5 2.5 8 2.5 9.5c0 3.5 2 5.5 6 6-.7.5-1 1.5-1 2.5v4" /></>,
    code: <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18" /></>,
    shield: <><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></>,
    spark: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" /><path d="m20 2 1 3 3 1" /></>,
    branch: <><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M6 7v10m12-10c0 7-12 3-12 10" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    book: <><path d="M4 4h6l2 2 2-2h6v15h-6l-2 2-2-2H4V4Zm8 2v15" /></>,
    external: <><path d="M14 3h7v7m0-7L10 14M10 4H4v16h16v-6" /></>,
    filter: <><path d="M4 7h16M7 12h10m-7 5h4" /></>,
    logout: <><path d="M9 4H4v16h5m6-13 5 5-5 5m-7-5h12" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" {...props}>{paths[name]}</svg>
}

type Repository = { name: string; description: string; language: string; color: string; score: number; issues: number; date: string; status: string }
const initialRepositories: Repository[] = [
  { name: 'snake_game', description: 'A classic snake game, with a few twists', language: 'Python', color: '#d2ad55', score: 72, issues: 8, date: '2 hours ago', status: 'Roasted' },
  { name: 'portfolio-v2', description: 'My little corner of the internet', language: 'TypeScript', color: '#6594b6', score: 91, issues: 3, date: 'Yesterday', status: 'Roasted' },
  { name: 'expense-tracker', description: 'Keeping tabs on where it all goes', language: 'JavaScript', color: '#dfc85c', score: 64, issues: 12, date: 'Jun 12, 2025', status: 'Roasted' },
  { name: 'weather-app', description: 'A forecast worth looking at', language: 'JavaScript', color: '#dfc85c', score: 86, issues: 4, date: 'Jun 10, 2025', status: 'Roasted' },
]

function ActivityChart() {
  const values = [18, 30, 23, 43, 32, 45, 37, 56, 44, 39, 55, 48, 68, 53, 64, 49, 73, 61, 80, 66, 57, 76, 64, 89, 72, 93, 80, 69]
  return <div className="activity-chart"><div className="chart-grid"><span>100</span><span>50</span><span>0</span></div><div className="bars">{values.map((v, i) => <div className={`bar ${i > 23 ? 'bright' : ''}`} style={{ height: `${v}%` }} key={i}><span>{v} points</span></div>)}</div><div className="chart-labels"><span>May 19</span><span>May 26</span><span>Jun 02</span><span>Jun 09</span><span>Jun 16</span></div></div>
}

export default function App() {
  const [nav, setNav] = useState('Overview')
  const [query, setQuery] = useState('')
  const [repositories, setRepositories] = useState(initialRepositories)
  const [profileOpen, setProfileOpen] = useState(false)
  const [newOpen, setNewOpen] = useState(false)
  const [selected, setSelected] = useState<Repository | null>(null)
  const [reportTab, setReportTab] = useState('The roast')
  const [repoUrl, setRepoUrl] = useState('')
  const [consent, setConsent] = useState(false)
  const [filter, setFilter] = useState('All languages')
  const [sort, setSort] = useState('Recent first')
  const [notice, setNotice] = useState('')
  const filtered = repositories.filter(r => `${r.name} ${r.description}`.toLowerCase().includes(query.toLowerCase()) && (filter === 'All languages' || r.language === filter)).sort((a, b) => sort === 'Highest score' ? b.score - a.score : sort === 'Most issues' ? b.issues - a.issues : 0)
  function notify(text: string) { setNotice(text); window.setTimeout(() => setNotice(''), 4000) }
  function addRepository(event: FormEvent) {
    event.preventDefault()
    const match = repoUrl.match(/^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/?$/)
    if (!match) return
    const repo: Repository = { name: match[2].replace(/\.git$/, ''), description: 'Your next opportunity to write better code', language: 'TypeScript', color: '#6594b6', score: 78, issues: 6, date: 'Just now', status: 'Roasted' }
    setRepositories([repo, ...repositories]); setNewOpen(false); setRepoUrl(''); setConsent(false); setSelected(repo); notify('Demo analysis complete. Your new repository is ready.')
  }
  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Roast home" onClick={() => setNav('Overview')}><span className="brand-icon"><Icon name="flame" size={26} /></span>roast<span className="brand-period">.</span></a>
        <span className="nav-divider" />
        <nav>{['Overview', 'Repositories', 'Roast guide'].map(item => <button key={item} className={nav === item ? 'nav-link active' : 'nav-link'} onClick={() => setNav(item)}>{item}</button>)}</nav>
        <div className="nav-actions"><label className="global-search"><Icon name="search" size={17} /><input placeholder="Search anything..." value={query} onChange={e => { setQuery(e.target.value); if (nav === 'Roast guide') setNav('Repositories') }} /><kbd>⌘ K</kbd></label>
          <button className="button primary nav-new" onClick={() => setNewOpen(true)}><Icon name="plus" size={17} /> New roast</button>
          <div className="profile-wrap"><button className="profile-button" aria-label="Open profile menu" aria-expanded={profileOpen} onClick={() => setProfileOpen(!profileOpen)}><span className="avatar">LP</span><Icon name="chevron" size={15} /></button>{profileOpen && <div className="profile-menu"><strong>Lakshmi Praneetha</strong><span>Personal workspace</span><div className="menu-separator" /><button onClick={() => { setProfileOpen(false); notify('You’re on the free plan. 6 of 10 demo roasts remaining.') }}><Icon name="spark" size={16} /> My plan <span className="mini-tag">Free</span></button><button onClick={() => { setProfileOpen(false); setNav('Roast guide') }}><Icon name="book" size={16} /> Help & resources</button></div>}</div>
        </div>
      </header>

      <main>
        <div className="page-heading"><div><div className="eyebrow"><span className="tiny-dot" /> YOUR CODE. A LITTLE BETTER.</div><h1>{nav === 'Overview' ? 'A little heat. A lot of growth.' : nav === 'Repositories' ? 'Good code starts with a roast.' : 'A guide to taking the heat.'}</h1><p>{nav === 'Overview' ? 'Welcome back, Praneetha. Let’s turn those code smells into clean commits.' : nav === 'Repositories' ? 'All your repositories, reviews, and next great improvements in one place.' : 'Everything you need to turn honest feedback into better code.'}</p></div><span className="today"><Icon name="clock" size={15} /> Monday, June 16, 2025</span></div>

        {nav === 'Overview' && <>
          <section className="hero">
            <div className="hero-copy"><span className="hero-badge"><span /> A LITTLE BETTER, EVERY COMMIT</span><h2>Your code has potential.<br />Let’s bring the <span>heat.</span></h2><p>Honest AI code reviews. A side of friendly roasting.<br className="desktop-break" /> Everything you need to build something better.</p><button className="button peach" onClick={() => setNewOpen(true)}><Icon name="flame" size={18} /> Roast a repository <Icon name="arrow" size={18} /></button><div className="hero-note"><Icon name="shield" size={13} /> Your code stays yours. Always.</div></div>
            <div className="hero-insights"><div className="insights-top"><div><span className="hero-label">YOUR DEVELOPER GLOW-UP</span><div className="growth-number">+24<span>pts</span><span className="growth-pill">↗ 32%</span></div><p>Better code. Not just a better score.</p></div><div className="hero-spark"><Icon name="spark" size={26} /></div></div><ActivityChart /><div className="chart-footer"><span><i /> Code quality score</span><span>Last 30 days <Icon name="chevron" size={12} /></span></div></div>
          </section>

          <section className="stats-grid">
            <StatCard icon="github" label="Repositories roasted" value={String(24 + repositories.length - 4)} change="+4 this month" variant="sage"><MiniBars /></StatCard>
            <StatCard icon="shield" label="Average code score" value="78" suffix="/ 100" change="+12 pts from last month" variant="green"><svg viewBox="0 0 110 38" className="sparkline"><path d="m2 34 12-6 10 3 12-14 10 5 13-12 10 4 13-10 11 2 15-6" /></svg></StatCard>
            <StatCard icon="code" label="Issues uncovered" value="147" change="112 resolved. Nice work." variant="orange"><div className="small-progress"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i className="unfilled" /><i className="unfilled" /><i className="unfilled" /></div></StatCard>
            <StatCard icon="flame" label="Roasting streak" value="7" suffix="days" change="You're on fire. Keep it going." variant="pink"><div className="streak-days">{['T','W','T','F','S','S','M'].map((d,i) => <span key={i}><i className={i === 6 ? 'current' : ''}>{i === 6 ? <Icon name="flame" size={12} /> : <Icon name="check" size={10} />}</i>{d}</span>)}</div></StatCard>
          </section>
        </>}

        {nav === 'Roast guide' ? <section className="guide panel"><div className="section-kicker">FROM REPO TO REVELATION</div><h2>A thicker skin. A cleaner codebase.</h2><p>Think of Roast as the code reviewer who tells it like it is—with your growth in mind.</p><div className="guide-grid">{[{ icon: 'github' as IconName, title: '01. Bring your repository', text: 'Paste a public GitHub repository URL. Only share code you own or have permission to analyze.' }, { icon: 'flame' as IconName, title: '02. Get a little roasted', text: 'Explore a playful roast alongside actionable findings about quality, security, and maintainability.' }, { icon: 'branch' as IconName, title: '03. Make your next commit count', text: 'Use your professional review to prioritize improvements, then come back and see your progress.' }].map(step => <article key={step.title}><Icon name={step.icon} size={28} /><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><div className="guide-notice"><Icon name="shield" /> This is an interactive UI demo. Repository analyses and scores are illustrative; no source code is sent to an AI service.</div><button className="button primary" onClick={() => setNewOpen(true)}>Try a demo roast <Icon name="arrow" size={17} /></button></section> : <>
          <section className="repositories panel">
            <div className="section-heading"><div className="section-title"><h2>Your repositories</h2><span className="count">{repositories.length}</span><span className="section-subtitle">A little feedback goes a long way.</span></div><button className="text-button" onClick={() => nav === 'Overview' ? setNav('Repositories') : setNewOpen(true)}>{nav === 'Overview' ? 'View all repositories' : 'Add repository'}<Icon name={nav === 'Overview' ? 'arrow' : 'plus'} size={16} /></button></div>
            <div className="table-toolbar"><label className="table-search"><Icon name="search" size={17} /><input placeholder="Find a repository..." value={query} onChange={e => setQuery(e.target.value)} /></label><div className="table-filters"><div className="select-wrapper"><Icon name="filter" size={15} /><select aria-label="Filter by language" value={filter} onChange={e => setFilter(e.target.value)}>{['All languages', 'Python', 'TypeScript', 'JavaScript'].map(x => <option key={x}>{x}</option>)}</select></div><select aria-label="Sort repositories" value={sort} onChange={e => setSort(e.target.value)}>{['Recent first', 'Highest score', 'Most issues'].map(x => <option key={x}>{x}</option>)}</select></div></div>
            <div className="table-scroll"><table><thead><tr><th>Repository</th><th>Language</th><th>Code score <span className="info-mark" title="An illustrative code quality score out of 100">i</span></th><th>Issues</th><th>Last roasted</th><th>Status</th><th /></tr></thead><tbody>{filtered.map((repo, index) => <tr key={`${repo.name}-${index}`} onClick={() => { setSelected(repo); setReportTab('The roast') }}><td><div className="repo-cell"><span className={`repo-icon repo-${index % 4}`}><Icon name={index === 0 ? 'code' : index === 1 ? 'grid' : index === 2 ? 'branch' : 'code'} size={21} /></span><div><button className="repo-name" onClick={() => { setSelected(repo); setReportTab('The roast') }}>{repo.name}<Icon name="external" size={12} /></button><p>{repo.description}</p></div></div></td><td><span className="language-dot" style={{ background: repo.color }} />{repo.language}</td><td><div className="score-cell"><span className={repo.score >= 80 ? 'good-score' : 'medium-score'}>{repo.score}<small>/100</small></span><div className="score-track"><i style={{ width: `${repo.score}%`, background: repo.score >= 80 ? '#69876b' : '#c69759' }} /></div></div></td><td><span className="issue-number">{repo.issues}</span><span className="muted"> found</span></td><td className="date-cell">{repo.date}</td><td><span className="status"><span />{repo.status}</span></td><td><button className="row-arrow" aria-label={`View ${repo.name} review`}><Icon name="arrow" size={17} /></button></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="empty-state"><Icon name="search" size={30} /><h3>No repositories found</h3><p>Try a different search or language.</p><button className="text-button" onClick={() => { setQuery(''); setFilter('All languages') }}>Clear filters</button></div>}</div>
            <div className="table-bottom"><span>Showing {filtered.length} of {repositories.length} repositories</span><span><span className="tiny-dot" /> All systems ready to roast</span></div>
          </section>
          <section className="bottom-grid"><div className="tip-panel"><div className="tip-icon"><Icon name="spark" size={23} /></div><div><span className="section-kicker">A LITTLE WISDOM, ON THE HOUSE</span><h3>Good code isn’t written. It’s rewritten.</h3><p>Every issue you fix is a future headache you don’t have to have.</p></div><span className="tip-decoration">{'{ }'}</span></div><button className="guide-card" onClick={() => setNav('Roast guide')}><span className="guide-icon"><Icon name="book" size={22} /></span><div><h3>New to the hot seat?</h3><p>Get the most out of your roast.</p></div><Icon name="arrow" size={20} /></button></section>
        </>}
        <footer><a className="footer-brand" href="#" onClick={() => setNav('Overview')}><Icon name="flame" size={16} /> roast.</a><span>A little roast. A better developer.</span><span className="footer-right">Built for the love of better code. <span>UI preview · Demo data</span></span></footer>
      </main>

      {notice && <div className="toast" role="status"><Icon name="check" size={18} />{notice}<button aria-label="Dismiss notification" onClick={() => setNotice('')}><Icon name="close" size={15} /></button></div>}
      {newOpen && <div className="modal-backdrop" onClick={() => setNewOpen(false)}><section className="modal new-modal" role="dialog" aria-modal="true" aria-labelledby="new-title" onClick={e => e.stopPropagation()}><button className="modal-close" aria-label="Close" onClick={() => setNewOpen(false)}><Icon name="close" /></button><span className="modal-icon"><Icon name="flame" size={28} /></span><div className="eyebrow">LET’S FIND YOUR NEXT GLOW-UP</div><h2 id="new-title">Into the hot seat.</h2><p>Bring your repository. We’ll bring the constructive criticism.</p><form onSubmit={addRepository}><label className="field-label" htmlFor="repo-url">GitHub repository URL</label><div className="url-input"><Icon name="github" size={20} /><input id="repo-url" type="url" placeholder="https://github.com/you/something-great" value={repoUrl} onChange={e => setRepoUrl(e.target.value)} pattern="https://github.com/[\w.\-]+/[\w.\-]+/?" required autoFocus /></div><div className="privacy-note"><Icon name="shield" size={18} /><p>This is a UI preview. Your code won’t be accessed or shared. You’ll get an illustrative sample review.</p></div><label className="consent"><input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} />I own this repository or have permission to share it.</label><button className="button primary full-button" type="submit" disabled={!consent}><Icon name="flame" size={18} /> Roast my repository <Icon name="arrow" size={18} /></button></form><span className="modal-footnote">Honest feedback. Friendly fire. Zero judgment.</span></section></div>}
      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><section className="modal report-modal" role="dialog" aria-modal="true" aria-labelledby="report-title" onClick={e => e.stopPropagation()}><button className="modal-close" aria-label="Close review" onClick={() => setSelected(null)}><Icon name="close" /></button><div className="eyebrow">FRESH FROM THE OVEN · SAMPLE REVIEW</div><div className="report-header"><div><h2 id="report-title">{selected.name}</h2><p>{selected.description}</p></div><div className="report-score">{selected.score}<small>/ 100</small></div></div><div className="report-meta"><span><span className="language-dot" style={{ background: selected.color }} />{selected.language}</span><span><Icon name="branch" size={14} />main</span><span><Icon name="code" size={14} />{selected.issues} issues found</span></div><div className="report-tabs">{['The roast', 'Professional review'].map(t => <button className={reportTab === t ? 'selected' : ''} onClick={() => setReportTab(t)} key={t}><Icon name={t === 'The roast' ? 'flame' : 'code'} size={17} />{t}</button>)}</div>{reportTab === 'The roast' ? <div className="roast-content"><span className="roast-quote">“</span><h3>It runs. But so does a refrigerator.</h3><p>Your error handling is giving “if I don’t look at it, it doesn’t exist.” Those empty catch blocks aren’t a strategy—they’re a witness protection program for bugs.</p><p>And that one function doing six different jobs? Even your code deserves a work-life balance.</p><div className="positive-note"><Icon name="spark" size={20} /><div><strong>But here’s the good part.</strong><p>You’ve built something real. A few focused refactors, clearer naming, and some tests will take this from “it works on my machine” to something you’re proud to ship.</p></div></div></div> : <div className="professional-content">{[{ title: 'Break down complex functions', level: 'High priority', text: 'Separate data processing, validation, and UI logic into focused, testable functions.' }, { title: 'Handle errors explicitly', level: 'High priority', text: 'Replace empty catch blocks with helpful messages and intentional recovery paths.' }, { title: 'Add tests for critical paths', level: 'Improvement', text: 'Start with edge cases around inputs, state changes, and data persistence.' }].map(item => <article key={item.title}><div><h3>{item.title}</h3><span>{item.level}</span></div><p>{item.text}</p></article>)}</div>}<div className="report-bottom"><span><Icon name="shield" size={14} /> Illustrative review · No code was analyzed</span><button className="button primary" onClick={() => setSelected(null)}>Back to dashboard <Icon name="arrow" size={16} /></button></div></section></div>}
    </div>
  )
}

function StatCard({ icon, label, value, suffix, change, variant, children }: { icon: IconName; label: string; value: string; suffix?: string; change: string; variant: string; children: ReactNode }) {
  return <article className={`stat-card ${variant}`}><div className="stat-top"><span>{label}</span><span className="stat-icon"><Icon name={icon} size={17} /></span></div><div className="stat-middle"><div className="stat-value">{value}<small>{suffix}</small></div>{children}</div><p className="stat-change">{variant !== 'pink' && <Icon name={variant === 'orange' ? 'check' : 'arrow'} size={13} />}{change}</p></article>
}
function MiniBars() { return <div className="mini-bars">{[28, 45, 37, 60, 48, 72, 64, 88, 76, 100].map((h, i) => <i style={{ height: `${h}%` }} key={i} />)}</div> }
