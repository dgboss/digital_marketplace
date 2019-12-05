import { Route } from 'front-end/lib/app/types';
import { Router } from 'front-end/lib/framework';

export function pushState(route: Route) {
  if (window.history && window.history.pushState) {
    const path = router.routeToUrl(route);
    window.history.pushState({ path }, '', path);
  }
}

export function replaceState(route: Route) {
  if (window.history && window.history.replaceState) {
    const path = router.routeToUrl(route);
    window.history.replaceState({ path }, '', path);
  }
}

export function redirect(path: string) {
  window.location.href = `${window.location.origin}/${path}`;
}

const router: Router<Route> = {

  // Note(Jesse): @add_new_page_location

  routes: [
    {
      path: '/orgs/:id/view',
      makeRoute({ params }) {
        return {
          tag: 'orgView',
          value: {
            orgId: params.id || ''
          }
        };
      }
    },
    {
      path: '/org/edit',
      makeRoute() {
        return {
          tag: 'orgEdit',
          value: null
        };
      }
    },
    {
      path: '/user/edit',
      makeRoute() {
        return {
          tag: 'userEdit',
          value: null
        };
      }
    },
    {
      path: '/user/view',
      makeRoute() {
        return {
          tag: 'userView',
          value: null
        };
      }
    },
    {
      path: '/users',
      makeRoute() {
        return {
          tag: 'userList',
          value: null
        };
      }
    },
    {
      path: '/',
      makeRoute() {
        return {
          tag: 'hello',
          value: null
        };
      }
    },
    {
      path: '/sign-in',
      makeRoute() {
        return {
          tag: 'signIn',
          value: null
        };
      }
    },
    {
      path: '/sign-out',
      makeRoute() {
        return {
          tag: 'signOut',
          value: null
        };
      }
    },
    {
      path: '/notice/auth-failure',
      makeRoute() {
        return {
          tag: 'notice',
          value: {
            noticeId: {
              tag: 'authFailure',
              value: undefined
            }
          }
        };
      }
    },
    {
      path: '*',
      makeRoute() {
        return {
          tag: 'notice',
          value: {
            noticeId: {
              tag: 'notFound',
              value: undefined
            }
          }
        };
      }
    }
  ],

  // Note(Jesse): @add_new_page_location

  routeToUrl(route) {
    switch (route.tag) {
      case 'hello':
        return '/';
      case 'signIn':
        return '/sign-in';
      case 'signOut':
        return '/sign-out';
      case 'userEdit':
        return '/user/edit';
      case 'userView':
        return '/user/view';
      case 'userList':
        return '/users';
      case 'orgEdit':
        return '/org/edit';
      case 'orgView':
        return '/org/view';
      case 'notice':
        return (() => {
          switch (route.value.noticeId.tag) {
            case 'notFound':
              return '/not-found';
            case 'authFailure':
              return '/notice/auth-failure';
          }
        })();
    }
  }

};

export default router;
