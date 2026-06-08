export const REVEAL_ORDER = [
  'boundary',
  'boundary-label',
  'ns-leadership',
  'ns-leadership-label',
  'node-tech-lead',
  'ns-engineering',
  'ns-engineering-label',
  'node-platform-eng',
  'node-infra-eng',
  'node-ai-tooling',
  'ns-products',
  'ns-products-label',
  'node-airline',
  'node-dashnote',
  'node-pfa-app',
  'ns-obs',
  'ns-obs-label',
  'node-speaking',
  'node-community-out',
  'footer-1',
  'footer-2',
  'actor-clients',
  'actor-community',
  'actor-mentees',
];

export const ARROW_ENDPOINTS = {
  'clients-tech': ['actor-clients',     'node-tech-lead'],
  'comm-tech':    ['actor-community',   'node-tech-lead'],
  'tech-plat':    ['node-tech-lead',    'node-platform-eng'],
  'tech-infra':   ['node-tech-lead',    'node-infra-eng'],
  'tech-ai':      ['node-tech-lead',    'node-ai-tooling'],
  'plat-air':     ['node-platform-eng', 'node-airline'],
  'infra-air':    ['node-infra-eng',    'node-airline'],
  'ai-dash':      ['node-ai-tooling',   'node-dashnote'],
  'plat-pfa':     ['node-platform-eng', 'node-pfa-app'],
  'ai-comm':      ['node-ai-tooling',   'node-community-out'],
  'comm-ment':    ['node-community-out','actor-mentees'],
  'speak-comm':   ['node-speaking',     'actor-community'],
};

export const LARGE_KEYS = new Set([
  'boundary', 'ns-leadership', 'ns-engineering', 'ns-products', 'ns-obs',
]);

export const REVEAL_STAGGER = 110;

export const TOTAL = REVEAL_ORDER.length + Object.keys(ARROW_ENDPOINTS).length;

export const NODE_STATUSES = {
  'tech-lead':     { loading: 'initializing', ready: 'running' },
  'platform-eng':  { loading: 'deploying',    ready: 'running' },
  'infra-eng':     { loading: 'provisioning', ready: 'running' },
  'ai-tooling':    { loading: 'starting',     ready: 'running' },
  'airline':       { loading: 'rolling out',  ready: 'active' },
  'dashnote':      { loading: 'scheduled',    ready: 'building' },
  'pfa-app':       { loading: 'scheduled',    ready: 'building' },
  'speaking':      { loading: 'pending',      ready: 'available' },
  'community-out': { loading: 'spinning up',  ready: 'running' },
};
