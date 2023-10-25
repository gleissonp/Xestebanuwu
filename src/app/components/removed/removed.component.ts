import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'removed',
  templateUrl: './removed.component.html',
  styleUrls: ['./removed.component.scss']
})
export class RemovedComponent implements OnInit {

  folders: any[] = [];

  constructor(private fileService: FileService, private searchService: SearchService) { }


  ngOnInit(): void {
    this.fileService.getFolders().subscribe(
      (data: any) => {
        this.folders = data;
        console.log(this.folders);
      },
      error => {
        // Manejar errores en la solicitud
        console.error('Error al obtener las folders:', error);
      }
    );
  }

}
