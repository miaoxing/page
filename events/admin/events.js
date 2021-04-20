export default {
  async onPageGetComponents(components) {
    components.push(...(await import('./pageGetComponents')).default);
  },

  async onLinkPickerGetOptions(options) {
    options.push(...(await import('./linkPickerGetOptions')).default);
  },
};
