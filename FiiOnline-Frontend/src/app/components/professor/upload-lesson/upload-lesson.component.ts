import {Component, EventEmitter, OnInit} from '@angular/core';
import {LessonModel} from '../../../models/lessonmodel';
import {DataService} from '../../../services/data.service';
import {Renderer2} from '@angular/core';
import {MaterializeAction} from 'angular2-materialize';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-upload-lesson',
  templateUrl: './upload-lesson.component.html',
  styleUrls: ['./upload-lesson.component.scss', '../../../app.component.scss']
})
export class UploadLessonComponent implements OnInit {

  public model = new LessonModel();
  public mouseOvered = false;
  private allFiles = new Array();
  public fileName: string;
  private event;
  private files_on_server = {};
  private lesson_id;
  private weekId; //from sesion storage
  public lectureExists = false;
  public seminarExists = false;
  public homeworkExists = false;
  public onEdit = false;
  public onDelete = false;
  public modalHeader: string;
  public modalText: string;

  modalActions = new EventEmitter<string | MaterializeAction>();
  public toolbar = [
    ['bold', 'italic', 'underline', 'strikeThrough', 'superscript', 'subscript'],
    ['fontName', 'fontSize', 'color'],
    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'indent', 'outdent'],
    ['cut', 'copy', 'delete', 'removeFormat', 'undo', 'redo'],
    ['paragraph', 'blockquote', 'removeBlockquote', 'horizontalLine', 'orderedList', 'unorderedList'],
    ['link', 'unlink'],
    ['code']
  ];

  constructor(private dataService: DataService, private renderer: Renderer2, private route: ActivatedRoute, private location: Location) {
  }



  ngOnInit() {
    this.weekId = sessionStorage.getItem('weekId');
    if (this.weekId !== null) {
      this.setupRadioButtons(this.weekId);
    }
    this.route.params.subscribe(params => {
      this.lesson_id = params['id'];
      if (this.lesson_id !== undefined) {
        this.onEdit = true;
        this.dataService.fetchData(`http://localhost:63944/Lessons/${this.lesson_id}`).subscribe(response => {
            console.log(response);
            this.model.title = response.title;
            this.model.description = response.description;
            this.weekId = response.weekId;
            this.model.type = response.type;
            this.setupRadioButtons(this.weekId);
            for (let file of response.fileDtos) {
              this.files_on_server[file.fileName] = file.filePath;
              this.showFile(file.fileName);
            }
          },
          err => {
            console.log(err);
          }
        );
      }
      ;
    });
  }

  setupRadioButtons(weekId) {
    if (this.model.type !== '') {
      this.renderer.setAttribute(document.getElementById(this.model.type), 'checked', '');
    }
    this.dataService.fetchData(`http://localhost:63944/Weeks/${weekId}`).subscribe(response => {
        console.log(response, this.model.type);
        let resources = response.resourcesDtos;
        if (resources[0] !== null && this.model.type !== 'Lecture') {
          this.lectureExists = true;
        }
        if (resources[1] !== null && this.model.type !== 'Seminar') {
          this.seminarExists = true;
        }
        if (resources[2] !== null && this.model.type !== 'Homework') {
          this.homeworkExists = true;
        }
      },
      err => {
      }
    );
  }

  setType(type) {
    this.model.type = type;
  }


  onDragOver(event) {
    event.preventDefault();
    document.getElementById('drop-zone').classList.add('drop-zone-hover');
  }

  onDragLeave(event) {
    event.preventDefault();
    console.log(event);
    document.getElementById('drop-zone').classList.remove('drop-zone-hover');
  }

  onDrop(event) {
    console.log('am dat drop');
    event.preventDefault();
    event.stopPropagation();
    console.log(event);
    document.getElementById('drop-zone').classList.remove('file-drag-over');
    document.getElementById('drop-zone').classList.add('file-dropped');
    let files = event.target.files || (event.dataTransfer ? event.dataTransfer.files : event.originalEvent.dataTransfer.files);
    for (let file of files) {
      this.allFiles.push(file);
      this.showFile(file.name);
    }
  }

  showFile(file) {
    let file_extension = file.split('.').pop();
    let div = this.renderer.createElement('div');
    this.renderer.setAttribute(div, 'class', 'file-box');
    this.renderer.setAttribute(div, 'id', file);

    let p = this.renderer.createElement('p');
    this.renderer.setAttribute(p, 'class', 'file-name truncate');
    let p_content = document.createTextNode(file);
    p.appendChild(p_content);

    let i = this.renderer.createElement('i');
    switch (file_extension) {
      case 'ppt':
        this.renderer.setAttribute(i, 'class', 'far fa-file-powerpoint file-icon');
        break;
      case 'pptx':
        this.renderer.setAttribute(i, 'class', 'far fa-file-powerpoint file-icon');
        break;
      case 'doc':
        this.renderer.setAttribute(i, 'class', 'far fa-file-word file-icon');
        break;
      case 'docx':
        this.renderer.setAttribute(i, 'class', 'far fa-file-word file-icon');
        break;
      case 'xlsx':
        this.renderer.setAttribute(i, 'class', 'far fa-file-excel file-icon');
        break;
      case 'xlsm':
        this.renderer.setAttribute(i, 'class', 'far fa-file-excel file-icon');
        break;
      case 'pdf':
        this.renderer.setAttribute(i, 'class', 'far fa-file-pdf file-icon');
        break;
      default:
        this.renderer.setAttribute(i, 'class', 'far fa-file-alt file-icon');
        break;
    }


    let p_delete = this.renderer.createElement('p');
    this.renderer.setAttribute(p_delete, 'class', 'delete');
    this.renderer.listen(p_delete, 'click', (event) => {
      this.onDelete = true;
      this.openModal(event);
    });
    let p_delete_text = document.createTextNode('Delete');
    p_delete.appendChild(p_delete_text);

    div.appendChild(i);
    div.appendChild(p);
    div.appendChild(p_delete);
    document.getElementById('display-uploaded-files').appendChild(div);

  }

  deleteFile() {
    let filename = this.fileName;
    let files_uploaded_now = this.allFiles.map(function (element) {
      return element.name;
    });
    console.log(files_uploaded_now);
    if (files_uploaded_now.includes(filename)) {
      this.allFiles = this.allFiles.filter(function (element) {
        return element.name !== filename;
      });

    } else {
      this.dataService.putData('http://localhost:63944/Lessons/delete-file', {
        fileName: filename,
        filePath: this.files_on_server[filename],
        lessonId: this.lesson_id
      }).subscribe(response => {
        },
        err => {
          console.log(err);
        });
    }

    this.renderer.removeChild(this.renderer.parentNode(this.event.path[1]), this.event.path[1]);
    this.closeModal();


  }


  openModal(event) {
    this.event = event;
    this.fileName = event.path[1].id;
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }

  onSubmit() {
    this.onDelete = false;
    this.model.files.append('title', this.model.title);
    this.model.files.append('description', this.model.description);
    this.model.files.append('weekId', this.weekId);
    this.model.files.append('type', this.model.type);


    console.log(this.model);

    for (let file of this.allFiles) {
      this.model.files.append('files', file);
    }

    if (this.onEdit) {
      this.dataService.putData(`http://localhost:63944/Lessons/${this.lesson_id}`, this.model.files).subscribe(response => {
          this.modalHeader = 'Lesson updated!';
          this.modalText = 'The lesson has been updated successfully';
          this.modalActions.emit({action: 'modal', params: ['open']});
          setTimeout((router: Router) => {
            this.closeModal();
            this.location.back();
          }, 1500);
        },
        err => {
          this.modalHeader = 'Ooops, something went wrong!';
          this.modalText = 'The lesson could not be updated. Please try again later!';
          this.modalActions.emit({action: 'modal', params: ['open']});
          setTimeout((router: Router) => {
            this.closeModal();
            this.location.back();
          }, 1500);
        }
      );
    } else {
      this.dataService.postData('http://localhost:63944/Lessons', this.model.files).subscribe(response => {
          this.modalHeader = 'Lesson created!';
          this.modalText = 'The lesson has been created successfully';
          this.modalActions.emit({action: 'modal', params: ['open']});
          setTimeout((router: Router) => {
            this.closeModal();
            this.location.back();
          }, 1500);
        },
        err => {
          this.modalHeader = 'Ooops, something went wrong!';
          this.modalText = 'The lesson could not be created. Please try again later!';
          this.modalActions.emit({action: 'modal', params: ['open']});
          setTimeout((router: Router) => {
            this.closeModal();
            this.location.back();
          }, 1500);
        }
      );
    }
  }

}
