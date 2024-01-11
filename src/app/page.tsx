import styles from './page.module.css'
import { App } from '@/components/App/App'
import { GeoLocationProvider } from '@/components/GeoLocationProvider'

export default function Home() {
  return (
    <main className={styles.main}>
      <GeoLocationProvider>
        <App />
      </GeoLocationProvider>
    </main>
  )
}
