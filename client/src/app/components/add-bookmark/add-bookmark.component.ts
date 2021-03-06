import {Component, OnInit} from '@angular/core';
import {Bookmark} from 'src/app/models/bookmark.model';
import {BookmarkService} from 'src/app/services/bookmark.service';
import {BookmarkStore} from '../../store/bookmark.store';
import {Store} from '@ngrx/store/src/store';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit {
  bookmark: Bookmark = {
    name: '',
    url: '',
    group: ''
  };
  submitted = false;

  constructor(private bookmarkService: BookmarkService, private store: Store<BookmarkStore>) {
  }

  ngOnInit(): void {
  }

  saveBookmark(): void {
    const data = {
      name: this.bookmark.name,
      url: this.bookmark.url,
      group: this.bookmark.group,
    };

    this.store.dispatch({
      type: 'ADD_BOOKMARK',
      payload: data
    });

    this.bookmarkService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newBookmark(): void {
    this.submitted = false;
    this.bookmark = {
      name: '',
      url: '',
      group: '',
    };
  }

}
