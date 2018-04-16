import {Component, OnInit, Input, Renderer2} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';
import {DataService} from '../../../services/data.service';
import {HttpHeaders} from '@angular/common/http';
import {saveAs} from 'file-saver/FileSaver';

@Component({
  selector: 'app-material-generic',
  templateUrl: './material-generic.component.html',
  styleUrls: ['./material-generic.component.scss']
})
export class MaterialGenericComponent implements OnInit {

  constructor(private renderer: Renderer2, private dataService: DataService) {
  }

  @Input() material;

  ngOnInit() {
    console.log(this.material.id);
    let div = document.getElementById('files');
    this.renderer.removeAttribute(div, 'id');
    this.renderer.setAttribute(div, 'id', this.material.id);
    for (let file of this.material.fileDtos) {
      this.showFile(file.fileName, file.id);
    }
  }


  showFile(file, file_id) {
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
    // ----------------------
    let p_preview = this.renderer.createElement('p');
    this.renderer.setAttribute(p_preview, 'class', 'file_button');
    this.renderer.listen(p_preview, 'click', (event) => {
      this.dataService.fetchFile(`http://localhost:63944/Lessons/download-file/${file_id}`).subscribe(response => {
          console.log(event);
          console.log(file);

          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(response, file);
          } else {
            // let file_name = event.path[1].id;
            let fileURL = URL.createObjectURL(response);
            window.open(fileURL);
          }

          // saveAs(response, file_name);
        },
        err => {
          console.log(err);
        }
      );
    });
    let p_preview_text = document.createTextNode('PREVIEW');
    p_preview.appendChild(p_preview_text);
    // -------------------------

    let p_download = this.renderer.createElement('p');
    this.renderer.setAttribute(p_download, 'class', 'file_button');
    this.renderer.listen(p_download, 'click', (event) => {
      this.dataService.fetchFile(`http://localhost:63944/Lessons/download-file/${file_id}`).subscribe(response => {
          saveAs(response, file);
        },
        err => {
          console.log(err);
        }
      );
    });
    let p_download_text = document.createTextNode('DOWNLOAD');
    p_download.appendChild(p_download_text);

    div.appendChild(i);
    div.appendChild(p);
    div.appendChild(p_preview);
    div.appendChild(p_download);
    document.getElementById(this.material.id).appendChild(div);

  }

}
