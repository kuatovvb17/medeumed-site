const fs = require('fs');
const path = require('path');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = getFiles(path.join(__dirname, 'src'));

const replacements = [
  [/bg-\[#111\]/g, 'bg-slate-50'],
  [/border-slate-800/g, 'border-slate-200'],
  [/border-slate-700/g, 'border-slate-200'],
  [/focus:bg-\[#111\]/g, 'focus:bg-white'],
  [/hover:bg-\[#111\]/g, 'hover:bg-slate-100'],
  [/color-scheme-dark/g, 'color-scheme-light'],
  [/color-scheme:dark/g, 'color-scheme:light'],
  [/shadow-\[0_0_10px_rgba\(0,240,255,0\.1\)\]/g, 'shadow-md shadow-sky-100']
];

let changedCount = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  replacements.forEach(([regex, repl]) => {
    content = content.replace(regex, repl);
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedCount++;
    console.log("Converted stage 2:", path.relative(__dirname, file));
  }
});

console.log(`Stage 2: successfully updated ${changedCount} files!`);
