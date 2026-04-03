/**
 * TinaCMS Admin Page
 *
 * TinaAdmin requires the generated GraphQL client (tina/__generated__/client.ts),
 * which is only created after running `npm run tina:dev` for the first time.
 *
 * To access the CMS admin UI:
 *   1. Run: npm run tina:dev
 *   2. Open: http://localhost:4001/admin
 *
 * The admin UI is served directly by the TinaCMS dev server at port 4001,
 * not through the Next.js app router. This page serves as a redirect shim
 * in development and an informational placeholder in production.
 */

import AdminClient from './admin-client'

export function generateStaticParams() {
  return [{ filename: [] }]
}

export default function AdminPage() {
  return <AdminClient />
}
