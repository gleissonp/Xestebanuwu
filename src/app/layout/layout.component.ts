import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  searchTerm: string = '';
  userEmail: string = '';

  constructor(private searchService: SearchService, public authService: AuthService, private userService: UserService, private router: Router) { }
  openbrowserTab(url: string, windowName: string, width: number, height: number) {
    window.open(url, windowName, `width=${width},height=${height}`);
  }
  onSearchChange(): void {
    this.searchService.setSearchQuery(this.searchTerm);
  }





  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }


}
