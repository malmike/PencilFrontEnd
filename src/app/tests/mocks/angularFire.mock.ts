import { Subject } from 'rxjs';

export class MockAngularFirestore {
  get id() {
    return '42';
  }

  get firestore() {
    return this;
  }

  add() {
    return this;
  }

  batch() {
    return {
      commit: () => {},
      set: () => {},
      update: () => {},
      delete: () => {},
    };
  }

  collection() {
    return this;
  }

  doc() {
    return this;
  }

  set() {
    return Promise.resolve(this);
  }

  update() {
    return Promise.resolve(this);
  }

  valueChanges() {
    return new Subject();
  }

  subscribe() {
    return new Subject();
  }

  snapshotChanges() {
    return this;
  }

  pipe() {
    return this;
  }

  toPromise() {
    return this;
  }

  get() {
    return {
      data: () => ({
        json: '{"x":1}',
      }),
    };
  }

  where() {
    return this;
  }

  orderBy() {
    return this;
  }

  delete() {
    return Promise.resolve(this);
  }

  createId() {
    return '';
  }
}
