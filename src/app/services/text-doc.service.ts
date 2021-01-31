import { Injectable } from "@angular/core";
import firebase from "firebase/app";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { FirebaseService } from "./firebase.service";
import { TextDoc } from "../models/text-doc.model";

@Injectable({
  providedIn: 'root'
})
export class TextDocService{
  constructor(
    private firebaseService: FirebaseService,
    private angularFirestore: AngularFirestore,
  ) { }

  addTextDoc(doc: string, docId: string) {
    const data = {
      docId: docId,
      textDoc: doc,
      updatedAt: firebase.firestore.Timestamp.now()
    };

    this.angularFirestore.collection(this.firebaseService.pathTextDocs).doc(docId).set(
      data, { merge: true }
    );
  }

  getLatestTextDoc() {
    return this.angularFirestore
      .collection<TextDoc>(
        this.firebaseService.pathTextDocs,
        ref => ref.orderBy('updatedAt', 'desc').limit(1),
      )
      .valueChanges()
      .pipe(
        map((textDoc: TextDoc[]) => {
          return textDoc[0]
        })
      )
  }
}
