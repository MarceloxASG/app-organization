/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/screens/LoginScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/RegisterScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/TaskFormScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/TaskListScreen`; params?: Router.UnknownInputParams; } | { pathname: `/services/api`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/LoginScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/RegisterScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/TaskFormScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screens/TaskListScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/services/api`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/screens/LoginScreen${`?${string}` | `#${string}` | ''}` | `/screens/RegisterScreen${`?${string}` | `#${string}` | ''}` | `/screens/TaskFormScreen${`?${string}` | `#${string}` | ''}` | `/screens/TaskListScreen${`?${string}` | `#${string}` | ''}` | `/services/api${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/screens/LoginScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/RegisterScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/TaskFormScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screens/TaskListScreen`; params?: Router.UnknownInputParams; } | { pathname: `/services/api`; params?: Router.UnknownInputParams; };
    }
  }
}
