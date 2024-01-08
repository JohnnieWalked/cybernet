# Edge compatability (Auth.js v5) 08.01.2024

While NextAuth.js strictly uses standard Web APIs (and thus can run in any environments that supports that), some libraries/ORM packages that you rely on might not be ready yet. In this case, you can split the auth configuration into multiple files. The following is an example of how to do this with a database adapter.

Most adapters rely on an ORM/library that is not yet compatible with the Edge runtime. So here is how you can work around it, by forcing a JWT session strategy:

- Create an ```auth.config.ts``` file with your config and export it:

```typescript
import GitHub from "next-auth/providers/github"

import type { NextAuthConfig } from "next-auth"

export default {
  providers: [GitHub],
} satisfies NextAuthConfig
```

- Create an ```auth.ts``` file and add your adapter there, together with the jwt session strategy:

```typescript
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"

const prisma = new PrismaClient()

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
```

- Make sure that Middleware is not using the import with a non-edge compatible adapter:

```markdown
- export { auth as middleware } from './auth'
+ import authConfig from "./auth.config"
+ import NextAuth from "next-auth"
+ export const { auth: middleware } = NextAuth(authConfig)
```

That's it! Now you can keep using a database for user data, even if your adapter is not compatible with the Edge runtime yet, by forcing the session strategy to be JWT.

