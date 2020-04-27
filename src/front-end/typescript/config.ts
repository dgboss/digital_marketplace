import { prefixPath } from 'front-end/lib';

export const NODE_ENV = process.env.NODE_ENV || 'production';

export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'TODO';

// Set this environment variable if behind reverse proxies at a particular path.
// e.g. www.example.com/marketplace/*
export const PATH_PREFIX = process.env.PATH_PREFIX || '';

export const MARKDOWN_HELP_URL = 'https://www.markdownguide.org/cheat-sheet';

export const FORM_FIELD_DEBOUNCE_DURATION = 500;

export const SEARCH_DEBOUNCE_DURATION = 200;

export const PROCUREMENT_CONCIERGE_URL = 'https://procurementconcierge.gov.bc.ca';

export const DEFAULT_USER_AVATAR_IMAGE_PATH = prefixPath('/images/default_user_avatar.svg');

export const DEFAULT_ORGANIZATION_LOGO_IMAGE_PATH = prefixPath('/images/default_organization_logo.svg');

export const TRANSITION_DURATION = 240; //ms

export const EMPTY_STRING = '—'; // emdash

export const DROPDOWN_CARET_SIZE = 0.8; //rem

export const TOAST_AUTO_DISMISS_DURATION = 20000; //ms

export const SWU_PROPOSAL_EVALUATION_CONTENT_ID = 'sprint-with-us-proposal-evaluation';

export const SWU_OPPORTUNITY_SCOPE_CONTENT_ID = 'sprint-with-us-opportunity-scope';

export const SWU_QUALIFICATION_TERMS_ID = 'sprint-with-us-qualification-terms-and-conditions';
