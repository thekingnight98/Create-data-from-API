import axios from 'axios';

export interface User {
  department: string;
  gender: string;
  age: number;
  hairColor: string;
  firstName: string;
  lastName: string;
  address: {
    postalCode: string;
  };
}

export interface DepartmentData {
  male: number;
  female: number;
  ageRange: string;
  hair: {
    [color: string]: number;
  };
  addressUser: {
    [name: string]: string;
  };
}

export interface TransformedData {
  [department: string]: DepartmentData;
}


async function fetchUsers(): Promise<User[]> {
  const response = await axios.get('https://dummyjson.com/users');
  return response.data.users as User[];
}

// ฟังก์ชันสำหรับการแปลงข้อมูล
export function transformUsers(users: User[]): TransformedData {
  return users.reduce((acc: TransformedData, user) => {
    const { department, gender, age, hairColor, firstName, lastName, address } = user;
    if (!acc[department]) {
      acc[department] = { male: 0, female: 0, ageRange: `${age}-${age}`, hair: {}, addressUser: {} };
    }

    const departmentData = acc[department];
    departmentData[gender.toLowerCase()] += 1;

    const [minAge, maxAge] = departmentData.ageRange.split('-').map(Number);
    departmentData.ageRange = `${Math.min(minAge, age)}-${Math.max(maxAge, age)}`;

    departmentData.hair[hairColor] = (departmentData.hair[hairColor] || 0) + 1;
    departmentData.addressUser[`${firstName}${lastName}`] = address.postalCode;

    return acc;
  }, {});
}

// เรียกใช้งานฟังก์ชัน fetchUsers และแสดงผลลัพธ์
fetchUsers().then(users => {
  const transformedUsers = transformUsers(users);
  console.log(transformedUsers);
}).catch(error => {
  console.error("Error fetching users:", error);
});
