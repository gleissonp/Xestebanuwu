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
  base64File: string = '';

  constructor(private fileService: FileService) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.base64File = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.base64File && this.fileName) {
      // Usar el código para borrar todo de la "," hacia atrás
      const base64File = this.base64File.slice(this.base64File.indexOf(",") + 1);


      this.fileService.upload(base64File, this.folderName, this.fileName).subscribe(
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
