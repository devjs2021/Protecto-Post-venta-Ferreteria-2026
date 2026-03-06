// Safe prisma generate - sets dummy DATABASE_URL if not present
// This is needed because @prisma/client postinstall runs prisma generate
// which validates the schema and requires DATABASE_URL to exist (not to connect)
if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'postgresql://dummy:dummy@localhost:5432/dummy';
}
require('child_process').execSync('npx prisma generate', {
    stdio: 'inherit',
    env: process.env
});
