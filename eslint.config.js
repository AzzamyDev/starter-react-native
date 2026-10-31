const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')

module.exports = defineConfig([
    expoConfig,
    { ignores: ['dist/*', '.expo/*', 'ios/*', 'android/*'] },
    {
        files: ['scripts/**/*.js', '*.config.js'],
        languageOptions: {
            globals: { __dirname: 'readonly', process: 'readonly' }
        }
    }
])
