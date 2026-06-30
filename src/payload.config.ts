import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { es } from '@payloadcms/translations/languages/es'
import path from 'path'
import { fileURLToPath } from 'url'

import { Raffles } from './payload/collections/Raffles'
import { Orders } from './payload/collections/Orders'
import { Tickets } from './payload/collections/Tickets'
import { Media } from './payload/collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  collections: [Raffles, Orders, Tickets, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'super-secret-key',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  i18n: {
    supportedLanguages: { es },
    fallbackLanguage: 'es',
  },
  routes: {
    admin: '/cms'
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
