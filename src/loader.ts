import { loadPassport } from '@/libs/passport'
import { awsLoader } from '@/libs/aws'

export async function load() {
    loadPassport()
    awsLoader()
}
