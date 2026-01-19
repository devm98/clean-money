export const ICON_MAPPER: Record<string, string> = {
  "ăn uống": "🍔",
  "ăn sáng": "🍳",
  "ăn trưa": "🍱",
  cafe: "☕",
  "đồ uống": "🥤",
  "điện tử": "💻",
  "mua sắm": "🛍️",
  "xe cộ": "🚗",
  "nhà cửa": "🏠",
  lương: "💵",
  "thanh toán": "💳",
  "mặc định": "📦",
};

export const getBestIcon = (name: string) => {
  const normalized = name.toLowerCase();
  return ICON_MAPPER[normalized] || ICON_MAPPER["mặc định"];
};
