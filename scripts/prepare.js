const isCi = process.env.CI !== undefined;
if (!isCi) {
  require('husky').install(); /* eslint-disable-line @typescript-eslint/no-var-requires */
}
