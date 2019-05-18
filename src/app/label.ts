export class Label {
  id: number;
  name: string;
  selected: boolean;
}

export const LABELS: Label[] = [
  {id: 0, name: 'DATE', selected: true},
  {id: 1, name: 'PERSON', selected: true},
  {id: 2, name: 'ORG', selected: true}
];
