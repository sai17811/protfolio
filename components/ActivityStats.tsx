"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BarChart2, Github, ChevronDown, CheckCircle2, Info, Layout, Layers } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";

/* ─── Types ─── */
type Tab = "github" | "leetcode";

interface DayCell {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
}

/* ─── Constants ─── */
const YEARS = [2022, 2023, 2024, 2025];

const GITHUB_USERNAME = "sai1781";
const LEETCODE_USERNAME = "nagasaitac143";

const LC_COLORS = [
    "rgba(255,255,255,0.03)",
    "#0e4429",
    "#006d32",
    "#26a641",
    "#39d353",
];

const GH_THEME = {
    light: ["rgba(255,255,255,0.03)", "#0e4429", "#006d32", "#26a641", "#39d353"],
    dark: ["rgba(255,255,255,0.03)", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

/* ─── Utility: UTC Unix Timestamp ─── */
function getUTCDateTimestamp(year: number, month: number, day: number): string {
    return Math.floor(Date.UTC(year, month, day) / 1000).toString();
}

/* ─── Sub-Component: Creative Year Dropdown ─── */
function YearDropdown({
    selectedYear,
    onSelect,
}: {
    selectedYear: number;
    onSelect: (y: number) => void;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="relative w-full" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-primary/50 transition-all duration-500 group shadow-lg backdrop-blur-md"
            >
                <span className="text-xs font-black tracking-widest text-foreground/80 uppercase">
                    {selectedYear}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-primary transition-transform duration-500 ${open ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full mt-3 left-0 right-0 z-[60] bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-3xl overflow-hidden p-1.5"
                    >
                        {YEARS.map((y) => (
                            <button
                                key={y}
                                onClick={() => {
                                    onSelect(y);
                                    setOpen(false);
                                }}
                                className={`flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300
                                    ${y === selectedYear
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                    }`}
                            >
                                {y}
                                {y === selectedYear && <CheckCircle2 className="w-3 h-3" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── Sub-Component: LeetCode Heatmap ─── */
function LeetCodeYear({ year }: { year: number }) {
    const [cells, setCells] = useState<DayCell[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalActive, setTotalActive] = useState(0);
    const [totalSubmissions, setTotalSubmissions] = useState(0);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);

        fetch(`/api/leetcode?username=${LEETCODE_USERNAME}&year=${year}`)
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then((data) => {
                if (cancelled) return;
                const cal: Record<string, number> = data.submissionCalendar ?? {};
                const start = new Date(year, 0, 1);
                const end = new Date(year, 11, 31);
                const days: DayCell[] = [];
                let total = 0;

                for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                    const ts = getUTCDateTimestamp(d.getFullYear(), d.getMonth(), d.getDate());
                    const count = cal[ts] ?? 0;
                    total += count;
                    days.push({
                        date: d.toISOString().slice(0, 10),
                        count,
                        level: countToLevel(count),
                    });
                }

                setCells(days);
                setTotalActive(data.totalActiveDays ?? 0);
                setTotalSubmissions(total);
                setLoading(false);
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => { cancelled = true; };
    }, [year]);

    const weeks = useMemo(() => {
        if (cells.length === 0) return [];
        const result: DayCell[][] = [];
        let currentWeek: DayCell[] = [];
        const firstDay = new Date(cells[0].date).getDay();
        for (let i = 0; i < firstDay; i++) currentWeek.push({ date: "", count: 0, level: 0 });
        for (const cell of cells) {
            currentWeek.push(cell);
            if (currentWeek.length === 7) { result.push(currentWeek); currentWeek = []; }
        }
        if (currentWeek.length > 0) result.push(currentWeek);
        return result;
    }, [cells]);

    const months = useMemo(() => {
        const labels: { label: string; col: number }[] = [];
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let lastMonth = -1;
        for (let w = 0; w < weeks.length; w++) {
            for (const cell of weeks[w]) {
                if (!cell.date) continue;
                const m = new Date(cell.date).getMonth();
                if (m !== lastMonth) {
                    labels.push({ label: monthNames[m], col: w });
                    lastMonth = m;
                }
            }
        }
        return labels;
    }, [weeks]);

    if (loading) {
        return (
            <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-10 min-h-[400px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 animate-pulse">
                    <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                    <span className="text-xs font-black tracking-widest text-muted-foreground uppercase italic">Syncing Data...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-[2.5rem] bg-white/[0.02] border border-white/5 p-12 text-center">
                <div className="flex flex-col items-center gap-4 opacity-50">
                    <Info className="w-10 h-10 text-primary" />
                    <p className="text-sm font-bold italic text-muted-foreground whitespace-pre-wrap max-w-xs">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative group">
            {/* Visual Backdrops */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 rounded-[2.5rem] blur-2xl" />

            <div className="relative rounded-[1.5rem] sm:rounded-[2rem] bg-[#0a0a0a]/40 backdrop-blur-2xl border border-white/10 p-2.5 sm:p-6 shadow-2xl transition-all duration-700 hover:border-[#39d353]/30" style={{ borderColor: 'rgba(57,211,83,0.1)' }}>
                {/* GitHub-Style Summary Header */}
                <div className="mb-6">
                    <h3 className="text-base sm:text-lg font-medium text-foreground/90">
                        {totalSubmissions} submissions in {year}
                    </h3>
                </div>

                {/* Stats Grid - Secondary info */}
                <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:items-center sm:gap-4 mb-8">
                    <div className="flex flex-col gap-1 px-4 py-3 rounded-2xl bg-primary/5 border border-primary/10 shadow-inner">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#39d353]/40">Active Days</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-[#39d353]">{totalActive}</span>
                            <span className="text-[9px] text-[#39d353]/40 font-bold uppercase italic">Days</span>
                        </div>
                    </div>
                </div>

                {/* Heatmap Container */}
                <div className="relative overflow-hidden">
                    <div className="relative overflow-x-auto pb-4 scrollbar-none mask-fade-horizontal">
                        <div className="flex flex-col min-w-[700px] origin-left sm:scale-100 scale-[0.82] transition-transform duration-500">
                            {/* Months */}
                            <div className="flex mb-3 ml-[28px]" style={{ gap: 0 }}>
                                {weeks.map((_, i) => {
                                    const label = months.find((m) => m.col === i);
                                    return (
                                        <div
                                            key={i}
                                            className="text-[9px] text-muted-foreground/30 font-black uppercase"
                                            style={{ width: 11, marginRight: 2 }}
                                        >
                                            {label?.label ?? ""}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="flex">
                                {/* Days of Week */}
                                <div className="flex flex-col mr-2 justify-between py-0.5" style={{ height: 89 }}>
                                    {[
                                        { l: "", show: false },
                                        { l: "Mon", show: true },
                                        { l: "", show: false },
                                        { l: "Wed", show: true },
                                        { l: "", show: false },
                                        { l: "Fri", show: true },
                                        { l: "", show: false }
                                    ].map((d, i) => (
                                        <span key={i} className={`text-[9px] font-medium text-muted-foreground/40 w-5 text-left ${!d.show ? 'opacity-0' : ''}`}>
                                            {d.l}
                                        </span>
                                    ))}
                                </div>

                                {/* The Grid */}
                                <div className="flex" style={{ gap: 2 }}>
                                    {weeks.map((week, wi) => (
                                        <div key={wi} className="flex flex-col" style={{ gap: 2 }}>
                                            {week.map((cell, di) => (
                                                <motion.div
                                                    key={di}
                                                    whileHover={{
                                                        scale: 1.4,
                                                        zIndex: 20,
                                                        boxShadow: "0 0 20px rgba(57,211,83,0.3)"
                                                    }}
                                                    title={cell.date ? `${cell.date}: ${cell.count} submissions` : ""}
                                                    className="w-[11px] h-[11px] rounded-[2px] transition-colors duration-500 border border-white/[0.03]"
                                                    style={{ backgroundColor: LC_COLORS[cell.level] }}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Swipe Guide */}
                    <div className="flex sm:hidden items-center justify-center gap-2 py-4 text-[9px] font-black text-primary/30 uppercase tracking-[0.2em] italic">
                        <Layout className="w-3 h-3" />
                        <span>Swipe to explore velocity</span>
                    </div>
                </div>

                {/* GitHub-Style Unified Legend */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-[10px] font-medium text-muted-foreground/50 hover:text-[#39d353] transition-colors cursor-help">
                        Learn how we count contributions
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground/40 font-medium">Less</span>
                        <div className="flex gap-1">
                            {LC_COLORS.map((c, i) => (
                                <div key={i} className="w-[11px] h-[11px] rounded-[2px] border border-white/[0.03]" style={{ backgroundColor: c }} />
                            ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground/40 font-medium">More</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function countToLevel(count: number): 0 | 1 | 2 | 3 | 4 {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 9) return 3;
    return 4;
}

/* ─── Main Section Component ─── */
export function ActivityStats() {
    const [activeTab, setActiveTab] = useState<Tab>("github");
    const [selectedYear, setSelectedYear] = useState(2022);
    const { theme } = useTheme();
    const isDark = theme === "dark" || theme === "system";

    return (
        <section id="activity" className="hidden sm:block py-16 relative bg-transparent overflow-hidden border-t border-border/40">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            
            {/* Background Atmosphere - Simplified for transparency */}
            <div className="absolute top-0 inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/2 blur-[120px] rounded-full opacity-40" />
            </div>

            <div className="container relative px-5 sm:px-10">
                <div className="max-w-6xl mx-auto">
                    {/* Compact Header & Controls Row - Emerald Version 2.0 */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 w-full relative z-[70]">
                        <div className="text-left">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-xl mb-3 group"
                            >
                                <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: '#39d353' }} />
                                <span className="text-[9px] font-black tracking-[0.3em] uppercase" style={{ color: '#39d353' }}>Persistence</span>
                            </motion.div>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                                Daily <span className="italic" style={{ color: '#39d353' }}>Activity</span>
                            </h2>
                        </div>

                        {/* Creative Control Dock - Integrated */}
                        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center p-1.5 sm:p-2 rounded-[1.2rem] sm:rounded-[1.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-3xl">
                            {/* Tab Switcher - Force Grid on Mobile */}
                            <div className="grid grid-cols-2 w-full sm:w-auto p-0.5 sm:p-1 rounded-[1.1rem] bg-black/40 border border-white/5 relative overflow-hidden flex-1 sm:flex-none">
                                <motion.div
                                    className="absolute inset-y-1 left-1 rounded-[0.9rem] bg-[#39d353] shadow-lg shadow-emerald-500/40 z-0"
                                    initial={false}
                                    animate={{
                                        x: activeTab === "github" ? 0 : "100%",
                                        width: activeTab === "github" ? "calc(50% - 2px)" : "calc(50% - 2px)"
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                                <TabButton
                                    active={activeTab === "github"}
                                    onClick={() => setActiveTab("github")}
                                    icon={<Github className={`w-4 h-4 transition-colors ${activeTab === "github" ? "text-primary-foreground" : "text-primary/70"}`} />}
                                    label="GitHub"
                                />
                                <TabButton
                                    active={activeTab === "leetcode"}
                                    onClick={() => setActiveTab("leetcode")}
                                    icon={<LeetCodeIcon />}
                                    label="LeetCode"
                                />
                            </div>

                            {/* Year Selector */}
                            <div className="w-full sm:w-32 flex-shrink-0">
                                <YearDropdown selectedYear={selectedYear} onSelect={setSelectedYear} />
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Content Surface */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${activeTab}-${selectedYear}`}
                            initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -40, filter: "blur(20px)" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="relative"
                        >
                            {activeTab === "github" && (
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full opacity-30 pointer-events-none" />
                                    <div className="rounded-[1.5rem] sm:rounded-[2rem] bg-[#0a0a0a]/40 backdrop-blur-2xl border border-white/10 p-2.5 sm:p-6 shadow-3xl transition-all duration-700 hover:border-[#39d353]/20" style={{ borderColor: 'rgba(57,211,83,0.1)' }}>
                                        {/* GitHub-Style Summary Header */}
                                        <div className="mb-6">
                                            <h3 className="text-sm font-medium text-foreground/90">
                                                Code contributions in {selectedYear}
                                            </h3>
                                        </div>
                                        <div className="relative overflow-x-auto pb-4 scrollbar-none mask-fade-horizontal">
                                            <div className="min-w-[700px] py-4 origin-left sm:scale-100 scale-[0.82] transition-transform duration-500">
                                                <GitHubCalendar
                                                    username={GITHUB_USERNAME}
                                                    year={selectedYear}
                                                    colorScheme={isDark ? "dark" : "light"}
                                                    theme={{
                                                        light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                                                        dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
                                                    }}
                                                    blockSize={11}
                                                    blockMargin={2}
                                                    fontSize={12}
                                                    showTotalCount={false}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex sm:hidden items-center justify-center gap-2 py-4 text-[9px] font-black text-primary/30 uppercase tracking-[0.2em] italic">
                                            <Layout className="w-3 h-3" />
                                            <span>Slide for code contributions</span>
                                        </div>

                                        {/* GitHub-Style Unified Legend */}
                                        <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                                            <div className="text-[10px] font-medium text-muted-foreground/50 hover:text-[#39d353] transition-colors cursor-help">
                                                Learn how we count contributions
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-muted-foreground/40 font-medium">Less</span>
                                                <div className="flex gap-1">
                                                    {GH_THEME.dark.map((c, i) => (
                                                        <div key={i} className="w-[11px] h-[11px] rounded-[2px] border border-white/[0.03]" style={{ backgroundColor: c }} />
                                                    ))}
                                                </div>
                                                <span className="text-[10px] text-muted-foreground/40 font-medium">More</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "leetcode" && (
                                <LeetCodeYear year={selectedYear} />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Global Design Details */}
            <style jsx global>{`
                .mask-fade-horizontal {
                    mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%);
                }
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-none {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}

/* ─── Smaller Utility Components ─── */
function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
    return (
        <button
            onClick={onClick}
            className={`
                relative flex-1 flex items-center justify-center gap-1.5 sm:gap-3 px-2 sm:px-4 py-2.5 sm:py-3.5 z-10
                text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all duration-500 w-full
                ${active ? "text-black" : "text-[#39d353]/50 hover:text-[#39d353]"}
            `}
            style={active ? { color: '#000000' } : { color: '#39d353' }}
        >
            <span className="flex-shrink-0">{icon}</span>
            <span className="hidden sm:inline-block">{label}</span>
            <span className="sm:hidden truncate">{active ? label : ""}</span>
        </button>
    );
}

function LeetCodeIcon() {
    return (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
        </svg>
    );
}
