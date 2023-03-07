export class Dictionary {
  private sequence: number;

  public readonly entries: Record<string, string>;

  get maxDictId(): number {
    return this.sequence;
  }

  constructor() {
    this.sequence = 0;
    this.entries = {};
  }

  addEntry(namespace: string, str: string): string {
    const key = `DictKey_${namespace}_${this.sequence++}`;
    this.entries[key] = str;
    return key;
  }
}
