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

**Sign in** and **Sign up** forms are located in component ***AuthForm.tsx***. To implement logging and registration we will use server actions, which are provided by Next.js. To manage states of forms with server actions we will use react-dom hook "useFormState". Server actions are located in folder "*actions*" in files called "*login.ts*" and "*sign-up.ts*".

Validating form fields will be in server actions using **ZOD**. All zod schemas are located in folder "*schemas*".



