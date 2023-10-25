import { Component } from '@angular/core';
import { FileService } from '../services/file.service';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent {
  selectedFile: File | null = null;
  fileName: string = '';
  folderName: string = '';

  constructor(private fileService: FileService) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.selectedFile && this.fileName) {
      console.log(this.selectedFile);
      this.fileService.uploadFile(this.selectedFile!, this.folderName, this.fileName).subscribe(
        response => {
          window.alert('Archivo subido exitosamente.');
          console.log('Archivo subido exitosamente.', response);
          window.close();
          window.location.reload();
        },
        error => {
          window.alert('Error al subir el archivo.');
          console.error('Error al subir el archivo.', error);
        }
      );
    } else {
      window.alert('Por favor, selecciona un archivo, proporciona un nombre antes de subirlo.');
      console.error('Por favor, selecciona un archivo, proporciona un nombre antes de subirlo.');
    }
  }


}
