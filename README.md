# Minimum reproduction of middleware to middleware rewrite bug

- Site1: https://next-middleware-to-middleware-bug-repro-site1.vercel.app/ (target)
- Site2: https://next-middleware-to-middleware-bug-repro-site2.vercel.app/ (middleware proxy to target)
- Site3: https://site3.danny-312.workers.dev (baseline: cloudflare worker proxy to target)

Site1 is the parent site, and site2/site3 are the child sites

In production, site1 is a multi-tenant site, which we're mocking in this repo with a single tenant.
