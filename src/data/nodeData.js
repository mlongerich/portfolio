export const NODE_DATA = {
  'tech-lead': {
    title: 'describe deployment/tech-lead',
    lines: [
      ['prompt', '$ kubectl describe deployment/tech-lead'],
      ['blank'],
      ['kv', 'Name', 'Tech Lead'],
      ['kv', 'Role', 'Lead Consultant, Thoughtworks'],
      ['kv', 'Since', '2020'],
      ['kv', 'Focus', 'Team leadership · delivery'],
      ['raw', '             · strategy'],
      ['kv', 'Status', 'Running', 'running'],
    ],
  },
  'platform-eng': {
    title: 'describe service/platform-eng',
    lines: [
      ['prompt', '$ kubectl describe service/platform-eng'],
      ['blank'],
      ['kv', 'Name', 'Platform Engineering'],
      ['kv', 'Type', 'Core Service'],
      ['kv', 'Client', 'Global restaurant chain'],
      ['raw', '             2800+ stores · 13 countries'],
      ['kv', 'Output', 'Internal Developer Platform'],
      ['raw', '             PaaS · AKS · ACA'],
      ['kv', 'Impact', '11 teams · 27 services'],
      ['kv', 'PaaS', 'BFF / interop — airline'],
      ['kv', 'Talk', '"Our Adventures in Building an'],
      ['raw', '             Internal Developer Platform"'],
      ['raw', '             — xConf · Thoughtworks'],
      ['kv', 'Status', 'Running', 'running'],
    ],
  },
  'infra-eng': {
    title: 'describe service/infra-eng',
    lines: [
      ['prompt', '$ kubectl describe service/infra-eng'],
      ['blank'],
      ['kv', 'Name', 'Infrastructure Engineering'],
      ['kv', 'Tools', 'Kubernetes · Terraform · Helm'],
      ['kv', 'Cloud', 'AWS · Azure'],
      ['kv', 'CI/CD', 'GoCD · GitHub Actions'],
      ['raw', '             Azure Pipelines'],
      ['kv', 'Obs', 'Datadog · New Relic · Grafana'],
      ['kv', 'Domains', 'Security · IaC · legacy'],
      ['kv', 'Status', 'Running', 'running'],
    ],
  },
  'ai-tooling': {
    title: 'describe service/ai-tooling',
    lines: [
      ['prompt', '$ kubectl describe service/ai-tooling'],
      ['blank'],
      ['kv', 'Name', 'AI & Automation'],
      ['kv', 'Role', 'Community Lead — TW AI Community'],
      ['kv', 'Scope', 'AI-enhanced workflows'],
      ['raw', '             Tooling integration'],
      ['raw', '             Claude API · OpenAI · agentic'],
      ['kv', 'Status', 'Running', 'running'],
    ],
  },
  'airline': {
    title: 'describe deployment/airline',
    lines: [
      ['prompt', '$ kubectl describe deployment/airline'],
      ['blank'],
      ['kv', 'Name', 'Airline (current client)'],
      ['kv', 'Type', 'Production Deployment'],
      ['kv', 'Roles', 'Tech Lead · DevOps · Platform'],
      ['kv', 'Work', 'Seats UX · DevOps / infra'],
      ['raw', '             BFF / interop (PaaS)'],
      ['raw', '             Baggage — 13 biz units'],
      ['kv', 'Team', '20 (devs · QA · BA · PO · SM)'],
      ['kv', 'Lead', 'Michael Longerich'],
      ['kv', 'Status', 'Active', 'running'],
    ],
  },
  'dashnote': {
    title: 'describe pod/ai-meeting-notes.app',
    lines: [
      ['prompt', '$ kubectl describe pod/ai-meeting-notes.app'],
      ['blank'],
      ['kv', 'Name', 'AI Meeting Notes App'],
      ['kv', 'Type', 'Personal Product'],
      ['kv', 'Stack', 'React Native · Supabase'],
      ['raw', '             OpenAI Whisper · Claude API'],
      ['raw', '             iOS · Android'],
      ['kv', 'Purpose', 'Audio → AI meeting notes'],
      ['kv', 'Status', 'In development'],
    ],
  },
  'donation-app': {
    title: 'describe pod/donation.app',
    lines: [
      ['prompt', '$ kubectl describe pod/donation.app'],
      ['blank'],
      ['kv', 'Name', 'Donation App'],
      ['kv', 'Type', 'Mission Project'],
      ['kv', 'Purpose', 'Fundraising platform — nonprofit'],
      ['kv', 'Stack', 'Full-stack web'],
      ['kv', 'Status', 'In development'],
    ],
  },
  'pfa': {
    title: 'describe service/pfa',
    lines: [
      ['prompt', '$ kubectl describe service/pfa'],
      ['blank'],
      ['kv', 'Name', 'Projects For Asia (PFA)'],
      ['kv', 'Role', 'IT Director (Volunteer)'],
      ['kv', 'Since', '2007 · 19 continuous years'],
      ['kv', 'Stack', 'Ruby on Rails · PostgreSQL'],
      ['kv', 'Built', 'Website · school database'],
      ['raw', '             Network admin · marketing'],
      ['kv', 'Focus', 'Thai Hill Tribe · education'],
      ['kv', 'Status', 'Running', 'running'],
    ],
  },
  'telecom': {
    title: 'describe pod/telecom-coverage',
    lines: [
      ['prompt', '$ kubectl describe pod/telecom-coverage'],
      ['blank'],
      ['kv', 'Name', 'Broadband Coverage Tool'],
      ['kv', 'Company', 'Black Tangent'],
      ['kv', 'Client', 'Enterprise telecom — Europe'],
      ['kv', 'Stack', 'Ruby on Rails · React · GraphQL'],
      ['kv', 'Infra', 'AWS CloudFormation · PNDA'],
      ['kv', 'Output', 'Live coverage data'],
      ['raw', '             Auto provider switching'],
      ['raw', '             by cost & performance'],
      ['kv', 'Status', 'Shipped'],
    ],
  },
  'prem-school': {
    title: 'describe pod/prem-school-apps',
    lines: [
      ['prompt', '$ kubectl describe pod/prem-school-apps'],
      ['blank'],
      ['kv', 'Name', 'International School Apps'],
      ['kv', 'Client', "Prem Tinsulanonda Int'l School"],
      ['kv', 'Period', '2013 – 2019 · sole developer'],
      ['kv', 'Apps', 'Boarding attendance system'],
      ['raw', '             Digital nursing records'],
      ['raw', '             Conference booking (P/T)'],
      ['raw', '             Admissions workflow'],
      ['kv', 'Status', 'Completed'],
    ],
  },
  'community-out': {
    title: 'describe service/community-out',
    lines: [
      ['prompt', '$ kubectl describe service/community-out'],
      ['blank'],
      ['kv', 'Name', 'Community & Mentoring'],
      ['kv', 'Roles', 'Platform Engineering Lead'],
      ['raw', '             AI Community Lead'],
      ['raw', '             Mentor — active sessions'],
      ['kv', 'Output', 'Growth · knowledge transfer'],
      ['kv', 'Status', 'Running', 'running'],
    ],
  },
  'speaking': {
    title: 'describe ingress/speaking',
    lines: [
      ['prompt', '$ kubectl describe ingress/speaking'],
      ['blank'],
      ['kv', 'Name', 'Talks & Presence'],
      ['kv', 'Talk', '"Our Adventures in Building an'],
      ['raw', '             Internal Developer Platform"'],
      ['raw', '             w/ Raksit Mantanacharu'],
      ['kv', 'Venue', 'xConf · Thoughtworks global'],
      ['kv', 'Media', 'YouTube · Thoughtworks · LinkedIn'],
      ['kv', 'Status', 'Available', 'running'],
    ],
  },
  'codingame': {
    title: 'describe job/codingame-bot',
    lines: [
      ['prompt', '$ kubectl describe job/codingame-bot'],
      ['blank'],
      ['kv', 'Name', 'Codingame AI Bot'],
      ['kv', 'Result', 'Thailand category winner'],
      ['kv', 'Year', '2017'],
      ['kv', 'Lang', 'Ruby'],
      ['kv', 'Method', 'Custom heuristic evaluation'],
      ['raw', '             No pre-built AI library'],
      ['raw', '             All logic written from scratch'],
      ['kv', 'Status', 'Won · 2017'],
    ],
  },
};

export const TALK_NODES = new Set(['platform-eng', 'speaking']);

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export function renderNodeLines(lines, statusOverride = null) {
  let html = '';
  for (const line of lines) {
    const kind = line[0];
    if (kind === 'blank') { html += '\n'; continue; }
    if (kind === 'prompt') { html += `<span class="prompt">${escapeHtml(line[1])}</span>\n`; continue; }
    if (kind === 'raw') { html += escapeHtml(line[1]) + '\n'; continue; }
    if (kind === 'kv') {
      const key = line[1].padEnd(9, ' ');
      let val = line[2];
      let cls = line[3] || '';
      if (statusOverride && line[1] === 'Status') {
        val = statusOverride.text;
        cls = statusOverride.cls;
      }
      html += `<span class="key">${escapeHtml(key)}</span>: <span class="${cls}">${escapeHtml(val)}</span>\n`;
    }
  }
  return html;
}
