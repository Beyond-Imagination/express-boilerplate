import { loadPassport } from '@/libs/passport'
import { awsLoader } from '@/libs/aws'
import { loadMongoose } from '@/models'

export async function load() {
    loadPassport()
    awsLoader()
    await loadMongoose()
}
