/// <reference types="vite/client" />

interface ImportMetaEnv{
    readonly VITE_OPENAI_KEY:string,
    readonly VITE_SUPABASE_KEY:string,
    readonly VITE_SUPABASE_SERVICE_KEY:string,
    readonly VITE_SECRET_KEY:string,
    readonly VITE_AMAZON_ACCESS_KEY_ID:string,
    readonly VITE_AMAZON_SECRET_ACCESS_KEY:string,
    readonly VITE_SUPABASE_AI_USER_UID:string,
    readonly VITE_SUPABASE_AI_AVATAR:string,
}