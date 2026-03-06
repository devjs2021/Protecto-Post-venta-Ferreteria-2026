/**
 * Railway start script - handles Prisma setup and server launch
 */
const { execSync } = require('child_process');

function run(cmd) {
    console.log(`> ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
}

// Debug: show if DATABASE_URL is available
if (process.env.DATABASE_URL) {
    const masked = process.env.DATABASE_URL.replace(/\/\/.*@/, '//***:***@');
    console.log(`DATABASE_URL found: ${masked}`);
} else {
    console.error('ERROR: DATABASE_URL is not set!');
    console.log('Available env vars:', Object.keys(process.env).filter(k =>
        k.includes('DATABASE') || k.includes('POSTGRES') || k.includes('PG')
    ).join(', ') || '(none matching DATABASE/POSTGRES/PG)');

    // Check if Railway provides POSTGRES vars separately
    const pgHost = process.env.PGHOST || process.env.POSTGRES_HOST;
    const pgUser = process.env.PGUSER || process.env.POSTGRES_USER || 'postgres';
    const pgPass = process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD;
    const pgDb = process.env.PGDATABASE || process.env.POSTGRES_DB || 'railway';
    const pgPort = process.env.PGPORT || process.env.POSTGRES_PORT || '5432';

    if (pgHost && pgPass) {
        const constructed = `postgresql://${pgUser}:${pgPass}@${pgHost}:${pgPort}/${pgDb}`;
        console.log(`Constructing DATABASE_URL from individual POSTGRES vars...`);
        process.env.DATABASE_URL = constructed;
    } else {
        console.error('Cannot construct DATABASE_URL either. Exiting.');
        process.exit(1);
    }
}

try {
    run('npx prisma generate');
    run('npx prisma db push --skip-generate');
} catch (e) {
    console.error('Prisma setup failed:', e.message);
    process.exit(1);
}

// Start the server
require('./server.cjs');
