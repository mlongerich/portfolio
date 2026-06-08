import { useBootStatus } from './useBootStatus.js';
import { NODE_STATUSES } from '../data/diagramData.js';

export function usePsRowStatuses() {
  const pfa          = useBootStatus('run',   NODE_STATUSES['pfa']['ready'],           NODE_STATUSES['pfa']['loading']);
  const airline      = useBootStatus('run',   NODE_STATUSES['airline']['ready'],       NODE_STATUSES['airline']['loading']);
  const communityOut = useBootStatus('run',   NODE_STATUSES['community-out']['ready'], NODE_STATUSES['community-out']['loading']);
  const aiTooling    = useBootStatus('run',   NODE_STATUSES['ai-tooling']['ready'],    NODE_STATUSES['ai-tooling']['loading']);
  const dashnote     = useBootStatus('build', NODE_STATUSES['dashnote']['ready'],      NODE_STATUSES['dashnote']['loading']);
  const donationApp  = useBootStatus('build', NODE_STATUSES['donation-app']['ready'],  NODE_STATUSES['donation-app']['loading']);
  return {
    'pfa':           pfa,
    'airline':       airline,
    'community-out': communityOut,
    'ai-tooling':    aiTooling,
    'dashnote':      dashnote,
    'donation-app':  donationApp,
  };
}
