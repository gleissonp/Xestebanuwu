import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FileService } from 'src/app/services/file.service';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  [x: string]: any;

  originalFiles: any[] = [];
  files: any[] = [];
  file_path: string | undefined;
  folders: any[] = [];
  filesAndFolders: any[] = [];
  currentFolderName: string = ''; // Propiedad para almacenar el nombre de la carpeta actual

  constructor(private fileService: FileService, private searchService: SearchService, private router: Router) { }

  formatDateTime(dateTimeString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
    };

    const formattedDate = new Date(dateTimeString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  ngOnInit(): void {
    this.searchService.getSearchQuery().subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.filterFiles();
    });
    // Obtener archivos
    this.fileService.getFiles().subscribe(
      (filesData: any[]) => {
        this.originalFiles = filesData;
        this.files = [...this.originalFiles];
        this.updateFilesAndFoldersList();
      },
      (error) => {
        console.error('Error al obtener archivos:', error);
      }
    );

    // Obtener carpetas
    this.fileService.getFolders().subscribe(
      (foldersData: any[]) => {
        this.folders = foldersData;
        this.updateFilesAndFoldersList();
      },
      (error) => {
        console.error('Error al obtener carpetas:', error);
      }
    );
  }

  isFile(item: any): boolean {
    return item.hasOwnProperty('name'); // Verifica si el objeto tiene una propiedad 'name'
  }

  openFolder(folderName: string): void {
    this.fileService.listFilesInFolder(folderName).subscribe(
      (filesData: any[]) => {
        // Filtra las carpetas y archivos para excluir la carpeta actual del listado
        console.log("click");
        this.filesAndFolders = filesData.filter(item => this.isFile(item));
        this.currentFolderName = folderName; // Actualiza el nombre de la carpeta actual
      },
      (error) => {
        console.error('Error al abrir la carpeta:', error);
      }
    );
  }


  updateFilesAndFoldersList() {
    // Filtra las carpetas y archivos para excluir la carpeta actual del listado
    this.filesAndFolders = [...this.files, ...this.folders].filter(item => {
      return this.isFile(item) || (item.name !== this.currentFolderName && !this.isFile(item));
    });
  }

  loadFolders(): void {
    this.fileService.getFolders().subscribe(
      (data: any) => {
        this.folders = data;
        this.filesAndFolders = [...this.files, ...this.folders];
        console.log('Carpetas:', this.folders); // Verifica los datos de las carpetas en la consola
      },
      (error) => {
        console.error('Error al obtener carpetas:', error);
      }
    );
  }

  filterFiles(): void {
    if (this.searchTerm === '') {
      this.files = [...this.originalFiles];
    } else {
      this.files = this.originalFiles.filter(file => {
        return file.name.toLowerCase() === this.searchTerm.toLowerCase();
      });
    }
    // Actualiza filesAndFolders después de filtrar los archivos
    this.updateFilesAndFoldersList();
  }

  delete(pk: string): void {
    this.fileService.deleteFile(pk).subscribe(
      (data) => {
        window.alert("Archivo eliminado correctamente!.");
        window.location.reload();
      },
      (error) => {
        console.error('Error al compartir el archivo:', error);
      }
    );
  }

  share(pk: number): void {
    this.fileService.shareFile(pk).subscribe(
      (data) => {
        this.file_path = data.file_path;
        console.log('Ruta del archivo compartido:', this.file_path);
        window.alert('Ruta del archivo compartido: ' + `http://distribuidos3.bucaramanga.upb.edu.co${this.file_path}`);
      },
      (error) => {
        console.error('Error al compartir el archivo:', error);
      }
    );
  }

  openbrowserTab(url: string, windowName: string, width: number, height: number) {
    window.open(url, windowName, `width=${width},height=${height}`);
  }

  searchTerm: string = '';

  onSearchChange(event: Event): void {
    const searchTerm: string = (event.target as HTMLInputElement).value;
    console.log('Nuevo término de búsqueda:', searchTerm);
    this.searchService.setSearchQuery(searchTerm);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }



}
