export class Project {
  id?: number;
  name?: string;
  description?: string;
  comment?: string;
  step?: string;

  constructor(init: Partial<Project>) {
    Object.assign(this, init);
  }
}