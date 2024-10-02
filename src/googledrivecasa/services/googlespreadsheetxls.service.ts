import { Injectable } from '@nestjs/common';
import { GoogleAutenticarService } from './googleautenticar.service';

@Injectable()
export class GooglespreadsheetxlsService extends GoogleAutenticarService {
   
    public async creaSpreadSheet(){
        const service = this.spreadsheetsxls
  
        const resource = {
            properties: {
              title:"joderrrrrrrrrrrrrrrrrr",
            },
          };
          try {
            const spreadsheet = await service.spreadsheets.create({
              resource,
              fields: 'spreadsheetId',
            });
            console.log(`Spreadsheet ID: ${spreadsheet.data.spreadsheetId}`);
            return spreadsheet.data.spreadsheetId;
          } catch (err) {
            // TODO (developer) - Handle exception
            throw err;
          }
    }
}
