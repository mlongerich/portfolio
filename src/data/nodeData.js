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
      ['kv', 'Outputs', 'Internal Developer Platform'],
      ['raw', '             Developer experience tooling'],
      ['raw', '             Cloud-native architecture'],
      ['kv', 'Talk', '"Our adventure in building an'],
      ['raw', '             internal developer platform"'],
      ['raw', '             — conference, 2024'],
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
      ['kv', 'Domains', 'CI/CD · Security · IaC'],
      ['kv', 'Pattern', 'Legacy modernisation'],
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
      ['kv', 'Product', 'Ticketing flexibility · ops efficiency'],
      ['kv', 'Team', '20 members (devs · QA · BA · PO · SM)'],
      ['kv', 'Lead', 'Michael Longerich (Tech Lead)'],
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
      ['kv', 'Purpose', 'Audio → AI-structured meeting notes'],
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
  'community-out': {
    title: 'describe service/community-out',
    lines: [
      ['prompt', '$ kubectl describe service/community-out'],
      ['blank'],
      ['kv', 'Name', 'Community & Mentoring'],
      ['kv', 'Roles', 'Platform Engineering Lead'],
      ['raw', '             AI Community Lead'],
      ['raw', '             Mentor — active sessions'],
      ['kv', 'Output', 'Engineer growth · knowledge transfer'],
      ['kv', 'Status', 'Running', 'running'],
    ],
  },
  'speaking': {
    title: 'describe ingress/speaking',
    lines: [
      ['prompt', '$ kubectl describe ingress/speaking'],
      ['blank'],
      ['kv', 'Name', 'Talks & Presence'],
      ['kv', 'Talk', '"Our adventure in building an'],
      ['raw', '             internal developer platform"'],
      ['raw', '             with Raksit Mantanacharu'],
      ['kv', 'Platform', 'YouTube · Thoughtworks · LinkedIn'],
      ['kv', 'Status', 'Available', 'running'],
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
