import { spawn } from 'child_process';
console.log('Starting npm run dev');
const child = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'dev'], { cwd: process.cwd() });
child.stdout.on('data', (d) => process.stdout.write('[OUT] ' + d));
child.stderr.on('data', (d) => process.stderr.write('[ERR] ' + d));
child.on('exit', (c) => console.log('Exited', c));
setTimeout(() => { console.log('Timeout reached'); process.exit(0); }, 10000);
