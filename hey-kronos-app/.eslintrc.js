module.exports = {
  extends: [
    'expo',
    'prettier',
  ],
  ignorePatterns: ['expo-env.d.ts'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
  },
};