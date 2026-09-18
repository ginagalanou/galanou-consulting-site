// Activation requires all three gates: productionEnabled, a real measurementId,
// and enhancedMeasurementDisabled after the GA4 stream's automatic events are off.
// Never add preview hosts to the allowlist. Consent UI is visible for review.
window.GALANOU_ANALYTICS = Object.freeze({
  measurementId: 'G-T62NN6N8ZP',
  productionEnabled: true,
  enhancedMeasurementDisabled: true,
  productionHosts: ['galanouconsulting.com', 'www.galanouconsulting.com']
});
