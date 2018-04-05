import {Component, ElementRef, EventEmitter, OnInit} from '@angular/core';
import {LessonModel} from '../../../models/lessonmodel';
import {Credentials} from '../../../models/credentials';
import {DataService} from '../../../services/data.service';
import {HttpHeaders} from '@angular/common/http';
import {Renderer2} from '@angular/core';
import {split} from 'ts-node/dist';
import {MaterializeAction, MaterializeDirective, MaterializeModule} from 'angular2-materialize';
import {ActivatedRoute, Router} from '@angular/router';

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

  modalActions = new EventEmitter<string | MaterializeAction>();


  constructor(private dataService: DataService, private renderer: Renderer2, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.lesson_id = params['id'];
      if (this.lesson_id !== undefined) {
        this.dataService.fetchData(`http://localhost:63944/Lessons/${this.lesson_id}`).subscribe(response => {
            console.log(response);
            this.model.title = response.title;
            this.model.description = response.description;
            this.model.date = response.date;
            //dictionary of fileName/filePath of files on server
            for (let file_name of response.filesNames) {
              for (let file_path of response.filesPaths) {
                if (file_path.includes(file_name.substring(0, file_name.lastIndexOf('.')))) {
                  this.files_on_server[file_name] = file_path;
                }
              }
              this.showFile(file_name);
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

    // let div_file_elements = this.renderer.createElement('div');
    // this.renderer.setAttribute(div_file_elements, 'class', 'tooltip');

    let p = this.renderer.createElement('p');
    this.renderer.setAttribute(p, 'class', 'file-name tooltipped');
    let p_content = document.createTextNode((file.length > 25) ? `${file.substring(0, 25)}...` : file);
    p.appendChild(p_content);

    // let span = this.renderer.createElement('span');
    // this.renderer.setAttribute(span, 'class', 'tooltiptext');
    // let span_text = document.createTextNode(file);
    // span.appendChild(span_text);

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
      this.openModal(event);
    });
    let p_delete_text = document.createTextNode('Delete');
    p_delete.appendChild(p_delete_text);


    // div_file_elements.appendChild(i);
    // div_file_elements.appendChild(span);
    // // div_file_elements.appendChild(br);
    // div_file_elements.appendChild(p);

    div.appendChild(i);
    // div.appendChild(span);
    div.appendChild(p);
    // div.appendChild(div_file_elements);
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

  createProgressBar() {
    let child_div = this.renderer.createElement('div');
    child_div.setAttribute('class', 'determinate');
    child_div.setAttribute('style', 'width: 70%');
    let parent_div = this.renderer.createElement('div');
    parent_div.setAttribute('class', 'progress');
    parent_div.appendChild(child_div);
    return parent_div;
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
    this.model.files.append('title', this.model.title);
    this.model.files.append('description', this.model.description);
    this.model.files.append('courseId', '02a69dc4-64fe-4cbc-85a4-6f207207a9fb');
    // this.model.files.append('date', this.model.date);

    console.log(this.model);

    for (let file of this.allFiles) {
      this.model.files.append('files', file);
    }

    if (this.lesson_id !== undefined) {
      this.dataService.putData(`http://localhost:63944/Lessons/${this.lesson_id}`, this.model.files).subscribe(response => {
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.dataService.postData('http://localhost:63944/Lessons', this.model.files).subscribe(response => {
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
