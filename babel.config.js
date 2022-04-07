// Babel is used to help Jest run tests in React & TypeScript.
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ]
}
