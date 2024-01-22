export interface AuthRequestBody {
    readonly email: string;
    readonly password: string;
    readonly rememberMe: boolean;
}