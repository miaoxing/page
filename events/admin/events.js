export default {
  async onPageGetComponents(components) {
    components.push(...(await import('./pageGetComponents')).default);
  },
};
