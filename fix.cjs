const fs = require('fs');
const fp = 'C:/Users/jaatg/Desktop/romantic-date-invite/src/components/ChoosePlace.jsx';
let c = fs.readFileSync(fp, 'utf8');
// fix missing </div> before </motion.div>
c = c.replace('              </div>\n          </motion.div>\n          {selectedPlace && (', '              </div>\n            </div>\n          </motion.div>\n          {selectedPlace && (');
// also note there was a corrupted line - check for empty motion.button
c = c.replace(/\n\s*\n\s+className="glow-button/g, '\n                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}\n                  onClick={() => { if(customPlace.trim()) onSelect({ emoji: \'📍\', name: customPlace, custom: true }); }}\n                  className="glow-button');
fs.writeFileSync(fp, c, 'utf8');
console.log('Fixed. Length: ' + c.length);
