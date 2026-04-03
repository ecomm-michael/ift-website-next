import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('hero')

  return (
    <main>
      <h1>{t('line1')}</h1>
      <p>{t('line2')}</p>
    </main>
  )
}
