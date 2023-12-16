/*
3. Să se implementeze o clasă JS numită Student cu următoarele atribute:
a. nume
b. prenume
c. data_nasterii
d. foaie_matricola (șir de valori numerice)
Clasa are metodele:
a. afiseazaVarsta(): returnează vârsta calculată în funcție de data nașterii
b. afiseazaNotele(): returnează un șir de caractere obținut prin alăturarea și separarea cu ‘,’ a
tuturor notelor existente
c. calculeazaMedia(): returnează media aritmetică a notelor existente
d. adaugaNota(nota_noua): adaugă în lista de note noua valoare primită ca parametru

Să se definească un șir de 3 studenți cu datele predefinite. Să se ordoneze și să se afișeze studenții:
- alfabetic, ținând cont de nume și prenume
- după medii
- după vârstă
3’.   Se vor adăuga noi valori pt. note și se va re-apela ordonarea după medii.
3’’.  Se vor schimba numele anumitor studenți și se va re-apela ordonarea alfabetică.
3’’’. Se vor adăuga noi studenți în listă. Se vor șterge studenți din listă. Se vor afișa noile liste rezultate.
*/

class Student {
  constructor(last_name, first_name, birth_date, school_record) {
    this.last_name = last_name;
    this.first_name = first_name;
    this.birth_date = birth_date;
    this.school_record = school_record;
  }

  showAge() {
    let age = Date.now() - this.birth_date.getTime();

    return (new Date(age).getUTCFullYear() - 1970);
  }

  showGrades() {
    return this.school_record.toString();
  }

  calculateGPA() {
    return this.school_record.reduce((acc, e) => acc += e) /
      this.school_record.length;
  }

  addGrade(new_grade) {
    this.school_record.push(new_grade);
  }
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
