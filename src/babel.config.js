module.exports = {
    presets: [
      '@babel/preset-env', 
      {targets: {node: 'current'}},       // Transpile modern JavaScript (ES6+)
      '@babel/preset-react',      // Handle JSX syntax
      '@babel/preset-typescript'  // Support TypeScript syntax
    ]
  };
  