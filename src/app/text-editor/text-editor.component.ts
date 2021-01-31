import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

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

export class TextEditorComponent implements OnInit, AfterViewInit{

  editor: any;
  @ViewChild('editable', { static: true }) editable?: ElementRef<HTMLElement>;
  initialValues: string = '';

  constructor() {

  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initialiseMediumEditor();
    this.writeValueToEditor(this.initialValues);
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
        console.log(value);
      });
  }

  writeValueToEditor(value: string) {
    if (this.editable) {
      if (value && value != "") {
        this.editor.elements[0].value = value;
        this.editor.elements[0].innerHTML = (value);
        this.editor.elements[0].setAttribute("data-placeholder", "");
      } else {
        this.editor.elements[0].value = null;
        this.editor.elements[0].innerHTML = "";
        this.editor.elements[0].setAttribute("data-placeholder", "Type your text");
      }
    }
  }
}
