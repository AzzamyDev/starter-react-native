#!/usr/bin/env node
const { spawnSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

const [env, platform, , ...flags] = process.argv.slice(2)
const local = flags.includes('--local') || process.argv.includes('--local')

const profiles = ['development', 'preview', 'production']
if (!profiles.includes(env) || !['android', 'ios'].includes(platform)) {
    console.error(
        'Usage: node scripts/build-helper.js <development|preview|production> <android|ios> [auto] [--local]'
    )
    process.exit(1)
}

const pkg = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
)
const ext = platform === 'ios' ? 'ipa' : env === 'production' ? 'aab' : 'apk'
const output = `./artifacts/${env}/${platform}/${env}-${platform}-v${pkg.version}.${ext}`

const args = ['build', '--platform', platform, '--profile', env]
if (local) {
    fs.mkdirSync(path.dirname(output), { recursive: true })
    args.push('--local', '--output', output)
} else {
    args.push('--non-interactive')
}

const run = spawnSync('eas', args, {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, APP_VARIANT: env }
})
process.exit(run.status ?? 1)
