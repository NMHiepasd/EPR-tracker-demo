export function evalComputed(formula, vals) {
  try {
    if (formula.startsWith('SUM(')) {
      const key = formula.slice(4, -1);
      const arr = vals[key];
      if (Array.isArray(arr)) return arr.reduce((s, v) => s + (parseFloat(v) || 0), 0).toFixed(2);
      return '—';
    }
    const expr = formula.replace(/([a-z_]+)/g, (k) => `(parseFloat(vals['${k}'])||0)`);
    // eslint-disable-next-line no-new-func
    const result = new Function('vals', `try{const x=${expr};return isFinite(x)?x.toFixed(2):'—'}catch(e){return '—'}`)(vals);
    return result;
  } catch {
    return '—';
  }
}
