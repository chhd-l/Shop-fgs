# royal-canin-exported-components

The NPM feed is scoped and only contains the exported components library, not the peer dependencies. If following the Azure instructions to [connect to the feed](https://dev.azure.com/MarsDevTeam/RoyalCaninSitecore/_artifacts/feed/rc-sc-exported-components/connect/npm), note that this is not taken into account and you will need to update your _.npmrc_ file to include the scope:

```
@royal-canin-sitecore:registry=https://pkgs.dev.azure.com/MarsDevTeam/RoyalCaninSitecore/_packaging/rc-sc-exported-components/npm/registry/

always-auth=true
```

It is recommended to pin your version number to the latest _prerelease_ version during integration testing.

## Exported Components Provider

```tsx
import { ExportedComponentsProvider } from '@royal-canin-sitecore/react-components';
```

This component needs to be a parent of all other exported components, so probably needs to be rendered near the root of the application, or at least wrap the pages containing all of these components.

```tsx
<ExportedComponentsProvider>
  <CountrySelector locale="en-us" site="us" />
  <TopNavigation locale="en-us" site="us" />
  <Footer locale="en-us" site="us" />
</ExportedComponentsProvider>
```

## Top Navigation

```tsx
import { TopNavigation } from '@royal-canin-sitecore/react-components';
```

To use when the component is served on the same domain as the API, e.g. Staging, Prod:

```tsx
<TopNavigation locale="en-us" site="us" />
```

To use when the component is served on a different domain to the API:

```tsx
<TopNavigation locale="en-us" site="us" apiHost="https://royalcanin-rh.vh.localhost" />
```

The data fetch can be handled outside of the component and passed in as a prop, which can be used to server-side render the component.

```tsx
import { TopNavigation, fetchNavigation } from '@royal-canin-sitecore/react-components';

const data = (await fetchNavigation('us', 'en-us', 'https://royalcanin-rh.vh.localhost'))
  ?.siteSettings?.items;

{
  data?.length && <TopNavigation navigationData={data} />;
}
```

## Footer

Currently only a placeholder component exists for the _Footer_. From _v0.2.0_ this is expected to work in the same way as _TopNavigation_ and accept the following props: `locale`, `site`, `apiHost`.

```tsx
import { Footer } from '@royal-canin-sitecore/react-components';
```

To use when the component is served on the same domain as the API, e.g. Staging, Prod:

```tsx
<Footer locale="en-us" site="us" />
```

To use when the component is served on a different domain to the API:

```tsx
<Footer locale="en-us" site="us" apiHost="https://royalcanin-rh.vh.localhost" />
```

## Country Selector

The _CountrySelector_ component does not yet exist, but from _v0.2.0_ is expected to work in the same way as _TopNavigation_ and accept the following props: `locale`, `site`, `apiHost`.

```tsx
import { CountrySelector } from '@royal-canin-sitecore/react-components';
```

To use when the component is served on the same domain as the API, e.g. Staging, Prod:

```tsx
<CountrySelector locale="en-us" site="us" />
```

To use when the component is served on a different domain to the API:

```tsx
<CountrySelector locale="en-us" site="us" apiHost="https://royalcanin-rh.vh.localhost" />
```

#### Known Issues

##### v0.1.8

- **CORS**: Cross-origin testing (API and component served on different domains) is not currently possible
- Mobile UI renders with entire header; this still needs to be decoupled
- Console errors
