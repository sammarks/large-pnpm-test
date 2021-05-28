const path = require('path')
const fs = require('fs')

const files = packageName => ({
  'package.json': JSON.stringify({
    name: packageName,
    version: '0.0.0',
    main: 'src/index.js',
    dependencies: {
      '@types/lodash': '4.14.170'
    }
  }),
  'src/index.js': 'console.info("foobar")'
})

const TO_CREATE = 100
for (let i = 0; i < TO_CREATE; i++) {
  const packageDirectory = path.join(process.cwd(), `test-packages/package-${i}`)
  if (!fs.existsSync(packageDirectory)) {
    fs.mkdirSync(packageDirectory)
  }
  const srcDirectory = path.join(packageDirectory, 'src')
  if (!fs.existsSync(srcDirectory)) {
    fs.mkdirSync(srcDirectory)
  }
  const toCreate = files(`package-${i}`)
  for (const key of Object.keys(toCreate)) {
    fs.writeFileSync(path.join(packageDirectory, key), toCreate[key])
  }
}
