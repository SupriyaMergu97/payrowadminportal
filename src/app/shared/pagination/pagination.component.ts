import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() totalItems: number;
  @Input() itemsPerPage: number;
  @Input() maxPagesToShow: number = 5;
  @Input() displayStyle: 'basic' | 'rounded' | 'outlined' = 'basic';
  @Output() pageChange = new EventEmitter<number>();

  currentPage: number = 1;

  onPageChange(page: number) {
    this.currentPage = page;
    this.pageChange.emit(page);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.onPageChange(this.currentPage + 1);
    }
  }
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const maxPagesToShow = this.maxPagesToShow;

    let startPage: number, endPage: number;
    if (totalPages <= maxPagesToShow) {
      // Less than or equal to the maximum pages to show, display all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // More pages than the maximum to show, calculate start and end pages
      const halfPagesToShow = Math.floor(maxPagesToShow / 2);
      if (currentPage <= halfPagesToShow) {
        // Current page near the start, display first maxPagesToShow pages
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + halfPagesToShow >= totalPages) {
        // Current page near the end, display last maxPagesToShow pages
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        // Current page somewhere in the middle, display pages around it
        startPage = currentPage - halfPagesToShow;
        endPage = currentPage + halfPagesToShow;
      }
    }

    return Array(endPage - startPage + 1).fill(0).map((x, i) => startPage + i);
  }
}
