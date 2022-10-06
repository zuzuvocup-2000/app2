import {IsNotEmpty, IsNumberString} from 'class-validator';
export class StoreThreadDto{
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    @IsNumberString()
    number: number;
}