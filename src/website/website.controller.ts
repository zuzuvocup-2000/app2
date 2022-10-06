import { Controller, Get, Query } from '@nestjs/common';
import { WebsiteService } from './website.service';

@Controller('website')
export class WebsiteController {
    constructor(private readonly websiteService:WebsiteService) {}
        

    // @Get('invoke-msg')
    // getInvokeMsg(@Query('msg') msg:string){
    //     this.websiteService.sendMessage(msg);
    //     return msg;
    // }
}
