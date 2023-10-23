module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": require("postcss-nesting"),
    tailwindcss: {},
    "postcss-preset-env": {
      features: {
        "nesting-rules": false,
      },
    },
  },
};
