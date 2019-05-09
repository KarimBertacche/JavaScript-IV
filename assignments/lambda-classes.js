// CODE here for your Lambda Classes
// First we need a Person class. This will be our base-class
// Person receives name age location gender all as props
// Person receives speak as a method.
// This method logs out a phrase Hello my name is Fred, I am from Bedrock where name and location are the object's own props

class Person {
    constructor(attributes) {
        this.name = attributes.name;
        this.age = attributes.age;
        this.location = attributes.location;
        this.gender = attributes.gender;
    }

    speak() {
        return `Hello my name is ${this.name}, I am from ${this.location}`
    }
}

// Now that we have a Person as our base class, we'll build our Instructor class.
// Instructor uses the same attributes that have been set up by Person
// Instructor has the following unique props:
// specialty what the Instructor is good at i.e. 'redux'
// favLanguage i.e. 'JavaScript, Python, Elm etc.'
// catchPhrase i.e. Don't forget the homies
// Instructor has the following methods:
// demo receives a subject string as an argument and logs out the phrase 'Today we are learning about {subject}' where subject is the param passed in.
// grade receives a student object and a subject string as arguments and logs out '{student.name} receives a perfect score on {subject}'
//STRETCH
// Now that our students have a grade build out a method on the Instructor (this will be used by BOTH instructors and PM's) that will randomly add or subtract points to a student's grade. Math.random will help.

class Instructor extends Person {
    constructor(attributes) {
        super(attributes);
        this.specialty = attributes.specialty;
        this.favLanguage = attributes.favLanguage;
        this.catchPhrase = attributes.catchPhrase;
    }

    demo(subject) {
        return `Today we are learning about ${subject}`
    }

    grade(studentObj, subject) {
        return `${studentObj.name} receives a perfect score on ${subject}`
    }

    updateGrade(studentObj, perfomance) {
        let studentGrade = studentObj.grade;
        if (perfomance === 'Good') {
            let additionalGrade = Math.round(Math.random() * 100);
            studentGrade = (studentGrade + additionalGrade)/2;
            return `Congratulations ${studentObj.name} you have done a wonderful job on today's test, you receive an additional score of ${additionalGrade}, now your total grade is ${studentGrade}`;
        } else if (perfomance === 'Bad'){
            let subtractedGrade = Math.round(Math.random() * 100)
            studentGrade = (studentGrade - subtractedGrade) / 2;
            return `Keep up ${studentObj.name} you could have done better on today's test, we will remove ${subtractedGrade} points from your original grade, now your total grade is ${studentGrade}`
        }    
    }
}

// Now we need some students!
// Student uses the same attributes that have been set up by Person
// Student has the following unique props:
// previousBackground i.e. what the Student used to do before Lambda School
// className i.e. CS132
// favSubjects. i.e. an array of the student's favorite subjects ['Html', 'CSS', 'JavaScript']
// Student has the following methods:
// listsSubjects a method that logs out all of the student's favoriteSubjects one by one.
// PRAssignment a method that receives a subject as an argument and logs out that the student.name has submitted a PR for {subject}
// sprintChallenge similar to PRAssignment but logs out student.name has begun sprint challenge on {subject}
//STRETCH
// Extend the functionality of the Student by adding a prop called grade and setting it equal to a number between 1-100.
// Add a graduate method to a student.
// This method, when called, will check the grade of the student and see if they're ready to graduate from Lambda School
// If the student's grade is above a 70% let them graduate! Otherwise go back to grading their assignments to increase their score.

class Student extends Person {
    constructor(attributes) {
        super(attributes);
        this.previousBackground = attributes.previousBackground;
        this.className = attributes.className;
        this.favSubject = attributes.favSubject;
        this.grade = 50;
    }

    listsSubjects() {
        return this.favSubject.forEach(el => console.log(el));
    }

    PRAssignment(subject) {
        return `${this.name} has submitted a PR for ${subject}`
    }

    sprintChallenge(subject) {
        return `${this.name} has begun sprint challenge on ${subject}`
    }

    graduate(studentObj) {
        if(studentObj.grade >= 70){
            return `Congratulations ${this.name} you graduate from Lambda School❗️🎉🎊.
            Your final score is ${studentObj.grade}`;
        } else if (studentObj.grade < 70) {
            return `Keep trying ${this.name} you almost graduated from Lambda School.
            At the moment your score is ${studentObj.grade}`;
        }   
    }
}

// Now that we have instructors and students, we'd be nowhere without our PM's
// ProjectManagers are extensions of Instructors
// ProjectManagers have the following unique props:
// gradClassName: i.e. CS1
// favInstructor: i.e. Sean
// ProjectManagers have the following Methods:
// standUp a method that takes in a slack channel and logs `{name} announces to {channel}, @channel standy times!​​​​​
// debugsCode a method that takes in a student object and a subject and logs out {name} debugs {student.name}'s code on {subject}

class PM extends Instructor {
    constructor(attributes) {
        super(attributes);
        this.gradClassName = attributes.gradClassName;
        this.favInstructor = attributes.favInstructor;
    }

    standUp(slackChannel) {
        return `${this.name} announces to ${channel}, @channel standy times!`
    }

    debugsCode(studentObj, subject) {
        return `${this.name} debugs ${studentObj.name}'s code on ${subject}` 
    }
}

const fred = new Instructor({
    name: 'Fred',
    location: 'Bedrock',
    age: 37,
    gender: 'male',
    favLanguage: 'JavaScript',
    specialty: 'Front-end',
    catchPhrase: `Don't forget the homies`
});

const karim = new Student({
    name: 'Karim',
    location: 'Novara',
    age: 29,
    gender: 'male',
    favLanguage: 'JavaScript',
    specialty: 'Front-end',
    catchPhrase: `Don't forget the homies`
});

let karimGrade = fred.updateGrade(karim, 'Good');
console.log(karimGrade);

let karimGraduation = karim.graduate(karim);
console.log(karimGraduation);