'use strict';

const mockData = require('./mockData.js').data;
const prompt = require('prompt-sync')();

// Prompt with multiple questions that collects all the data needed to fill the profile object. 

let profile = {}

// Question about the first name of the new profile

while (true) {

  let first_name = prompt("What is your first name?");

  if (first_name === null || first_name.trim() === "") {
    console.log("Your first name can't be empty.");
  }
  else {
    profile.first_name = first_name.trim();
    break;
  }
}
// Question about the last name of the new profile

while (true) {

  let last_name = prompt("What is your last name?");

  if (last_name === null || last_name.trim() === "") {
    console.log("Your last name can't be empty.");
  }
  else {
    profile.last_name = last_name;
    break;
  }
}

// Question about the age of the new profile

while (true) {

  let age = Number(prompt("What is your age?"));

  if (age === NaN) {
    console.log("Your answer is unclear.");
  }
  else if (age < 18) {
    console.log("You must be 18 years old or over to continue");
  }
  else {
    profile.age = age;
    break;
  }
}

// Question about the gender of the new profile

while (true) {

  let gender = prompt("What is your gender? M/F/X").toUpperCase();

  if (gender === null || gender.trim() === "") {
    console.log("Your gender name can't be empty.");
  }
  else if (!["X", "F", "M"].includes(gender)) {
    console.log("You must enter 'X', 'F' or 'M'.");
  }
  else {
    profile.gender = gender;
    break;
  }
}

// Question about the gender interest of the new profile (options: M, F or X)

while (true) {

  let gender_interest = prompt("What is your gender interest? M/F/X").toUpperCase();

  if (gender_interest === null || gender_interest.trim() === "") {
    console.log("Your gender interest can't be empty.");
  }
  else if (!["X", "F", "M"].includes(gender_interest)) {
    console.log("You must enter 'X', 'F' or 'M'.");
  }
  else {
    profile.gender_interest = gender_interest;
    break;
  }
}

// Question about the location of the new profile (options: rural/city)

while (true) {

  let location = prompt("Where do you live? Choose: rural/city?").toLowerCase();

  if (location === null || location.trim() === "") {
    console.log("Your input can't be empty.");
  }
  else if (!["rural", "city"].includes(location)) {
    console.log("You must enter 'rural', or 'city'.");
  }
  else {
    profile.location = location;
    break;
  }
}

// Question about the minimal age interest of the new profile

while (true) {

  let min_age_interest = prompt("What is your minimal age interest?");

  if (min_age_interest === NaN) {
    console.log("Your answer is unclear.");
  } else if (min_age_interest < 18) {
    console.log("You must be 18 years old or over to continue");
  }
  else {
    profile.min_age_interest = min_age_interest;
    break;
  }
}

// Question about the maximal age interest of the new profile

while (true) {

  let max_age_interest = prompt("What is your maximal age interest?");

  if (max_age_interest === NaN) {
    console.log("Your answer is unclear.");
  }
  else if (max_age_interest <= profile.min_age_interest) {
    console.log("Your maximal age interest must be higher than the minimum interested age.");
  }
  else {
    profile.max_age_interest = max_age_interest;
    break;
  }
}

console.log("----------YOUR PROFILE----------");

console.log(profile);

console.log("-----------THE RESULT-----------");

// Loop that compares the data with the new profile data and store a person as a match when they meet specific criteria

let totalMatchProfiles = []

for (let i = 0; i < mockData.length; i++) {
  let matchPerson = mockData[i];  // checks every person from the data one-by-one
  let ageRangeProfileMatch = profile.age >= matchPerson.min_age_interest && profile.age <= matchPerson.max_age_interest; // value makes sure your age range and their age match
  let ageRangeMatchPerson = matchPerson.age >= profile.min_age_interest && matchPerson.age <= matchPerson.max_age_interest; // value makes sure their age range and your age match
  let genderMatch = profile.gender === matchPerson.gender_interest && matchPerson.gender === profile.gender_interest; // value checks if their gender interest and your gender match & if your gender interest ands their gender match
  let locationMatch = profile.location === matchPerson.location; // value checks if you both live in the same location
  if (ageRangeProfileMatch && ageRangeMatchPerson && genderMatch && locationMatch) {
    totalMatchProfiles.push(matchPerson);  // adds de matches (objects) to one array
  }
}

console.log(`You have ${totalMatchProfiles.length} matche(s)!`);

// Loop that shows the matches and their name, age and location

for (let j = 0; j < totalMatchProfiles.length; j++) {
  let resultMatchProfiles = totalMatchProfiles[j];
  let resultMatchProfileName = resultMatchProfiles.first_name + " " + resultMatchProfiles.last_name; // value with full name of the match
  let resultMatchProfileAge = resultMatchProfiles.age;  // value with age of the match
  let resultMatchProfileLocation = resultMatchProfiles.location; // value with the location of the match
  console.log(`- - - Profile ${j + 1}`);
  console.log(`Name: ${resultMatchProfileName}`);
  console.log(`Age: ${resultMatchProfileAge}`);
  console.log(`Location: ${resultMatchProfileLocation}`);
} 