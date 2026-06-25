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
  [/bg-\[#050505\]/g, 'bg-[#F8FAFC]'],
  [/bg-\[#0a0a0a\]/g, 'bg-white'],
  [/bg-\[#0A0A0A\]/g, 'bg-white'],
  [/bg-slate-900\/60/g, 'bg-white/80'],
  [/bg-slate-900\/80/g, 'bg-white/90'],
  [/bg-slate-900\/90/g, 'bg-white/95'],
  [/bg-slate-900\/50/g, 'bg-slate-50'],
  [/bg-slate-900/g, 'bg-white'],
  [/bg-slate-950\/80/g, 'bg-slate-50'],
  [/bg-slate-950/g, 'bg-slate-50'],
  [/text-white/g, 'text-slate-900'],
  [/text-slate-400/g, 'text-slate-600'],
  [/text-slate-300/g, 'text-slate-700'],
  [/text-slate-200/g, 'text-slate-800'],
  [/border-white\/10/g, 'border-slate-200'],
  [/border-white\/5/g, 'border-slate-100'],
  [/border-white\/20/g, 'border-slate-300'],
  [/text-\[#00F0FF\]/g, 'text-sky-600'],
  [/bg-\[#00F0FF\]/g, 'bg-sky-600'],
  [/from-\[#00F0FF\]/g, 'from-sky-600'],
  [/to-\[#0044FF\]/g, 'to-teal-600'],
  [/bg-\[#0044FF\]/g, 'bg-sky-600'],
  [/border-\[#00F0FF\]\/30/g, 'border-sky-200'],
  [/border-\[#00F0FF\]\/20/g, 'border-sky-100'],
  [/border-emerald-500\/20/g, 'border-slate-200'],
  [/border-emerald-500\/10/g, 'border-slate-100'],
  [/border-emerald-500\/30/g, 'border-slate-300'],
  [/border-emerald-500\/40/g, 'border-sky-300'],
  [/shadow-\[0_0_15px_rgba\(0,0,0,0\.5\)\]/g, 'shadow-lg shadow-slate-100'],
  [/shadow-\[0_0_30px_rgba\(0,0,0,0\.5\)\]/g, 'shadow-xl shadow-slate-100'],
  [/shadow-\[0_0_20px_rgba\(0,0,0,0\.3\)\]/g, 'shadow-md shadow-slate-100'],
  [/shadow-\[0_0_50px_rgba\(16,185,129,0\.1\)\]/g, 'shadow-xl shadow-slate-200/50'],
  [/shadow-\[0_0_30px_rgba\(16,185,129,0\.05\)\]/g, 'shadow-lg shadow-slate-100'],
  [/placeholder-slate-600/g, 'placeholder-slate-400'],
  [/\[color-scheme:dark\]/g, '[color-scheme:light]'],
  [/hover:text-white/g, 'hover:text-sky-600']
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
    console.log("Converted:", path.relative(__dirname, file));
  }
});

console.log(`Successfully converted ${changedCount} files to Premium Clean Light Theme!`);
