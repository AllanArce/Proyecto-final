export class fileupload {
    key: string;
    name: string;
    url: string;
    file: File;
  
    constructor(key:string, name:string, url:string, file: File) {
        this.key = key;
        this.file = file;
        this.name = name;
        this.url = url;
    }
  }