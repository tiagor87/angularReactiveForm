export interface Usuario {
  id: number;
  email: string;
  senha?: string;
  roles?: string[];
}
