import fs from 'fs';
import path from 'path';

const __dbname = path.join(__dirname, 'databases');

export class Database<Schema = {}> {
  public file: string = path.join(__dbname, 'database.json');

  constructor(file: string) {
    this.file = path.join(__dbname, file);

    if (!fs.existsSync(this.file)) {
      this.save();
    }
  }

  public select() {
    return this.load();
  }

  public insert(data: Schema) {
    const rows = this.load();
    rows.push(data);
    this.save(rows);
    return data;
  }

  public updateByIndex(index: number, data: Schema) {
    const rows = this.load();
    rows[index] = data;
    this.save();
    return data;
  }

  public deleteByIndex(index: number) {
    const rows = this.load();
    rows.splice(index, 1);
    this.save(rows);
  }

  public save(data: Schema[] = []) {
    fs.writeFileSync(this.file, JSON.stringify(data, null, 2));
  }

  public load(): Schema[] {
    try {
      const file = fs.readFileSync(this.file);
      return JSON.parse(file.toString());
    } catch (error) {
      return [];
    }
  }
}
