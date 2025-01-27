export async function generateResetToken() {
    const randomBytes = crypto.getRandomValues(new Uint8Array(16)); 
    return Buffer.from(randomBytes).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 16); 
}
export function resetTokenExpiration() {
    // countdown 1 hour from current time
        return new Date(Date.now() + 3600000);
    }