# shop-template
This is an open source e-commerce skateshop build with everything new in Next.js 13

# Tech Stack
- Framework: Next.js
- Styling: Tailwind CSS
- User Management: Clerk
- ORM: Drizzle ORM
- UI Components: shadcn/ui
- File Uploads: uploadthing
- Payments infrastructure: Stripe

# Features to be implemented
- [ ] Add Stripe connection
- [ ] Add Categories
- [ ] Add Store backend
- [ ] Add favorites page
- [ ] Add Payments history
- [ ] Have Clerk and NextAuth Login
- [ ] Validate stock when the user is buying products

# Running Locally
1. Clone the repository

   ```bash
   git clone https://github.com/chibek/shopycheck.git
   ```

2. Install dependencies using pnpm

   ```bash
   npm install
   ```

3. Copy the `.env.example` to `.env` and update the variables.

   ```bash
   cp .env.example .env
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

5. Push the database schema

   ```bash
   pnpm run db:push
   ```
