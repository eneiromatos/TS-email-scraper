class DomainModel {
  domainUrl: string;
  emails: Array<string>;

  constructor() {
    this.domainUrl = "";
    this.emails = [];
  }
}

export { DomainModel };
