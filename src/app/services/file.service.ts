import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    private apiUrl = `${environment.apiUrl}/file/`;


    constructor(private http: HttpClient, private authService: AuthService) { }

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            'authorization': token
        });
    }

    getFiles(): Observable<any> {
        const headers = this.getHeaders();
        const options = { headers: headers };
        return this.http.get<any>(this.apiUrl, options);
    }

    getFolders(): Observable<any> {
        const headers = this.getHeaders();
        const options = { headers: headers };
        return this.http.get<any>(`${this.apiUrl}folders`, options);
    }

    deleteFile(pk: string): Observable<any> {
        const headers = this.getHeaders();
        const options = { headers: headers };
        return this.http.delete<any>(`${this.apiUrl}delete/${pk}`, options);
    }


    shareFile(pk: number): Observable<any> {
        console.log('Compartir: ', pk);
        const headers = this.getHeaders();
        const options = { headers: headers };
        return this.http.post(`${this.apiUrl}share/${pk}`, {}, options);
    }

    downloadFile(pk: number): Observable<any> {
        console.log('Descargar: ', pk);
        const headers = this.getHeaders();
        const options = { headers: headers };
        return this.http.get<any>(`${this.apiUrl}download/${pk}`, options);
    }

    upload(file: string, folderName: string, fileName: string): Observable<any> {
        
        const data = {
            
            folderName:folderName,
            fileName:fileName,
            fileData:file,
            

            
        };
        console.log(file);
        
        const headers = this.getHeaders();
        const options = { headers: headers };
        

        

        return this.http.post<any>(`${this.apiUrl}upload`, data,options);
    }
/*
    listFilesInFolder(folderName: string): Observable<any[]> {
        const headers = this.getHeaders();
        const options = { headers: headers };

        const body = {
            folder: folderName
        };
        console.log("click dentro file.service");

        // Realiza la solicitud POST al backend para obtener los archivos y carpetas en la carpeta especificada
        return this.http.get<any[]>(`${this.apiUrl}listFilesInDirectory/`, body, options);
    }
    */

    listFilesInFolder(folderName: string): Observable<any[]> {
        const headers = this.getHeaders();
        const options = { headers: headers };
      
        const url = `${this.apiUrl}listFilesInDirectory/${folderName}`;
      
        console.log("click dentro file.service");
        console.log(options.headers.get('Authorization'));
        console.log(options.headers.get('Authorization'));

        console.log(options.headers.get('Authorization'));
        console.log(options.headers.get('Authorization'));


      
        return this.http.get<any[]>(url, options);
      }
      

}
