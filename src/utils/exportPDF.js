export function exportarCronogramaPDF(prestamo) {
  const fmt = (v) =>
    new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(v ?? 0)

  const fmtFecha = (dateStr) =>
    new Date(dateStr + 'T00:00:00').toLocaleDateString('es-PE', {
      day: '2-digit', month: 'short', year: 'numeric',
    })

  const pagadas   = prestamo.cuotas.filter(c => c.estado === 'PAGADO').length
  const vencidas  = prestamo.cuotas.filter(c => c.estado === 'VENCIDO').length
  const pendientes = prestamo.cuotas.filter(c => c.estado === 'PENDIENTE').length
  const pct       = Math.round((pagadas / prestamo.numeroCuotas) * 100)

  const interesTotal   = prestamo.montoTotal - prestamo.capital
  const totalCobrado   = prestamo.cuotas.reduce((s, c) => s + (c.montoPagado ?? 0), 0)
  const saldoTotal     = prestamo.cuotas.reduce((s, c) => s + (c.saldoPendiente ?? 0), 0)

  const estadoColor = {
    ACTIVO:   { bg: '#dbeafe', text: '#1d4ed8', dot: '#3b82f6' },
    EN_MORA:  { bg: '#fee2e2', text: '#b91c1c', dot: '#ef4444' },
    PAGADO:   { bg: '#dcfce7', text: '#15803d', dot: '#22c55e' },
  }[prestamo.estado] ?? { bg: '#f1f5f9', text: '#475569', dot: '#94a3b8' }

  const rows = prestamo.cuotas.map((c, i) => {
    const isEven = i % 2 === 0
    let rowBg = isEven ? '#ffffff' : '#f8fafc'
    if (c.estado === 'VENCIDO')  rowBg = '#fff7ed'
    if (c.estado === 'PAGADO')   rowBg = isEven ? '#f9fafb' : '#f3f4f6'

    const textColor = c.estado === 'PAGADO' ? '#9ca3af' : '#1e293b'

    const badgeMap = {
      PENDIENTE: 'background:#dbeafe;color:#1d4ed8',
      PAGADO:    'background:#dcfce7;color:#15803d',
      VENCIDO:   'background:#fee2e2;color:#b91c1c',
    }
    const badge = badgeMap[c.estado] ?? 'background:#f1f5f9;color:#475569'

    return `
    <tr style="background:${rowBg}">
      <td style="color:#64748b;font-weight:600;text-align:center">${c.numeroCuota}</td>
      <td style="color:${textColor}">${fmtFecha(c.fechaVencimiento)}</td>
      <td style="color:${textColor};text-align:right;font-variant-numeric:tabular-nums">${fmt(c.montoCuota)}</td>
      <td style="color:${c.estado === 'PAGADO' ? '#15803d' : textColor};text-align:right;font-variant-numeric:tabular-nums;font-weight:${c.montoPagado > 0 ? 600 : 400}">${fmt(c.montoPagado)}</td>
      <td style="color:${c.saldoPendiente > 0 ? '#b45309' : textColor};text-align:right;font-variant-numeric:tabular-nums">${fmt(c.saldoPendiente)}</td>
      <td style="text-align:center">
        <span style="display:inline-block;padding:3px 10px;border-radius:99px;font-size:9px;font-weight:700;letter-spacing:0.05em;${badge}">
          ${c.estado.replace('_', ' ')}
        </span>
      </td>
    </tr>`
  }).join('')

  const fechaGenerado = new Date().toLocaleDateString('es-PE', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Cronograma — ${prestamo.clienteNombre}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, Arial, sans-serif;
      font-size: 12px;
      color: #1e293b;
      background: #fff;
    }

    /* ═══════════════ HEADER BANNER ═══════════════ */
    .header-banner {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0369a1 100%);
      padding: 28px 40px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-icon {
      width: 42px; height: 42px;
      background: rgba(255,255,255,0.15);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px;
      border: 1px solid rgba(255,255,255,0.2);
    }
    .brand-text { color: #fff; }
    .brand-name { font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
    .brand-sub  { font-size: 10px; color: #93c5fd; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 2px; }
    .header-right { text-align: right; }
    .doc-title    { font-size: 13px; font-weight: 700; color: #bfdbfe; letter-spacing: 0.08em; text-transform: uppercase; }
    .doc-id       { font-size: 10px; color: #7dd3fc; margin-top: 3px; }

    /* ═══════════════ ACCENT STRIP ═══════════════ */
    .accent-strip {
      height: 4px;
      background: linear-gradient(90deg, #38bdf8, #6366f1, #10b981);
    }

    /* ═══════════════ BODY ═══════════════ */
    .body { padding: 28px 40px; }

    /* ═══════════════ CLIENT SECTION ═══════════════ */
    .client-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }
    .client-info { flex: 1; }
    .client-label {
      font-size: 9px; font-weight: 700; color: #94a3b8;
      text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;
    }
    .client-name  { font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em; }
    .client-meta  { font-size: 11px; color: #64748b; margin-top: 4px; }
    .estado-badge {
      display: flex; align-items: center; gap: 7px;
      padding: 8px 16px;
      border-radius: 99px;
      font-size: 11px; font-weight: 700;
      background: ${estadoColor.bg};
      color: ${estadoColor.text};
      border: 1.5px solid ${estadoColor.dot}40;
    }
    .estado-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: ${estadoColor.dot};
    }

    /* ═══════════════ METRIC CARDS ═══════════════ */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }
    .metric-card {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 14px 16px;
      position: relative;
      overflow: hidden;
    }
    .metric-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 4px; height: 100%;
      border-radius: 10px 0 0 10px;
    }
    .metric-card.blue::before   { background: #3b82f6; }
    .metric-card.indigo::before { background: #6366f1; }
    .metric-card.green::before  { background: #10b981; }
    .metric-card.amber::before  { background: #f59e0b; }
    .metric-label {
      font-size: 9px; font-weight: 700; color: #94a3b8;
      text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px;
    }
    .metric-value {
      font-size: 15px; font-weight: 800; color: #0f172a;
      font-variant-numeric: tabular-nums; letter-spacing: -0.01em;
    }
    .metric-sub {
      font-size: 10px; color: #94a3b8; margin-top: 3px;
    }

    /* ═══════════════ PROGRESS ═══════════════ */
    .progress-section {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 16px 20px;
      margin-bottom: 24px;
    }
    .progress-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 10px;
    }
    .progress-title { font-size: 11px; font-weight: 700; color: #334155; }
    .progress-pct   { font-size: 20px; font-weight: 800; color: #0ea5e9; }
    .progress-track {
      height: 10px;
      background: #e2e8f0;
      border-radius: 99px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    .progress-fill {
      height: 100%;
      width: ${pct}%;
      background: linear-gradient(90deg, #38bdf8 0%, #6366f1 100%);
      border-radius: 99px;
    }
    .progress-stats {
      display: flex; gap: 20px;
    }
    .pstat { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #64748b; }
    .pstat-dot { width: 8px; height: 8px; border-radius: 50%; }

    /* ═══════════════ SECTION TITLE ═══════════════ */
    .section-title {
      font-size: 10px; font-weight: 800; color: #475569;
      text-transform: uppercase; letter-spacing: 0.1em;
      margin-bottom: 10px;
      display: flex; align-items: center; gap: 8px;
    }
    .section-title::after {
      content: ''; flex: 1; height: 1px; background: #e2e8f0;
    }

    /* ═══════════════ TABLE ═══════════════ */
    .table-wrap {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      overflow: hidden;
    }
    table { width: 100%; border-collapse: collapse; }
    thead tr {
      background: linear-gradient(135deg, #0f172a, #1e3a5f);
    }
    thead th {
      color: #e2e8f0;
      font-size: 9.5px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.07em;
      padding: 11px 14px;
      text-align: left;
    }
    thead th.r { text-align: right; }
    thead th.c { text-align: center; }
    tbody td {
      padding: 9px 14px;
      font-size: 11.5px;
      border-bottom: 1px solid #f1f5f9;
    }
    tbody tr:last-child td { border-bottom: none; }

    /* ═══════════════ FOOTER ═══════════════ */
    .footer {
      margin-top: 28px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      border-top: 2px solid #e2e8f0;
      padding-top: 18px;
    }
    .footer-left { font-size: 10px; color: #94a3b8; line-height: 1.7; }
    .footer-right { text-align: right; }
    .sign-line {
      border-top: 1.5px solid #334155;
      width: 180px;
      margin-left: auto;
      margin-top: 32px;
      padding-top: 6px;
      font-size: 10px;
      color: #64748b;
      text-align: center;
    }
    .footer-brand { font-size: 11px; font-weight: 800; color: #0ea5e9; }

    @media print {
      body { background: #fff; }
      @page { margin: 12mm 10mm; size: A4 portrait; }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <div class="header-banner">
    <div class="brand-logo">
      <div class="brand-icon">💰</div>
      <div class="brand-text">
        <div class="brand-name">PréstamOS</div>
        <div class="brand-sub">Gestión Financiera</div>
      </div>
    </div>
    <div class="header-right">
      <div class="doc-title">Cronograma de Pagos</div>
      <div class="doc-id">Préstamo #${prestamo.id} &nbsp;·&nbsp; Emitido: ${fechaGenerado}</div>
    </div>
  </div>
  <div class="accent-strip"></div>

  <div class="body">

    <!-- CLIENTE + ESTADO -->
    <div class="client-section">
      <div class="client-info">
        <div class="client-label">Cliente</div>
        <div class="client-name">${prestamo.clienteNombre}</div>
        <div class="client-meta">
          Inicio: ${fmtFecha(prestamo.fechaInicio)}
          &nbsp;·&nbsp;
          Frecuencia: ${prestamo.frecuencia}
          &nbsp;·&nbsp;
          ${prestamo.numeroCuotas} cuotas
        </div>
      </div>
      <div class="estado-badge">
        <div class="estado-dot"></div>
        ${prestamo.estado.replace('_', ' ')}
      </div>
    </div>

    <!-- MÉTRICAS PRINCIPALES -->
    <div class="metrics-grid">
      <div class="metric-card blue">
        <div class="metric-label">Capital prestado</div>
        <div class="metric-value">${fmt(prestamo.capital)}</div>
        <div class="metric-sub">Monto desembolsado</div>
      </div>
      <div class="metric-card indigo">
        <div class="metric-label">Total a cobrar</div>
        <div class="metric-value">${fmt(prestamo.montoTotal)}</div>
        <div class="metric-sub">Capital + intereses</div>
      </div>
      <div class="metric-card green">
        <div class="metric-label">Total cobrado</div>
        <div class="metric-value">${fmt(totalCobrado)}</div>
        <div class="metric-sub">Suma de pagos recibidos</div>
      </div>
      <div class="metric-card amber">
        <div class="metric-label">Saldo pendiente</div>
        <div class="metric-value">${fmt(saldoTotal)}</div>
        <div class="metric-sub">Por recuperar</div>
      </div>
    </div>

    <!-- PROGRESO -->
    <div class="progress-section">
      <div class="progress-header">
        <div class="progress-title">Avance del préstamo</div>
        <div class="progress-pct">${pct}%</div>
      </div>
      <div class="progress-track">
        <div class="progress-fill"></div>
      </div>
      <div class="progress-stats">
        <div class="pstat">
          <div class="pstat-dot" style="background:#22c55e"></div>
          ${pagadas} pagadas
        </div>
        <div class="pstat">
          <div class="pstat-dot" style="background:#ef4444"></div>
          ${vencidas} vencidas
        </div>
        <div class="pstat">
          <div class="pstat-dot" style="background:#3b82f6"></div>
          ${pendientes} pendientes
        </div>
        <div class="pstat" style="margin-left:auto">
          Tasa: <strong style="color:#0f172a;margin-left:3px">${(prestamo.tasaInteres * 100).toFixed(1)}% por cuota</strong>
        </div>
      </div>
    </div>

    <!-- TABLA DE CUOTAS -->
    <div class="section-title">Cronograma de cuotas</div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th class="c">#</th>
            <th>Vencimiento</th>
            <th class="r">Monto cuota</th>
            <th class="r">Pagado</th>
            <th class="r">Saldo</th>
            <th class="c">Estado</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <div class="footer-left">
        <div class="footer-brand">PréstamOS</div>
        Sistema de Gestión Financiera<br>
        Documento generado el ${fechaGenerado}<br>
        Este documento es de carácter informativo y confidencial.
      </div>
      <div class="footer-right">
        <div class="sign-line">Firma y sello del responsable</div>
      </div>
    </div>

  </div>

  <script>window.onload = () => { window.focus(); window.print() }<\/script>
</body>
</html>`

  const win = window.open('', '_blank', 'width=1000,height=780')
  win.document.write(html)
  win.document.close()
}