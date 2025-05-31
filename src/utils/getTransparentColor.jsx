function getTransparentColor(cssVar, opacity = 0.08) {
  const map = {
    "var(--status-positive, #00BF40)": "rgba(0, 191, 64, 0.08)",
    "var(--status-cautionary, #FFA500)": "rgba(255, 165, 0, 0.08)",
    "var(--status-negative, #FF3B30)": "rgba(255, 59, 48, 0.08)",
  };
  return map[cssVar] || "rgba(0, 0, 0, 0.05)";
}

export default getTransparentColor;
