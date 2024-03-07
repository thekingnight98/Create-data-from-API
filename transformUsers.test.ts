import { transformUsers, User } from './testFetchUsers'; // ปรับเส้นทางให้ตรงกับที่ตั้งของไฟล์ที่เก็บฟังก์ชัน transformUsers

// สร้างข้อมูล mock ของ User สำหรับการทดสอบ
const mockUsers: User[] = [
    {
      department: 'Engineering',
      gender: 'Male',
      age: 25,
      hairColor: 'Brown',
      firstName: 'John',
      lastName: 'Doe',
      address: { postalCode: '12345' },
    },
    {
      department: 'Engineering',
      gender: 'Female',
      age: 30,
      hairColor: 'Blond',
      firstName: 'Jane',
      lastName: 'Doe',
      address: { postalCode: '67890' },
    },
    {
      department: 'HR',
      gender: 'Male',
      age: 40,
      hairColor: 'Black',
      firstName: 'Bob',
      lastName: 'Smith',
      address: { postalCode: '54321' },
    },
  ];

// ทดสอบฟังก์ชัน transformUsers
describe('transformUsers', () => {
  it('should correctly transform and group user data by department', () => {
    const result = transformUsers(mockUsers);
    expect(result).toEqual({
      Engineering: {
        male: 1,
        female: 1,
        ageRange: '25-30',
        hair: { Brown: 1, Blond: 1 },
        addressUser: {
          JohnDoe: '12345',
          JaneDoe: '67890',
        },
      },
      HR: {
        male: 1,
        female: 0,
        ageRange: '40-40',
        hair: { Black: 1 },
        addressUser: {
          BobSmith: '54321',
        },
      },
    });
  });
});
