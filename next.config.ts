import createNextIntlPlugin from 'next-intl/plugin'
import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const isGitHubPages = !!process.env.GITHUB_ACTIONS
const basePath = isGitHubPages ? '/ift-website-next' : ''

const nextConfig: NextConfig = {
  ...(isGitHubPages && { output: 'export' }),
  basePath: basePath || undefined,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default withNextIntl(nextConfig)
