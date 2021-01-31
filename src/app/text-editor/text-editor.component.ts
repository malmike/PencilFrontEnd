import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
import { TextDocService } from '../services/text-doc.service';

declare const MediumEditor: any;

const BUTTONS = ['bold', 'italic', 'underline', 'subscript', 'superscript', 'anchor', 'quote', 'pre', 'orderedlist', 'unorderedlist', 'indent', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const editorConfig = {
  paste: {
    forcePlainText: false,
    cleanPastedHTML: true,
    cleanReplacements: [],
    cleanAttrs: ['class', 'style', 'dir', 'name'],
    cleanTags: ['meta'],
    unwrapTags: []
  },
  toolbar: {
    allowMultiParagraphSelection: true,
    buttons: BUTTONS,
    diffLeft: 0,
    diffTop: -10,
    firstButtonClass: 'medium-editor-button-first',
    lastButtonClass: 'medium-editor-button-last',
    relativeContainer: null,
    standardizeSelectionStart: false,
    static: false,
    /* options which only apply when static is true */
    align: 'center',
    sticky: false,
    updateOnEmptySelection: false
  }
};
@Component({
  selector: 'text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})

export class TextEditorComponent implements OnInit, AfterViewInit, OnDestroy{

  editor: any;
  @ViewChild('editable', { static: true }) editable?: ElementRef<HTMLElement>;
  @ViewChild('result', { static: true }) result?: ElementRef<HTMLElement>;
  initialValues: string = '';
  subscription: Subscription = new Subscription();
  docId: string = '';
  loading = false;

  constructor(
    private textDocService: TextDocService,
    private angularFirestore: AngularFirestore,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.textDocService.getLatestTextDoc().subscribe(textDoc => {
      if (this.result)
        this.result.nativeElement.innerHTML = textDoc.textDoc;
      this.writeValueToEditor(textDoc.textDoc);
      this.docId = textDoc.docId ? textDoc.docId : this.angularFirestore.createId();
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.initialiseMediumEditor();
    this.mediumEditorChanged();
  }

  initialiseMediumEditor() {
    if(this.editable)
      this.editor = new MediumEditor(this.editable.nativeElement, editorConfig);
  }

  mediumEditorChanged() {
    if (this.editor)
      this.editor.subscribe('editableInput',  (event: any, editable: any)=> {
        let value = this.editor.elements[0].innerHTML;
        this.textDocService.addTextDoc(value, this.docId);
      });
  }

  writeValueToEditor(value: string) {
    if (this.editable && this.loading) {
      this.loading = false;
      if (value && value != "") {
        this.editor.elements[0].value = value;
        this.editor.elements[0].innerHTML = value;
        this.editor.elements[0].setAttribute("data-placeholder", "");
      } else {
        this.editor.elements[0].value = null;
        this.editor.elements[0].innerHTML = "";
        this.editor.elements[0].setAttribute("data-placeholder", "Type your text");
      }
    }
  }
}
