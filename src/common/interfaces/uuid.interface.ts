export interface UuuidAdapter{
    get <T>(uuid: string): Promise<T>
    
}