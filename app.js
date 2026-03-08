// Initialize Lucide Icons
lucide.createIcons();

// State Management (Mock)
const state = {
    currentPage: 'dashboard',
    theme: 'dark'
};

// Page Titles Mapping
const pageTitles = {
    'dashboard': 'Dashboard Overview',
    'trades': 'Trade History',
    'analytics': 'Advanced Analytics',
    'journal': 'Trading Journal',
    'calendar': 'Economic Calendar',
    'active': 'Live Positions',
    'settings': 'Account Settings'
};

// Handle Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const page = link.getAttribute('data-page');
        if (!page) return;

        // Update UI
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        document.getElementById('page-title').innerText = pageTitles[page];
        state.currentPage = page;

        loadPage(page);
    });
});

// Mock Logic for Equity Chart
function initEquityChart() {
    const ctx = document.getElementById('equityChart').getContext('2d');
    if (!ctx) return;
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(108, 93, 211, 0.5)');
    gradient.addColorStop(1, 'rgba(108, 93, 211, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            datasets: [{
                label: 'Account Balance',
                data: [10000, 10500, 10200, 11000, 11800, 11500, 12500, 13740],
                borderColor: '#6C5DD3',
                backgroundColor: gradient,
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#676767' } },
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#676767' } }
            }
        }
    });
}

// Initial Load
window.addEventListener('DOMContentLoaded', () => {
    initEquityChart();
});

// Function to handle dynamic content loading (Simulated)
function loadPage(page) {
    const container = document.getElementById('page-content');

    if (page === 'dashboard') {
        location.reload();
    } else if (page === 'trades') {
        const isMobile = window.innerWidth <= 768;

        let tradesHTML = '';
        if (isMobile) {
            tradesHTML = `
                <div class="trade-row-mobile">
                    <div class="symbol">NAS100 <small style="color: var(--primary)">BUY</small></div>
                    <div class="detail"><span class="label">P/L</span><span class="profit-text">+$450.00</span></div>
                    <div class="detail"><span class="label">RR</span><span>1:2.4</span></div>
                    <div class="detail"><span class="label">Entry</span><span>18240.5</span></div>
                    <div class="detail"><span class="label">Status</span><span style="background: var(--profit-bg); color: var(--profit); width: fit-content; padding: 2px 6px; border-radius: 4px;">WIN</span></div>
                </div>
                <div class="trade-row-mobile">
                    <div class="symbol">XAUUSD <small style="color: var(--loss)">SELL</small></div>
                    <div class="detail"><span class="label">P/L</span><span class="loss-text">-$120.00</span></div>
                    <div class="detail"><span class="label">RR</span><span>1:1.5</span></div>
                    <div class="detail"><span class="label">Entry</span><span>2165.2</span></div>
                    <div class="detail"><span class="label">Status</span><span style="background: var(--loss-bg); color: var(--loss); width: fit-content; padding: 2px 6px; border-radius: 4px;">LOSS</span></div>
                </div>
            `;
        } else {
            tradesHTML = `
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 1px solid var(--border); color: var(--text-muted); font-size: 0.85rem;">
                            <th style="padding: 15px 10px;">SYMBOL</th>
                            <th style="padding: 15px 10px;">SIDE</th>
                            <th style="padding: 15px 10px;">ENTRY</th>
                            <th style="padding: 15px 10px;">P/L ($)</th>
                            <th style="padding: 15px 10px;">RR</th>
                            <th style="padding: 15px 10px;">STATUS</th>
                            <th style="padding: 15px 10px;">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 20px 10px;">NAS100</td>
                            <td style="padding: 20px 10px;"><span style="color: var(--primary)">BUY</span></td>
                            <td style="padding: 20px 10px;">18240.5</td>
                            <td style="padding: 20px 10px;" class="profit-text">+$450.00</td>
                            <td style="padding: 20px 10px;">1:2.4</td>
                            <td style="padding: 20px 10px;"><span style="background: var(--profit-bg); color: var(--profit); padding: 4px 8px; border-radius: 6px; font-size: 0.75rem;">WIN</span></td>
                            <td style="padding: 20px 10px;"><i data-lucide="more-horizontal" style="cursor: pointer;"></i></td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border);">
                            <td style="padding: 20px 10px;">XAUUSD</td>
                            <td style="padding: 20px 10px;"><span style="color: var(--loss)">SELL</span></td>
                            <td style="padding: 20px 10px;">2165.2</td>
                            <td style="padding: 20px 10px;" class="loss-text">-$120.00</td>
                            <td style="padding: 20px 10px;">1:1.5</td>
                            <td style="padding: 20px 10px;"><span style="background: var(--loss-bg); color: var(--loss); padding: 4px 8px; border-radius: 6px; font-size: 0.75rem;">LOSS</span></td>
                            <td style="padding: 20px 10px;"><i data-lucide="more-horizontal" style="cursor: pointer;"></i></td>
                        </tr>
                    </tbody>
                </table>
            `;
        }

        container.innerHTML = `
            <div class="card" style="margin-bottom: 24px;">
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <select class="btn" style="background: var(--bg-sidebar); color: white; border: 1px solid var(--border);">
                        <option>All Symbols</option>
                        <option>NAS100</option>
                        <option>XAUUSD</option>
                    </select>
                    <button class="btn btn-primary" style="margin-left: auto;">+ New Trade</button>
                </div>
            </div>
            
            <div class="card">
                ${tradesHTML}
            </div>
        `;
        lucide.createIcons();
    } else if (page === 'analytics') {
        container.innerHTML = `
            <div class="dashboard-grid">
                <div class="card">
                    <h3>Performance by Day</h3>
                    <canvas id="dayChart" height="200"></canvas>
                </div>
                <div class="card">
                    <h3>Performance by Strategy</h3>
                    <canvas id="strategyChart" height="200"></canvas>
                </div>
            </div>
            <div class="card" style="margin-top: 24px;">
                <h3>Metrics Breakdown</h3>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 20px;">
                    <div><div class="stat-label">Avg Win</div><div class="stat-value profit-text">+$240</div></div>
                    <div><div class="stat-label">Avg Loss</div><div class="stat-value loss-text">-$110</div></div>
                    <div><div class="stat-label">Profit Factor</div><div class="stat-value">2.45</div></div>
                    <div><div class="stat-label">Expectancy</div><div class="stat-value">+$45</div></div>
                </div>
            </div>
        `;
        initAnalyticsCharts();
    } else if (page === 'calendar') {
        container.innerHTML = `
            <div class="card" style="margin-bottom: 24px;">
                <h3 style="margin-bottom: 15px;">Economic Calendar - High Impact Events</h3>
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: hsla(0, 75%, 60%, 0.1); border-left: 4px solid var(--loss); border-radius: 8px;">
                        <div>
                            <div style="font-weight: 700;">USD - CPI m/m</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Today 08:30 AM</div>
                        </div>
                        <div style="text-align: right;">
                            <span style="background: var(--loss); color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem;">HIGH IMPACT</span>
                            <div style="font-size: 0.85rem; margin-top: 5px;">Forecast: 0.3% | Prev: 0.2%</div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: var(--bg-sidebar); border-radius: 8px;">
                        <div>
                            <div style="font-weight: 700;">GBP - GDP m/m</div>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Tomorrow 02:00 AM</div>
                        </div>
                        <div style="text-align: right;">
                            <span style="background: orange; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem;">MEDIUM IMPACT</span>
                            <div style="font-size: 0.85rem; margin-top: 5px;">Forecast: 0.1% | Prev: 0.0%</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons();
    } else if (page === 'journal') {
        container.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 300px; gap: 24px;">
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3>March 8, 2026</h3>
                        <div style="display: flex; gap: 10px;">
                            <i data-lucide="smile" style="color: var(--profit)"></i>
                            <i data-lucide="award" style="color: var(--primary)"></i>
                        </div>
                    </div>
                    <textarea style="width: 100%; height: 200px; background: hsla(0,0%,0%,0.2); border: 1px solid var(--border); border-radius: 12px; color: white; padding: 15px; font-size: 1rem; margin-bottom: 20px;" placeholder="What did you learn today?"></textarea>
                    <div style="display: flex; gap: 20px;">
                        <button class="btn btn-primary"><i data-lucide="save"></i> Save Journal</button>
                        <button class="btn" style="background: var(--bg-sidebar); color: white; border: 1px solid var(--border);"><i data-lucide="image"></i> Attach Screenshot</button>
                    </div>
                </div>
                <div class="card">
                    <h3>Day Stats</h3>
                    <div style="margin-top: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                            <span class="stat-label">Trades</span>
                            <span>4</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                            <span class="stat-label">Net P/L</span>
                            <span class="profit-text">+$1,240</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                            <span class="stat-label">Discipline</span>
                            <span>5/5</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons();
    } else {
        container.innerHTML = `
            <div class="card" style="text-align: center; padding: 100px;">
                <i data-lucide="construction" style="width: 48px; height: 48px; color: var(--primary); margin-bottom: 20px;"></i>
                <h2>${pageTitles[page]} Screen</h2>
                <p style="color: var(--text-muted); margin-top: 10px;">Prototyping this module... Detailed design coming in next step.</p>
            </div>
        `;
        lucide.createIcons();
    }
}

function initAnalyticsCharts() {
    const dayCanvas = document.getElementById('dayChart');
    if (!dayCanvas) return;
    const dayCtx = dayCanvas.getContext('2d');
    new Chart(dayCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [{
                label: 'Profit/Loss',
                data: [400, -200, 800, 1500, -300],
                backgroundColor: (ctx) => ctx.raw >= 0 ? 'hsla(170, 75%, 45%, 0.6)' : 'hsla(0, 75%, 60%, 0.6)',
                borderRadius: 8
            }]
        },
        options: { plugins: { legend: { display: false } } }
    });

    const strategyCanvas = document.getElementById('strategyChart');
    if (!strategyCanvas) return;
    const strategyCtx = strategyCanvas.getContext('2d');
    new Chart(strategyCtx, {
        type: 'doughnut',
        data: {
            labels: ['Trend Following', 'Mean Reversion', 'Breakouts'],
            datasets: [{
                data: [65, 20, 15],
                backgroundColor: ['hsl(260, 60%, 55%)', 'hsl(260, 40%, 40%)', 'hsl(260, 20%, 30%)'],
                borderWidth: 0
            }]
        }
    });
}
