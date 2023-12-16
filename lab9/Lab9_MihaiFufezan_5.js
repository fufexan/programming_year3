/*
5. Să se completeze clasa cu metode setter pt. atributele nume, prenume și data_nasterii. Se vor trata
exceptiile date de:
- siruri de caractere cu lungimea mai mică decât 2 sau care conțin caractere numerice;
- date de naștere mai recente de 18 ani.
Excepțiile se tratează prin setarea unor valori implicite și afișarea unor mesaje în consola browser-ului.
*/

let setName = (name, obj, prop) => {
  try {
    if (name.length < 2) {
      throw "Name cannot have less than 2 characters!";
    } else if (!/^[a-zA-Z]*$/.test(name)) {
      throw "Name cannot have numbers!";
    }

    obj[prop] = name;
  } catch (err) {
    console.log(err);
  }
};

let calculateAge = (date) => {
  let age = Date.now() - date.getTime();

  return (new Date(age).getUTCFullYear() - 1970);
};

class Student {
  constructor(last_name, first_name, birth_date, school_record) {
    this.last_name = last_name;
    this.first_name = first_name;
    this.birth_date = birth_date;
    this.school_record = school_record;
  }

  showAge = () => calculateAge(this.birth_date);

  showGrades = () => this.school_record.toString();

  calculateGPA = () =>
    this.school_record.reduce((acc, e) => acc += e) /
    this.school_record.length;

  addGrade = (new_grade) => this.school_record.push(new_grade);

  setLastName = (name) => setName(name, this, "last_name");
  setFirstName = (name) => setName(name, this, "first_name");
  setBirthDate = (birth_date) => {
    try {
      if (calculateAge(birth_date) < 18) {
        throw "Age cannot be lower than 18";
      }
      this.birth_date = birth_date;
    } catch (err) {
      console.log(err);
    }
  };
}

let students = [
  new Student("Popescu", "Ion", new Date(2000, 4, 13), [10, 9, 5]),
  new Student("Smith", "Jane", new Date(2002, 7, 1), [6, 10, 4]),
  new Student("Doe", "John", new Date(2001, 10, 29), [8, 7, 3]),
];

// sorting

let studentsByName = () => {
  let st = students.sort((a, b) => {
    let fn = a.first_name.localeCompare(b.first_name);
    if (fn == 0) return a.last_name.localeCompare(b.last_name);
    return fn;
  });

  console.log(`students sorted by name:\n${JSON.stringify(st)}\n`);
};
studentsByName();

let studentsByGPA = () => {
  let st = students.sort((a, b) => b.calculateGPA() - a.calculateGPA());

  console.log(`students sorted by GPA:\n${JSON.stringify(st)}\n`);
};
studentsByGPA();

let studentsByAge = () => {
  let st = students.sort((a, b) => a.showAge() - b.showAge());

  console.log(`students sorted by age:\n${JSON.stringify(st)}\n`);
};
studentsByAge();

// add new grades

for (let s of students) {
  s.addGrade(Math.round(Math.random() * 10));
}

console.log("\nAdded new grades for each student:");
studentsByGPA();

let randomStudent = () => Math.ceil(Math.random() * students.length) - 1;

// change names
let extra_names = ["Pop", "Jones", "Williams"];
for (let i = 0; i < randomStudent(); i++) {
  students[i].last_name = extra_names[i];
}

console.log("\nChanged the last names of some students");
studentsByName();

// add/remove students
students[randomStudent()] = new Student(
  extra_names[randomStudent()],
  "James",
  new Date(2003, 12, 20),
  [
    3,
    5,
    7,
  ],
);
students.push(
  new Student(extra_names[randomStudent()], "Delilah", new Date(2004, 11, 15), [
    8,
    3,
    9,
  ]),
);

console.log("\nStudents added/removed:");
studentsByName();
studentsByGPA();
studentsByAge();
