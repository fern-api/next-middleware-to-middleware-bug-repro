## Minimum reproduction of middleware to middleware rewrite bug

- Site1: https://next-middleware-to-middleware-bug-repro-site1.vercel.app/ (target)
- Site2: https://next-middleware-to-middleware-bug-repro-site2.vercel.app/ (middleware proxy to target)
- Site3: https://site3.danny-312.workers.dev (baseline: cloudflare worker proxy to target)

Site1 is the parent site, and site2/site3 are the child sites

In production, site1 is a multi-tenant vercel project, which we're mocking in this repo with a single tenant.

`/tenant/[num].tsx` renders the tenant-specific content. In production, this is `/[tenant]/[[...path]].tsx`
`/basepath/*` is rewritten to `/tenant/*` inside site1, where `/basepath/` is arbitrary and defined by the customer.
`/basepath/*` is rewritten to `$SITE1_ORIGIN/basepath/*` inside site2 and site3.

### Bug reproduction

1. navigate to [site2](https://next-middleware-to-middleware-bug-repro-site2.vercel.app/)
2. click the link to `/basepath/0`
3. click the `num++` and `num--` buttons to increment and decrement the number
4. observe that `Application error: a client-side exception has occurred (see the browser console for more information).` is logged in the browser console

### Expected behavior

1. navigate to [site3](https://site3.danny-312.workers.dev/)
2. click the link to `/basepath/0`
3. click the `num++` and `num--` buttons to increment and decrement the number
4. observe that the number is incremented and decremented correctly using client-side routing (no page reloads)
