export interface Application {
  id?: string;
  type: 'language' | 'coding' | 'office-club';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  experience?: string;
  motivation: string;
  preferredLanguages?: string[];
  programmingExperience?: string;
  availability: string[];
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  firstName: string;
  lastName: string;
  createdAt: Date;
}