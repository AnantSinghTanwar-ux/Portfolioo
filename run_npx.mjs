import { spawn } from 'child_process';
import { writeFileSync, appendFileSync } from 'fs';

writeFileSync('debug.log', 'Starting...\n');
const child = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'dev'], { cwd: process.cwd() });
child.stdout.on('data', d => appendFileSync('debug.log', '[OUT] ' + d));
child.stderr.on('data', d => appendFileSync('debug.log', '[ERR] ' + d));
child.on('exit', c => appendFileSync('debug.log', 'Exit: ' + c + '\n'));
setTimeout(() => { appendFileSync('debug.log', 'Timeout\n'); process.exit(0); }, 5000);
