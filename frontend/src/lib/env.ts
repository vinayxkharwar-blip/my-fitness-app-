class EnvError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EnvError';
    }
}

export const validateEnv = () => {
    const requiredEnvs = [
        'VITE_CLERK_PUBLISHABLE_KEY',
        'VITE_API_URL'
    ];

    const missingEnvs = requiredEnvs.filter(
        (envName) => !import.meta.env[envName]
    );

    if (missingEnvs.length > 0) {
        throw new EnvError(
            `Missing required environment variables: ${missingEnvs.join(', ')}.\n` +
            `Please ensure these are set in your .env file.`
        );
    }
    console.log("Environment variables validated successfully.");
};
