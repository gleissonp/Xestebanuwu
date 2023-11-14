import { Component } from '@angular/core';
import { FolderService } from '../../services/folder.service';

@Component({
  selector: 'folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent {
  
  
  folderName: string = '';

  constructor(private folderService: FolderService) { }

  

  onSubmit(): void {
    if (this.folderName ) {
      console.log(this.folderName);
      
      this.folderService.uploadFile(this.folderName,).subscribe(
        response => {
          window.alert('Carpeta creada exitosamente.');
          console.log('Carpeta creada exitosamente.', response);
          window.close();
          window.location.reload();
        },
        error => {
          window.alert('Error al crear la carpeta.');
          console.error('Error al crear la carpeta.', error);
        }
      );
    } else {
      window.alert('Por favor, selecciona un archivo, proporciona un nombre antes de subirlo.');
      console.error('Por favor, selecciona un archivo, proporciona un nombre antes de subirlo.');
    }
  }


}
