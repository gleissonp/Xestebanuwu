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
    private apiUrl = `${environment.apiUrl}/file/files`;


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
        console.log('Archivo a compartir: ', pk);
        const headers = this.getHeaders();
        const options = { headers: headers };
        return this.http.post(`${this.apiUrl}share/${pk}`, {}, options);
    }

    downloadFile(pk: number): Observable<any> {
        console.log('Archivo a descargar: ', pk);
        const headers = this.getHeaders();
        const options = { headers: headers };
        return this.http.get<any>(`${this.apiUrl}download/${pk}`, options);
    }

    uploadFile(file: File, folderName: string, fileName: string): Observable<any> {
        const formData = new FormData();
        formData.append('folderName', folderName);
        formData.append('fileName', fileName);
        formData.append('fileData', file, file.name);

        const headers = this.getHeaders();
        const options = { headers: headers };

        return this.http.post<any>(`${this.apiUrl}upload/`, formData, options);
    }

    listFilesInFolder(folderName: string): Observable<any[]> {
        const headers = this.getHeaders();
        const options = { headers: headers };

        const body = {
            folder: folderName
        };

        // Realiza la solicitud POST al backend para obtener los archivos y carpetas en la carpeta especificada
        return this.http.post<any[]>(`${this.apiUrl}listFilesInDirectory/`, body, options);
    }

}
