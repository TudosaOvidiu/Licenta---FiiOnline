import {Component, EventEmitter, OnInit} from '@angular/core';
import {UserModel} from '../../../models/usermodel';
import {DataService} from '../../../services/data.service';
import {MaterializeAction} from 'angular2-materialize';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import * as firebase from 'firebase';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {Observable} from 'rxjs/Observable';
import {async} from 'rxjs/scheduler/async';


declare var jquery: any;

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss', '../../../app.component.scss']
})
export class UserRegisterComponent implements OnInit {
  passwordsMatch = true;
  public model: UserModel = new UserModel();
  public modalHeader: string;
  public modalText: string;
  public register_professor = false;
  public isAdmin = true;
  public editStudent = false;
  public editProf = false;
  private user;
  public registerUser = true;

  private file: File;
  public imageAvailable = false;
  public imageStored = false;

  private task: AngularFireUploadTask;
  public downloadURL: Observable<string>;

  constructor(private dataService: DataService, private router: Router, private location: Location, private storage: AngularFireStorage) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('user') === null || JSON.parse(sessionStorage.getItem('user')).role === 'Student') {
      this.isAdmin = false;
    }
    if (this.router.url === '/register-professor') {
      this.register_professor = true;
      this.registerUser = false;
    }
    if (this.router.url === '/edit-profile') {
      this.editStudent = true;
      this.registerUser = false;

      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.model.firstName = this.user.firstName;
      this.model.lastName = this.user.lastName;
      this.model.email = this.user.email;
      this.model.year = this.user.year;
      this.model.semester = this.user.semester;
      this.model.imageURL = this.user.imageURL;
      console.log(this.model.imageURL);
      if (this.model.imageURL !== '' && this.model.imageURL !== null) {
        this.imageStored = true;
      }
    }
    if (this.router.url === '/edit-prof-profile') {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.editProf = true;
      this.registerUser = false;

      this.model.firstName = this.user.firstName;
      this.model.lastName = this.user.lastName;
      this.model.email = this.user.email;
      this.model.imageURL = this.user.imageURL;
      if (this.model.imageURL !== '' && this.model.imageURL !== null) {
        this.imageStored = true;
      }
    }
  }

  comparePasswords(model: UserModel) {
    if (model.password !== '' && model.confirmPassword !== '') {
      if (model.password === model.confirmPassword) {
        this.passwordsMatch = true;
        return;
      }
      this.passwordsMatch = false;
      return;
    }
    this.passwordsMatch = true;
    return;
  }

  uploadProfilePicture(event: any) {
    this.file = event.target.files[0];

    if (this.file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type');
      return;
    }

    const reader = new FileReader();
    this.imageStored = false;
    this.imageAvailable = true;
    reader.onload = function (e: any) {
      document.getElementById('image-preview').setAttribute('src', e.target.result);
    };
    reader.readAsDataURL(this.file);

    const path = `pictures/${new Date().getTime()}_${this.file.name}`;
    this.task = this.storage.upload(path, this.file);
    this.task.downloadURL().subscribe(async url => {
      console.log('asserting image');
      this.model.imageURL = await url;
    });


  }


  onSubmit(model: UserModel) {

    console.log(this.model.imageURL);
    if (this.editStudent) {
      this.dataService.putData(`http://localhost:63944/Users/update-student/${this.user.id}`, this.model).subscribe(response => {
          this.user.firstName = this.model.firstName;
          this.user.lastName = this.model.lastName;
          this.user.email = this.model.email;
          this.user.year = this.model.year;
          this.user.semester = this.model.semester;
          this.user.imageURL = this.model.imageURL;
          sessionStorage.removeItem('user');
          sessionStorage.setItem('user', JSON.stringify(this.user));

          this.modalHeader = 'Profile updated';
          this.modalText = 'Your profile was updated successfully.';
          this.openModal();
        },
        err => {
          this.modalHeader = 'Ooops, something went wrong!';
          this.modalText = 'Your profile could not be updated. Please try again later!';
          this.openModal();
        });
    } else if (this.editProf) {
      this.model.semester = 2;
      console.log(this.model);
      this.dataService.putData(`http://localhost:63944/Users/update-professor/${this.user.id}`, this.model).subscribe(response => {
          this.user.firstName = this.model.firstName;
          this.user.lastName = this.model.lastName;
          this.user.email = this.model.email;
          this.user.imageURL = this.model.imageURL;
          sessionStorage.removeItem('user');
          sessionStorage.setItem('user', JSON.stringify(this.user));

          this.modalHeader = 'Profile updated';
          this.modalText = 'Your profile was updated successfully.';
          this.openModal();
        },
        err => {
          this.modalHeader = 'Ooops, something went wrong!';
          this.modalText = 'Your profile could not be updated. Please try again later!';
          this.openModal();
        });
    } else {
      console.log("i'm in elese");
      this.model.role = 'Student';
      if (this.register_professor) {
        this.model.role = 'Professor';
        this.model.year = '';
        this.model.semester = 0;
      }
      console.log(this.model);
      this.dataService.postData('http://localhost:63944/Account/register', this.model).subscribe(response => {
          this.modalHeader = 'Registration succeeded';
          this.modalText = 'Your account was created. Please check your email to confirm your account!';
          // this.openModal();
        },
        err => {
          this.modalHeader = 'Registration failed';
          this.modalText = 'Something went wrong! Please try again!';
          // this.openModal();
        }
      );
    }
  }

  modalActions = new EventEmitter<string | MaterializeAction>();

  openModal() {
    this.modalActions.emit({action: 'modal', params: ['open']});
    setTimeout((router: Router) => {
      this.closeModal();
      this.location.back();
    }, 2000);
  }

  closeModal() {
    this.modalActions.emit({action: 'modal', params: ['close']});
  }


}
