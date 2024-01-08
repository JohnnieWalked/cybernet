# CYBERNET 


**"CyberNet"** is a custom web messanger app developed with Next.js  and Auth.js in "*Cyberpunk 2077*" style.

---

## Tech Stack

**Primary:**

- Next.js (app router, 14.0.4);
- Auth.js (^5.0.0-beta.4);
- React library;
- Postgresql (DB located on website "Supabase");
- ORM Prisma;
- auth/prisma-adapter;
- bcryptjs;
- uuid;

**Secondary:**

- zod;
- sass;
- tailwind;
- react-icons;
- react-spinners;
- react-transition-group;
- react-toastify;
- next-ui.

---

## Technical Explanation

### Sign in / Sign up functionality

**Sign in** and **Sign up** forms are located in component *`AuthForm.tsx`*. To implement logging and registration we will use server actions, which are provided by Next.js. To manage states of forms with server actions we will use react-dom hook '*useFormState*'. Server actions are situated in folder `actions` in files called `login.ts` and `sign-up.ts`.

Validating form fields will be in server actions using **ZOD**. All zod schemas are located in folder `schemas`.

**Sign up logic**:

- *Name*, *Username* and *Email* must be unique, *Passsword*;
- Check if user already exist;
- Create user in database;
- Send verification token to email (expires in 1 hour);
- *If any error occurs -> send error obj to client component;*

**Sign in logic:**

- Enter *Username* or *Email*;
- Check if user exists;
- Check if user confirms his email -> else simply user will not be able to login;
  - send verification token again (expires in 1 hour);
- Call function "**signIn()**" which is a part of Auth.js and passing arguments;

```typescript
  const result = SignInSchema.safeParse({
    signin: formData.get('signin'),
    password: formData.get('password'),
  });

  await signIn('credentials', {
    signin: result.data.signin,
    password: result.data.password,
  });
```

- Execute function authorize() which is located in ```auth.config.ts``` (read more about *[Edge compatability](<Edge compatability (Auth.js).md>)* in Auth.js) -> returns user;
- After that Auth.js callbacks are executed in file `auth.ts`:
  - Firstly, "**jwt()**" which receives, modify and returns token to session;
  - Secondary, "**session()**" which receives token, modify session with token-data and returns session;
- And finally -> executing auth() from `middleware.ts`;

  



